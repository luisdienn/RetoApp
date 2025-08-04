import React, { useRef, useState, useEffect } from "react";
import { postRequest } from "../api";

export default function Aichat() {
  const [isOpen, setIsOpen] = useState(true);
  const [userInput, setUserInput] = useState("");
  const chatboxRef = useRef<HTMLDivElement>(null);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() !== "") {
      addUserMessage(userInput);

      const resultt = await postRequest("/aichat", {
        body: { msg: userInput },
      });

      if (resultt.success) {
        console.log(resultt);
        // setTimeout(() => {
        //   addBotMessage(resultt);
        // }, 500);
      }

      setUserInput("");
    }
  };

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const addUserMessage = (message: string) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-2", "text-right");
    messageElement.innerHTML = `<p class="bg-[#f9e7b8] text-black rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatboxRef.current?.appendChild(messageElement);
    chatboxRef.current?.scrollTo({ top: chatboxRef.current.scrollHeight });
  };

  const addBotMessage = (message: string) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-2");
    messageElement.innerHTML = `<p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatboxRef.current?.appendChild(messageElement);
    chatboxRef.current?.scrollTo({ top: chatboxRef.current.scrollHeight });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendChat({
        preventDefault: () => {},
      } as unknown as React.FormEvent);
    }
  };

  useEffect(() => {
    toggleChatbox(); // Auto-open on mount
  }, []);

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-12 ">
        <button
          onClick={toggleChatbox}
          className="bg-[#f9e7b8] text-black font-bold py-2 px-4 rounded-md hover:bg-[#e3ce96] transition duration-300 flex items-center hover:cursor-pointer"
        >
          Chat with Ai Retobot
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-16 right-12 w-96" id="chat-container">
          <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-[#f9e7b8] text-black rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">Ai Retobot</p>
              <button
                onClick={toggleChatbox}
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              ></button>
            </div>

            <div
              ref={chatboxRef}
              className="p-4 h-80 overflow-y-auto"
              id="chatbox"
            >
              {/* Initial static messages */}

              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                  How can I help you?
                </p>
              </div>
            </div>

            <div className="p-4 border-t flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyUp={handleKeyUp}
                placeholder="Type a message"
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#f9e7b8]"
              />
              <button
                onClick={handleSendChat}
                className="bg-[#f9e7b8] text-black px-4 py-2 rounded-r-md hover:bg-[#e3ce96] transition duration-300 hover:cursor-pointer font-bold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
