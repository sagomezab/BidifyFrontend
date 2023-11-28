$(document).ready(function() {
    // Hacer solicitud GET al endpoint de subastas
    $.ajax({
        url: 'http://localhost:8080/subasta', // Reemplaza con la URL correcta de tu backend
        type: 'GET',
        dataType: 'json',
        success: function(subastas) {
            // Llenar la tabla con los datos de las subastas
            llenarTabla(subastas);
        },
        error: function(error) {
            console.log('Error al obtener subastas:', error);
        }
    });

    // Función para llenar la tabla con los datos de las subastas
    function llenarTabla(subastas) {
        var tablaBody = $('.lista-subastas tbody');

        // Limpiar contenido existente en la tabla
        tablaBody.empty();

        // Iterar sobre las subastas y agregar filas a la tabla
        subastas.forEach(function(subasta, index) {
            var fila = `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${subasta.subastador}</td>
                            <td>${subasta.producto}</td>
                            <td>${subasta.imagen}</td>
                        </tr>`;
            tablaBody.append(fila);
        });
    }
});