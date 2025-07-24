import React, { useEffect } from 'react';


const BotpressChat = () => {
  useEffect(() => {
    // Function to load a script dynamically
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Load the Botpress WebChat scripts dynamically
    const initializeWebChat = async () => {
      try {
        // Load the first script
        await loadScript("https://cdn.botpress.cloud/webchat/v3.2/inject.js");

        // Load the second script (your custom bot config)
        await loadScript("https://files.bpcontent.cloud/2025/07/23/16/20250723163743-NYZ6DX1T.js");

        // Initialize the WebChat after the scripts have loaded
        window.botpressWebChat.init({
          host: 'http://localhost:3000', // Replace with your Botpress server URL
          botId: 'Retobot',                   // Replace with your actual bot ID
          showBotAvatar: true,
          showUserAvatar: true,

        });
      } catch (error) {
        console.error("Failed to load Botpress WebChat scripts", error);
      }
    };

    // Initialize WebChat on component mount
    initializeWebChat();

    // Clean up when component unmounts (to avoid loading scripts multiple times)
    return () => {
      // Optionally clean up the WebChat if needed (e.g., removing the script tags, etc.)
      document.querySelectorAll('script[src^="https://cdn.botpress.cloud"]').forEach(script => script.remove());
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return null; // The component doesn't render anything itself
};

export default BotpressChat;
