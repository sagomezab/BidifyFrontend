document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('loaded');
  
  const subastaId = obtenerSubastaIdDesdeUrl();
  const socket = new SockJS('http://localhost:8080/stompendpoint');
  const stompClient = Stomp.over(socket);
  const userName = localStorage.getItem('userName');
  mostrarMensajesEnInterfaz();

  try {
    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      
      
      stompClient.subscribe('/topic/subasta/' + subastaId + '/actualizacion', function (message) {
        const subastaActualizada = JSON.parse(message.body);
        actualizarInterfazConSubasta(subastaActualizada);
      });

      stompClient.subscribe('/topic/subasta/' + subastaId + '/messages', function (message) {
        try {
          const response = JSON.parse(message.body);
          mostrarMensajesEnInterfaz();
        } catch (error) {
          console.error('Error al analizar el mensaje JSON:', error);
        }
      });

      stompClient.subscribe('/topic/subasta/' + subastaId + '/finalizar', function (message) {
        const subastaFinalizada = JSON.parse(message.body);
        // Agregar lógica para manejar la finalización de la subasta en la interfaz
      });
    });

    // Obtener la información inicial de la subasta
    fetch(`http://localhost:8080/subasta/${subastaId}`)
      .then(response => response.json())
      .then(subasta => {
        actualizarInterfazConSubasta(subasta);
        const isSubastador = subasta.subastador.userName === userName;

        if (isSubastador) {
          const messageForm = document.getElementById('messageForm');
          messageForm.style.display = 'none';
        }else{
          const finalizarButton = document.getElementById('finalizarButton');
          finalizarButton.style.display = 'none';
        }
      })
      .catch(error => console.error('Error al obtener la subasta:', error));

  } catch (error) {
    console.error('Error en el código:', error);
  }

  const msgerForm = document.getElementById("messageForm");
  const msgerInput = document.getElementById("messageInput");
  const msgerChat = document.querySelector(".msger-chat");

  msgerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const msgText = msgerInput.value.trim();
    
    if (msgText !== '') {
      // Aquí puedes enviar mensajes al servidor a través de WebSocket
      stompClient.send('/app/' + subastaId + '/messages', {}, JSON.stringify({
        senderEmail: userName,
        replymessage: msgText
      }));
      msgerInput.value = '';
    }
  });

  function mostrarMensajesEnInterfaz() {
    const msgerChat = document.querySelector(".msger-chat");
    msgerChat.innerHTML = ''; // Limpiar el contenido actual
    fetch(`http://localhost:8080/subasta/${subastaId}/messages`)
      .then(response => response.json())
      .then(messages => {
        messages.forEach(msg => {
          const side = msg.senderEmail === userName ? 'right' : 'left';
          appendMessage(side, msg.senderEmail, msg.replymessage);
        });
      })
      .catch(error => console.error('Error al obtener mensajes:', error));
  
    
  }

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
      participantsTableBody.innerHTML += `<tr class="align-center" ><td>${participant.nombre}</td></tr>`;
    });
  }

  function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  }
});
