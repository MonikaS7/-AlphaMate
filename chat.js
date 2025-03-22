document.addEventListener("DOMContentLoaded", function () {
  const messageContainer = document.getElementById("messageContainer");
  const chatInput = document.getElementById("chatInput");
  const sendButton = document.getElementById("sendButton");

  const API_KEY = "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";
  const API_URL =
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";

  const SYSTEM_PROMPT =
    "You are Buddy, a friendly AI assistant who is going to make conversation with me. Your tone should be as polite in nature and your objective is to make me comfortable while in the conversation. Help me figuring out if there are any issues in my thought process, slightly try to tweak and suggest. I want to use you as my buddy agent to improve on my soft skills. The skills where you need to help me are Stress management, conflict management, anger management etc. Keep responses short and helpful.";

  // Auto-resize textarea
  chatInput.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });

  // Send message on button click
  sendButton.addEventListener("click", sendMessage);

  // Send message on Enter key (Shift + Enter for new line)
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  async function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      // Add user message
      addMessage(message, "user");

      // Clear input
      chatInput.value = "";
      chatInput.style.height = "auto";

      // Show typing indicator
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "message bot";
      typingIndicator.innerHTML = `
        <div class="message-content">
          Buddy is typing...
        </div>
      `;
      messageContainer.appendChild(typingIndicator);
      messageContainer.scrollTop = messageContainer.scrollHeight;

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: `${SYSTEM_PROMPT}\n\nUser: ${message}\n\nBuddy:`
          })
        });

        const result = await response.json();
        messageContainer.removeChild(typingIndicator);

        if (!result || result.error) {
          addMessage("Sorry, I couldn't process that. Try again!", "bot");
          return;
        }

        let botResponse = result[0]?.generated_text || "I'm not sure about that.";

        // Remove everything before Buddy's response
        const buddyIndex = botResponse.lastIndexOf("Buddy:");
        botResponse = buddyIndex !== -1 ? 
          botResponse.substring(buddyIndex + 6).trim() : 
          botResponse;

        // Remove any trailing "User:" in case of bad formatting
        botResponse = botResponse.split("User:")[0].trim();

        addMessage(botResponse, "bot");
      } catch (error) {
        messageContainer.removeChild(typingIndicator);
        addMessage("Network error, try again later!", "bot");
      }
    }
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
        `;
    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
});
