document.addEventListener('DOMContentLoaded', function () {
    const msgerForm = document.getElementById("messageForm");
    const msgerInput = document.getElementById("messageInput");
    const msgerChat = document.querySelector(".msger-chat");
  
    const participants = ["Jaider", "Migue", "Santi", "Karen", "Sofia", "Majo"];
  
    const participantsTableBody = $('#participantsTableBody');
      participants.forEach(participant => {
          participantsTableBody.append(`<tr><td>${participant}</td></tr>`);
      });
  
    // Borra el contenido del chat al cargar la página
    msgerChat.innerHTML = '';
  
    msgerForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const msgText = msgerInput.value.trim();
      if (msgText !== '') {
        appendMessage('right', 'You', msgText);
        msgerInput.value = '';
        // Comentar la siguiente línea para desactivar las respuestas automáticas del bot
        // botResponse();
      }
    });
  
    function appendMessage(side, name, text) {
      const msgHTML = `
        <div class="msg ${side}-msg">
          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">${name}</div>
              <div class="msg-info-time">${formatDate(new Date())}</div>
            </div>
            <div class="msg-text">${text}</div>
          </div>
        </div>
      `;
  
      msgerChat.insertAdjacentHTML("beforeend", msgHTML);
      msgerChat.scrollTop = msgerChat.scrollHeight;
    }
  
    // Función para respuestas automáticas del bot
    function botResponse() {
      const BOT_MSGS = [
        "Hi, how are you?",
        "Ohh... I can't understand what you're trying to say. Sorry!",
        "I like to play games... But I don't know how to play!",
        "Sorry if my answers are not relevant. :))",
        "I feel sleepy! :("
      ];
  
      const r = random(0, BOT_MSGS.length - 1);
      const msgText = BOT_MSGS[r];
      const delay = msgText.split(" ").length * 100;
  
      setTimeout(() => {
        appendMessage('left', 'BOT', msgText);
      }, delay);
    }
  
    function formatDate(date) {
      const h = "0" + date.getHours();
      const m = "0" + date.getMinutes();
      return `${h.slice(-2)}:${m.slice(-2)}`;
    }
  
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  });