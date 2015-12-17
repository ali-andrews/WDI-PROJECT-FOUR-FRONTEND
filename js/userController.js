angular
  .module('babyBagApp')
  .controller('UserController', UserController)

UserController.$inject = ['User', 'TokenService', '$location', 'checkoutService', '$rootScope', '$timeout'];
function UserController(User, TokenService, $location, checkoutService, $rootScope, $timeout) {

  var self = this;

  self.all = [];
  self.user = {};

  $rootScope.$on('$stateChangeSuccess', function() {
    if(checkoutService.success) {
      self.paymentSuccessful = true;
      self.products = checkoutService.products;
      self.totalAmount = checkoutService.totalAmount;
      checkoutService.success = false;
    }
  });

 function handleLogin(res) {
   var token = res.token ? res.token:null;
  
   if (token) {
     console.log(res);
     self.getUsers();
     self.user = TokenService.getUser();
   }

   self.message = res.message;
 }

  self.authorize = function() {
    User.authorize(self.user, handleLogin);
    console.log("click I DONT WORK")
    $location.path('/profile')
  }

  self.join = function() {
    User.join(self.user, handleLogin);
    console.log(self.user)
    $location.path('/profile')
  }

  self.disappear = function() {
    TokenService.removeToken();
    self.all = [];
    self.user = {};
  }

  self.getUsers = function() {
    self.all = User.query();
  }

  self.isLoggedIn = function() {
    return !!TokenService.getToken();
  }

  if(self.isLoggedIn()) {
    self.getUsers();
    self.user = TokenService.getUser();
  }
}