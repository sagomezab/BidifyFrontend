$(document).ready(function () {
    $('#ingresar').click(function () {
        event.preventDefault();
        const NombreUsuario = $('#nombreUsuarioLogin').val();
        const Contraseña = $('#contraseñaLogin').val();
        login(NombreUsuario,Contraseña);
    });

    $('#registrar').click(function () {
        event.preventDefault();
        const nombre = $('#nombre').val();
        const NombreUsuario = $('#nombreUsuarioRegistrar').val();
        const correo = $('#correo').val();
        const contraseña = $('#contraseñaRegistrar').val();
        registrar(nombre,NombreUsuario,correo,contraseña);
    });

    $('#cerrarSesion').click(function () {
        event.preventDefault();
        TokenService.logOut();
        location.assign("../Login/index.html");
    });
    
    function login(nombreUsuario, contraseña) {
        AuthService.login(nombreUsuario, contraseña).then((response) => {
            location.assign("../Feed/index.html");
        }, (error) => {
            console.log("Error.")
        });
    }
    
    function salir() {

    }
    function registrar(nombre, nombreUsuario, correo, contraseña) {
        AuthService.nuevo(nombre, nombreUsuario, correo, contraseña);
    }   
});
