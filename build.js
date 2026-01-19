const fs = require('fs');
const yaml = require('js-yaml');

console.log("🚀 Starting Build...");

// 1. READ CONFIG
let config = { apiKey: "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", model: "deepseek/deepseek-r1-0528:free", botName: "Bot", primaryColor: "#000" };
try {
    const yamlContent = fs.readFileSync('./config.yaml', 'utf8');
    config = yaml.load(yamlContent);
} catch (e) {
    console.error("❌ Error: config.yaml not found.");
    process.exit(1);
}

// 2. READ KNOWLEDGE BASE
let knowledge = "";
try { knowledge = fs.readFileSync('./knowledge.txt', 'utf8'); } catch (e) {}

const systemPrompt = knowledge ? `You are an AI assistant that primarily uses the following knowledge base to answer questions. For greetings and basic conversation, respond naturally and helpfully. If asked about specific topics or details not covered in the knowledge base, politely say you don't have that information in your knowledge base.

Knowledge base:
${knowledge}` : "You are an AI assistant with no specific knowledge base. Respond helpfully to greetings and basic conversation, but indicate that you have limited information.";

// 3. READ & MINIFY CSS (Crucial Step: Removes newlines)
let cssContent = "";
try {
    cssContent = fs.readFileSync('./src/style.css', 'utf8')
        .replace(/\n/g, '')       // Remove Enter keys
        .replace(/\r/g, '')       // Remove Windows Enter keys
        .replace(/\s\s+/g, ' ');  // Remove double spaces
} catch (e) {
    console.error("❌ Error: src/style.css not found.");
    process.exit(1);
}

// 4. READ JS
let jsContent = fs.readFileSync('./src/widget.js', 'utf8');

// 5. INJECT
const finalConfig = {
    ...config,
    systemPrompt: systemPrompt,
    cssStyles: cssContent // Injected here
};

const finalBundle = jsContent.replace(
    '// --- INJECTED_CONFIG_PLACEHOLDER ---', 
    `const config = ${JSON.stringify(finalConfig)};`
);

// 6. WRITE
if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
fs.writeFileSync('./dist/chatbot.bundle.js', finalBundle);

console.log("✅ Build Complete!");