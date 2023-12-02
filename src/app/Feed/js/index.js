document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('loaded');
});
function cargarSubastas() {
  fetch('http://localhost:8080/subasta')
    .then(response => response.json())
    .then(subastas => {
      
      const tabla = document.getElementById('subastasTable');
      const tbody = tabla.querySelector('tbody');

      
      tbody.innerHTML = '';

      
      subastas.forEach((subasta, index) => {
        const fila = `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${subasta.subastador.nombre}</td>
            <td>${subasta.producto.nombre}</td>
            <td><img src="${subasta.producto.img}" alt="Imagen de la subasta" class = "imagen-lista"></td>
            <td><button type="button" class="button-33" onclick="unirseASubasta(${subasta.id})">unirse</button></td>
          </tr>
        `;
        tbody.innerHTML += fila;
      });
    })
    .catch(error => console.error('Error al obtener las subastas:', error));
}
function unirseASubasta(subastaId) {
  window.location.href = `../Subasta/index.html?id=${subastaId}`;
}
cargarSubastas();