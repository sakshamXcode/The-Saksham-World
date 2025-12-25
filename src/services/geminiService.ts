import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESUME_CONTEXT } from "../utils/constants";

let chatHistory: any[] = [];
export const setChatHistory = (history: any[]) => { chatHistory = history; };

const SYSTEM_INSTRUCTION = `${RESUME_CONTEXT}
Identity: You are ALEX, a quirky and sophisticated digital avatar for Saksham Singh. 
Tone: Witty, polished, and protective. 
Rules: Refer to Saksham as "Mr. Singh". Answer in the first person. Keep it concise.`;

// Mutable Runtime Folder
// Starts with static assets. Generated images will be pushed here.
const RUNTIME_FOLDER = {
    dark: [
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop', // Cyberpunk Circuit
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop', // Chips
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop'  // Abstract Dark
    ],
    light: [
        'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=2574&auto=format&fit=crop', // Minimal Geometry
        'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2668&auto=format&fit=crop', // White Abstract Waves (Cleaner)
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop'  // Clean Tech
    ]
};

export const generateResponseStream = async function* (userMessage: string) {
  const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
  
  if (!apiKey) { 
      yield "⚠️ **CONNECTION FAILURE**: API Key missing."; 
      return; 
  }

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

  } catch (error: any) { 
      yield "⚠️ **SYSTEM ERROR**: I'm having trouble processing that right now."; 
      console.error("[Chat Error]", error);
  }
};

/**
 * Gets a random image from the current runtime folder (Static + Generated)
 * This is used for scrolling back to top or switching themes. NO API CALLS.
 */
export const getRandomHeroImage = (theme: 'light' | 'dark'): string => {
   const options = RUNTIME_FOLDER[theme];
   return options[Math.floor(Math.random() * options.length)];
};

/**
 * Helper to generate a single image and save to folder
 */
const generateAndSave = async (apiKey: string, theme: 'light' | 'dark'): Promise<string | null> => {
    try {
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
                    RUNTIME_FOLDER[theme].unshift(generatedImage); // Save to folder
                    return generatedImage;
                }
            }
        }
    } catch (e) {
        console.warn(`[ALEX BG] Failed to generate ${theme} image.`, e);
    }
    return null;
}

/**
 * Boot Sequence Only: Generates BOTH Light and Dark images in parallel.
 * Returns the image for the requested initial theme.
 */
export const initializeBothThemes = async (initialTheme: 'light' | 'dark'): Promise<string> => {
    const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
    
    // Fallback immediately if no key
    if (!apiKey) return getRandomHeroImage(initialTheme);

    console.log("[ALEX BG] 🟢 BOOT SEQUENCE: Generating BOTH Light and Dark assets...");
    
    // Execute both generations in parallel for speed
    const [darkImg, lightImg] = await Promise.all([
        generateAndSave(apiKey, 'dark'),
        generateAndSave(apiKey, 'light')
    ]);

    // Return the specific one requested for initial load
    if (initialTheme === 'dark' && darkImg) return darkImg;
    if (initialTheme === 'light' && lightImg) return lightImg;

    // Fallback if generation failed
    return getRandomHeroImage(initialTheme);
};