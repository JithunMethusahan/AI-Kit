# AI - Kit

<img width="834" height="416" alt="image" src="https://github.com/user-attachments/assets/53bef881-f9b5-4f39-88e9-6e1540335ec4" />


A plug-and-play AI chatbot widget that you can easily integrate into any website. Powered by OpenRouter's API, this kit allows you to create a custom AI assistant with your own knowledge base and branding.

## Features

- **Easy Integration**: Add to any website with a single script tag
- **Customizable**: Configure appearance, behavior, and knowledge base
- **Multiple Models**: Support for various AI models via OpenRouter
- **RAG Support**: Include custom knowledge for context-aware responses
- **Lightweight**: Minimal footprint, no external dependencies in production


## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- An OpenRouter API key ([get one here](https://openrouter.ai/keys))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JithunMethusahan/AI-Kit.git
   cd AI-Kit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your bot:
   Create a `.env` file in the root directory:
   ```
   API_KEY=your_openrouter_api_key_here
   ```
   Edit `config.yaml` for other settings like model and appearance.

4. Add your knowledge base (optional):
   Edit `knowledge.txt` with context information for your bot.

5. Build the widget:
   ```bash
   npm run build
   ```

### Integration

Add the generated script to your website:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content -->

    <script src="dist/chatbot.bundle.js"></script>
</body>
</html>
```

## ⚙️ Configuration

- **API Key**: Set `API_KEY` in `.env` file (get from [OpenRouter](https://openrouter.ai/keys))
- **Other Settings**: Edit `config.yaml` to customize model, appearance, and behavior

Available free models include:
- `deepseek/deepseek-r1-0528:free`
- `mistralai/devstral-2512:free`
- And many more (see [OpenRouter models](https://openrouter.ai/models))

## Testing

Use the included test files:

- `dist/debug.html`: Test API connection (generated during build)
- `test.html`: Preview the widget

## Project Structure

```
├── src/
│   ├── widget.js      # Main widget logic
│   └── style.css      # Widget styles
├── .env               # API key (not committed)
├── config.yaml        # Configuration settings
├── knowledge.txt      # Knowledge base
├── build.js           # Build script
├── debug.html         # Debug template (processed during build)
├── test.html          # Widget preview
└── dist/              # Built output (generated)
    ├── chatbot.bundle.js
    └── debug.html
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Powered by [OpenRouter](https://openrouter.ai/)

## Troubleshooting
"Failed to fetch" Error?
If testing on your local computer, you must use a Local Server.

VS Code: Right-click your HTML file -> "Open with Live Server".
Python: Run python -m http.server.

Do not just double-click the HTML file.
Bot gives generic answers?

Check your knowledge.txt. Make sure you re-ran node build.js after saving your changes.
---

### 3. How to Distribute (Sell or Share)

Now, your folder looks like this:

```text
/My-Chatbot-Kit
   ├── node_modules/   <-- (You can delete this before sharing to save space)
   ├── src/            <-- (Source code)
   ├── config.yaml     <-- (Default Template)
   ├── knowledge.txt   <-- (Default Template)
   ├── build.js
   └── README.md

## Connection Debugger (If things go wrong)

If you have built the bot but it says "Error" or "Failed to fetch", use the included Debug Tool to find the problem.

1. Open `debug.html` in a code editor (VS Code, Notepad).
2. Look for the line: `const API_KEY = "PASTE_KEY_HERE";`
3. Paste your OpenRouter API Key there and save.
4. Run `debug.html` (Use "Live Server" or Python server).
5. Click **"TEST CONNECTION NOW"**.

**What the logs mean:**
- **Status 401:** Your API Key is wrong.
- **Status 402:** You need to add credits to your OpenRouter account.
- **Status 404:** The Model name is wrong.
- **Failed to Fetch:** You are likely blocking the connection (Turn off AdBlockers) or not using a Local Server.   
