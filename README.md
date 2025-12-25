# 🚀 The Saksham World (Powered by ALEX)

> *"Why write code when you can vibe code?"*

Welcome to the digital headquarters of **Saksham Singh**, a distinctively polished and unnecessarily sophisticated portfolio built with **React**, **Vite**, and **Google Gemini AI**.

This isn't just a static resume; it's a living system managed by **ALEX** (Autonomous Logic & Executive Xenobot), your digital guide.

## 🌟 Why This Exists (The "Vibe Coding" Manifesto)

Stop watching 4-hour tutorials on "How to center a div".
This entire project was built using the **Vibe Coding** methodology:
1.  Open **Google AI Studio** or **Cursor/VS Code**.
2.  Enable **Gemini 3 Pro**.
3.  Describe the vibe.
4.  Refine, iterate, and ship.

We are in the era of **Agentic AI**. Use it.

## 🤖 Features that "Wow"

### 1. **ALEX (The AI Avatar)**
-   Not a chatbot, but a *personality*.
-   ALEX wakes up, gets sleepy at night (check after 11 PM!), and reacts when you tickle him (hover).
-   **Tech**: Custom CSS animations + State Logic.

### 2. **Hybrid Theme System (Static + Generative AI)**
-   The background isn't just a random image.
-   **Boot Sequence**: On load, we hit the **Gemini 2.5 Flash API** to generate *unique* abstract wallpapers for both Light and Dark modes.
-   **Fallback**: High-quality Unsplash assets ensure zero layout shift if the API naps.

### 3. **Smart Navbar**
-   **Premium Glassmorphism**: Blurs that would make Apple jealous.
-   **Color Picker**: Don't like the color? Pick your own accent from the palette.
-   **Dynamic Logo**: A glowing, hovering brand mark.

### 4. **Interactive Feedback**
-   A smooth, multi-step modal to send messages directly to my real inbox via **EmailJS**.
-   ALEX handles the intake process personally.

## 🛠️ Tech Stack

-   **Core**: React 19, Vite, TypeScript
-   **Styling**: TailwindCSS (The only way to style)
-   **AI Intelligence**: Google Gemini API (`gemini-2.5-flash-image`, `gemini-3-flash-preview`)
-   **Icons**: Lucide React
-   **Charts**: Recharts
-   **Mail**: EmailJS

## 🚀 Getting Started

1.  **Clone the Repo**
    ```bash
    git clone https://github.com/your-username/portfolio.git
    cd portfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root:
    ```env
    VITE_GEMINI_API_KEY=your_google_ai_key
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```
    > **Security Note**: Never commit your `.env` file!

4.  **Run the Vibe**
    ```bash
    npm run dev
    ```

## 🛡️ Security & Vulnerabilities

-   **Zero Critical Vulnerabilities**: Dependencies are kept fresh.
-   **Env Safety**: API keys are accessed via `import.meta.env` and never hardcoded.
-   **Client-Side AI**: Calls are proxied securely or handled with ephemeral tokens where applicable.

## 🤝 Contributing

Found a bug?
1.  Ask **Gemini** to fix it.
2.  Paste the fix in a PR.
3.  Done.

---
*Built with ❤️ and ☕ by Saksham Singh.*
