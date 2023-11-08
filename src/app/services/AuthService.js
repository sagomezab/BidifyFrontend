AuthService = (function() {
  return {
    nuevo: function(nombre,nombreUsuario,email,password){
      var data = JSON.stringify({
          nombre: nombre,
          nombreUsuario: nombreUsuario,
          email: email,
          password: password
      });
      return new Promise(function(resolve, reject) {
          $.ajax({
              type: "POST",
              url: "http://localhost:8080/auth/nuevo",
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              data: data,
              success: function(response) {
                resolve(response);
              }
          })
      });
    },
    login: function(nombreUsuario, password) {
      var data = JSON.stringify({
        nombreUsuario: nombreUsuario,
        password: password
      });
    
      return new Promise(function(resolve, reject) {
        $.ajax({
          type: "POST",
          url: "http://localhost:8080/auth/login",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: data,
          success: function(response) {
            TokenService.setToken(response.token);
            TokenService.setUserName(response.nombreUsuario);
            TokenService.setAuthorities(response.authorities);
            resolve(response);
          }, 
          error: function (response) {
            reject(response)
          }
        });
      });
    }
  }
})();
