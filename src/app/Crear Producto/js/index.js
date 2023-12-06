const userName = localStorage.getItem('userName');

function formatPrice(inputId) {
    const inputElement = document.getElementById(inputId);
    let value = inputElement.value.replace(/[^0-9]/g, '');
    inputElement.value = parseInt(value, 10).toLocaleString();
}

const createProducto = document.getElementById('create');

function crearProducto() {
    const nombre = document.getElementById('nombre').value;
    const precio = parseInt(document.getElementById('precio').value, 10) * 1000;
    const img = document.getElementById('url').value;

    const datosProducto = {
        nombre: nombre,
        precio: precio,
        img: img
    };

    fetch('http://localhost:8080/producto/create/' + userName, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosProducto)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear el producto');
        }
        return response.json();
      })
      .then(data => {
        console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        console.error('Error al enviar la petición para crear el producto:', error);
      });
  }
 
