
document.addEventListener('DOMContentLoaded', function () {
  const subastaId = obtenerSubastaIdDesdeUrl();
  const socket = new SockJS('http://localhost:8080/stompendpoint');
  const stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/subasta/' + subastaId + '/actualizacion', function (subasta) {
          const subastaActualizada = JSON.parse(subasta.body);
          console.log('Subasta Actualizada:', subastaActualizada);
          actualizarInterfazConSubasta(subastaActualizada);
      });
  });

  const msgerForm = document.getElementById("messageForm");
  const msgerInput = document.getElementById("messageInput");
  const msgerChat = document.querySelector(".msger-chat");

  msgerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const msgText = msgerInput.value.trim();
      if (msgText !== '') {
          appendMessage('right', 'You', msgText);
          msgerInput.value = '';
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

  function obtenerSubastaIdDesdeUrl() {
      
    const urlParams = new URLSearchParams(window.location.search);
    const subastaId = urlParams.get('id');
    if (subastaId && !isNaN(subastaId)) {
        return parseInt(subastaId);
    } else {
        console.error("No se pudo obtener el ID de la subasta desde la URL.");
        return null;
    }
}

  function actualizarInterfazConSubasta(subasta) {
      document.querySelector('.product-name').textContent = subasta.producto.nombre;
      document.querySelector('.product-price').textContent = "Precio: " + subasta.precioFinal;
      document.querySelector('.product-owner').textContent = "Dueño: " + subasta.subastador.nombre;

      const productImage = document.querySelector('.product-image');
      productImage.src = subasta.producto.img;
      productImage.alt = "Imagen de la subasta";

      const participantsTableBody = document.getElementById('participantsTableBody');
      participantsTableBody.innerHTML = '';
      subasta.oferentes.forEach(participant => {
          participantsTableBody.innerHTML += `<tr><td>${participant.nombre}</td></tr>`;
      });
  }

  function formatDate(date) {
      const h = "0" + date.getHours();
      const m = "0" + date.getMinutes();
      return `${h.slice(-2)}:${m.slice(-2)}`;
  }

  
});
