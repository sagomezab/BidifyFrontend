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
function cargarProductos() {
  fetch('http://localhost:8080/usuario/productos/todos')
    .then(response => response.json())
    .then(data => {
      const feedContainer = document.querySelector('.right_row .row.border-radius');

      for (const [nombreUsuario, productos] of Object.entries(data)) {
        if (productos.length > 0) {
          productos.forEach(producto => {
            const feedItem = createFeedItem(nombreUsuario, producto);
            feedContainer.appendChild(feedItem);
          });
        }
      }
    })
    .catch(error => console.error('Error al obtener los productos:', error));
}
function createFeedItem(nombreUsuario, producto) {
  const feedItem = document.createElement('div');
  feedItem.className = 'feed';

  const feedTitle = document.createElement('div');
  feedTitle.className = 'feed_title';
  feedTitle.innerHTML = `<span><b>${nombreUsuario}</b> shared a <a href="#">product</a><br><p>${getFormattedDate()}</p></span>`;

  const feedContent = document.createElement('div');
  feedContent.className = 'feed_content';
  feedContent.innerHTML = `<div class="feed_content_image">
    <img src="${producto.img}" alt="" />
  </div>`;

  const feedFooter = document.createElement('div');
  feedFooter.className = 'feed_footer';
  feedFooter.innerHTML = `<ul class="feed_footer_left">
    <li class="hover-orange selected-orange"><i class="fa fa-heart"></i> 0 likes</li>
    <li><span><b>Nobody</b> liked this</span></li>
  </ul>
  <ul class="feed_footer_right">
    <li class="hover-orange selected-orange"><i class="fa fa-share"></i> 0 shares</li>
    <li class="hover-orange"><i class="fa fa-comments-o"></i> 0 comments</li>
  </ul>`;

  feedItem.appendChild(feedTitle);
  feedItem.appendChild(feedContent);
  feedItem.appendChild(feedFooter);

  return feedItem;
}
function getFormattedDate() {
  const date = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
cargarProductos();
cargarSubastas();
