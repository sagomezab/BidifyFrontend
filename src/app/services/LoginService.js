document.addEventListener('DOMContentLoaded', function () {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('main-container');
    const registrarButton = document.getElementById('registrar');
    const ingresarButton = document.getElementById('ingresar');

    signUpButton.addEventListener('click', function () {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', function () {
        container.classList.remove('right-panel-active');
    });

    registrarButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default form submission

        const nombre = document.getElementById('nombre').value;
        const nombreUsuario = document.getElementById('nombreUsuarioRegistrar').value;
        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseñaRegistrar').value;

        // Realizar una solicitud HTTP para registrar el usuario
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/usuario/registrar',
            contentType: 'application/json',
            data: JSON.stringify({
                userName: nombreUsuario,
                nombre: nombre,
                email: correo,
                password: contraseña
            }),
            success: function (response) {
                const userName = response.userName;
                localStorage.setItem('userName', userName);
                window.location.href = '../Feed/index.html';
            },
            error: function (error) {
                alert(error.responseJSON.mensaje);
            }
        });
    });

    ingresarButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default form submission

        const nombreUsuarioLogin = document.getElementById('nombreUsuarioLogin').value;
        const contraseñaLogin = document.getElementById('contraseñaLogin').value;

        // Realizar una solicitud HTTP para iniciar sesión
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/usuario/login',
            contentType: 'application/json',
            data: JSON.stringify({
                userName: nombreUsuarioLogin,
                password: contraseñaLogin
            }),
            success: function (response) {
                localStorage.setItem('userName', nombreUsuarioLogin);
                window.location.href = '../Feed/index.html';
            },
            error: function (error) {
                alert(error.responseJSON.mensaje);
            }
        });
    });
});