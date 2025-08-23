import React, { useEffect } from 'react';


const BotpressChat = () => {
  useEffect(() => {
    const loadScript = (src:any) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeWebChat = async () => {
      try {
        await loadScript("https://cdn.botpress.cloud/webchat/v3.2/inject.js");

        await loadScript("https://files.bpcontent.cloud/2025/07/23/16/20250723163743-NYZ6DX1T.js");

        window.botpressWebChat.init({
          host: 'http://localhost:3000',
          botId: 'Retobot',                   
          showBotAvatar: true,
          showUserAvatar: true,

        });
      } catch (error) {
        console.error("Failed to load Botpress WebChat scripts", error);
      }
    };

    initializeWebChat();

    return () => {
      document.querySelectorAll('script[src^="https://cdn.botpress.cloud"]').forEach(script => script.remove());
    };
  }, []); 

  return null;
};

export default BotpressChat;
