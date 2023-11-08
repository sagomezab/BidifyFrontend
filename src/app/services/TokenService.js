const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';

var TokenService = (function() {
  return {
    setToken: function(token) {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.setItem(TOKEN_KEY, token);
    },

    getToken: function() {
      return sessionStorage.getItem(TOKEN_KEY);
    },

    setUserName: function(userName) {
      sessionStorage.removeItem(USERNAME_KEY);
      sessionStorage.setItem(USERNAME_KEY, userName);
    },

    getUserName: function() {
      return sessionStorage.getItem(USERNAME_KEY);
    },

    setAuthorities: function(authorities) {
      sessionStorage.removeItem(AUTHORITIES_KEY);
      sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    },

    getAuthorities: function() {
      this.roles = [];
      if (sessionStorage.getItem(AUTHORITIES_KEY)) {
        JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority) => {
          this.roles.push(authority.authority);
        });
      }

      return this.roles;
    },

    logOut: function() {
      sessionStorage.clear();
    }
  };
})();
