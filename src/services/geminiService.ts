import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESUME_CONTEXT } from "../utils/constants";

let chatHistory: any[] = [];
export const setChatHistory = (history: any[]) => { chatHistory = history; };

const SYSTEM_INSTRUCTION = `${RESUME_CONTEXT}
Identity: You are ALEX, a quirky and sophisticated digital avatar for Saksham Singh. 
Tone: Witty, polished, and protective. 
Rules: Refer to Saksham as "Mr. Singh". Answer in the first person. Keep it concise.`;

// Storage Keys
const CACHE_KEYS = {
    dark: 'alex_bg_cache_dark_v2',
    light: 'alex_bg_cache_light_v2'
};

const MAX_CACHE_SIZE = 15;

// Global Lock to prevent concurrent executions
let isGenerationSequenceActive = false;

// Mutable Runtime Folder
const RUNTIME_FOLDER = {
    dark: [
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop'
    ],
    light: [
        'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=2574&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2668&auto=format&fit=crop', 
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop'
    ]
};

export const generateResponseStream = async function* (userMessage: string) {
  const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (!apiKey) { yield "⚠️ API Key missing."; return; }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.8 },
      history: chatHistory,
    });
    
    const result = await chat.sendMessageStream({ message: userMessage });
    let fullResponse = "";
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) { fullResponse += c.text; yield c.text; }
    }
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
    chatHistory.push({ role: "model", parts: [{ text: fullResponse }] });
  } catch (error: any) { yield "⚠️ System Error."; }
};

export const getRandomHeroImage = (theme: 'light' | 'dark'): string => {
   const options = RUNTIME_FOLDER[theme];
   return options[Math.floor(Math.random() * options.length)];
};

export const hydrateCache = () => {
    (['dark', 'light'] as const).forEach(theme => {
        try {
            const stored = localStorage.getItem(CACHE_KEYS[theme]);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    // Combine valid cached items with static items
                    const uniqueSet = new Set([...parsed, ...RUNTIME_FOLDER[theme]]);
                    RUNTIME_FOLDER[theme] = Array.from(uniqueSet);
                }
            }
        } catch (e) {
            localStorage.removeItem(CACHE_KEYS[theme]);
        }
    });
};

const generateSingleImage = async (apiKey: string, theme: 'light' | 'dark'): Promise<boolean> => {
    try {
        const currentCache = JSON.parse(localStorage.getItem(CACHE_KEYS[theme]) || '[]');
        if (currentCache.length >= MAX_CACHE_SIZE) {
            console.log(`[ALEX SYSTEM] ${theme} cache full (${currentCache.length}). Skipping.`);
            return false;
        }

        const prompt = theme === 'dark' 
            ? 'Abstract digital art, obsidian dark background, neon blue cybernetic lines, circuit board patterns, 8k resolution, minimalist, futuristic, low key'
            : 'Abstract digital art, pure white and softest gray gradients, very minimal fluid shapes, high key lighting, low contrast, clean, subtle corporate aesthetic, 8k resolution';

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: { imageConfig: { aspectRatio: "16:9" } }
        });

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData?.data) {
                    const generatedImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    
                    // Add to runtime and save to cache
                    RUNTIME_FOLDER[theme].unshift(generatedImage); 
                    const updatedCache = [generatedImage, ...currentCache].slice(0, MAX_CACHE_SIZE);
                    localStorage.setItem(CACHE_KEYS[theme], JSON.stringify(updatedCache));
                    return true;
                }
            }
        }
    } catch (e) {
        console.warn(`[ALEX SYSTEM] ${theme} generation failed.`);
        throw e; // Re-throw to inform the queue
    }
    return false;
}

export const replenishAssetPool = async () => {
    if (isGenerationSequenceActive) {
        console.log("[ALEX SYSTEM] Queue busy. Skipping request.");
        return;
    }

    const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (!apiKey) return;

    isGenerationSequenceActive = true;

    try {
        // --- PHASE 1: DARK MODE (PRIORITY) ---
        const storedDark = JSON.parse(localStorage.getItem(CACHE_KEYS.dark) || '[]');
        let darkGenerated = false;

        if (storedDark.length < MAX_CACHE_SIZE) {
            console.log("[ALEX SYSTEM] Queue Item 1: Dark Mode Asset...");
            try {
                darkGenerated = await generateSingleImage(apiKey, 'dark');
                if (darkGenerated) console.log("[ALEX SYSTEM] Dark Asset Complete.");
            } catch (e) {
                console.error("[ALEX SYSTEM] Dark Asset Error. Aborting Queue to save quota.");
                return; // FAIL FAST: Don't try light mode if we are already hitting errors
            }
        }

        // --- PHASE 2: COOL DOWN ---
        // If we generated an image, we MUST wait to avoid 429
        if (darkGenerated) {
            console.log("[ALEX SYSTEM] Cooling down for 5 seconds...");
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        // --- PHASE 3: LIGHT MODE ---
        const storedLight = JSON.parse(localStorage.getItem(CACHE_KEYS.light) || '[]');
        if (storedLight.length < MAX_CACHE_SIZE) {
            console.log("[ALEX SYSTEM] Queue Item 2: Light Mode Asset...");
            try {
                await generateSingleImage(apiKey, 'light');
                console.log("[ALEX SYSTEM] Light Asset Complete.");
            } catch (e) {
                console.warn("[ALEX SYSTEM] Light Asset Skipped.");
            }
        }

    } catch (err) {
        console.error("[ALEX SYSTEM] Queue Error:", err);
    } finally {
        isGenerationSequenceActive = false;
        console.log("[ALEX SYSTEM] Queue Released.");
    }
};