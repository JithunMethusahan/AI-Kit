(function() {
    // --- INJECTED_CONFIG_PLACEHOLDER --- 
  
    // 1. INJECT STYLES
    const color = config.primaryColor || "#4712f3";
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      :root { --ai-bot-primary: ${color}; }
      ${config.cssStyles} 
    `; 
    document.head.appendChild(styleTag);
  
    // 2. CREATE HTML
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <button id="ai-widget-launcher">
        <!-- FIXED ICON: Uses currentColor to be white -->
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <div id="ai-widget-container">
        <div id="ai-widget-header">
          <span>${config.botName}</span>
          <button id="ai-widget-close">✕</button>
        </div>
        <div id="ai-widget-body">
          <div class="ai-msg ai-msg-bot">${config.welcomeMessage}</div>
        </div>
        <div id="ai-widget-input-area">
          <input type="text" id="ai-widget-input" placeholder="Type..." />
          <button id="ai-widget-send">Send</button>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
  
    // 3. APPLY MODE
    const isFullscreen = config.mode === 'fullscreen';
    if (isFullscreen) {
      document.body.classList.add('fullscreen');
    }
  
    // 4. LOGIC
    const container = document.getElementById('ai-widget-container');
    const launcher = document.getElementById('ai-widget-launcher');
    const closeBtn = document.getElementById('ai-widget-close');
    
    if (!isFullscreen) {
      // Popup mode logic
      launcher.onclick = () => {
        container.style.display = 'flex';
        launcher.style.display = 'none';
        setTimeout(() => container.style.opacity = '1', 10);
      };
      
      closeBtn.onclick = () => {
        container.style.opacity = '0';
        setTimeout(() => {
          container.style.display = 'none';
          launcher.style.display = 'flex';
        }, 300);
      };
    } else {
      // Fullscreen mode logic - close button minimizes to launcher
      closeBtn.onclick = () => {
        document.body.classList.remove('fullscreen');
        container.style.display = 'none';
        launcher.style.display = 'flex';
      };
      
      // In fullscreen mode, show the container immediately
      container.style.display = 'flex';
      setTimeout(() => container.style.opacity = '1', 10);
    }
  
    const sendBtn = document.getElementById('ai-widget-send');
    const inputEl = document.getElementById('ai-widget-input');
    const chatBody = document.getElementById('ai-widget-body');
    let history = [];
  
    const appendMsg = (role, text) => {
        const d = document.createElement('div');
        d.className = `ai-msg ai-msg-${role}`;
        d.innerText = text;
        chatBody.appendChild(d);
        chatBody.scrollTop = chatBody.scrollHeight;
    };
  
    const send = async () => {
        const text = inputEl.value.trim();
        if(!text) return;
        appendMsg('user', text);
        inputEl.value = '';
        
        try {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${config.apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.href,
                    "X-Title": config.botName
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [{role:"system",content:config.systemPrompt}, ...history, {role:"user",content:text}]
                })
            });
            const data = await res.json();
            if(!res.ok) throw new Error("API Error");
            const ans = data.choices[0].message.content;
            appendMsg('bot', ans);
            history.push({role:"user",content:text}, {role:"assistant",content:ans});
        } catch(e) {
            appendMsg('bot', "Error: " + e.message);
        }
    };
    sendBtn.onclick = send;
    inputEl.onkeypress = (e) => { if(e.key==='Enter') send(); };
  
  })();
