angular
  .module("babyBagApp", ['ngResource', 'ui.router', 'angular-jwt'])
  .constant("API", "http://localhost:3000/")
  .config(Interceptor)
  .config(MainRouter);

Interceptor.$inject = ['$httpProvider'];
function Interceptor($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
};

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "partials/home.html",
        controller: "HomeController"
      })
      .state('products', {
        url: "/products",
        templateUrl: "partials/products.html",
      })
      .state('viewProduct', {
        url: "/products/:id",
        templateUrl: "partials/product.html",
        controller: 'ProductViewController'
      })
      .state('about', {
        url: "/about",
        templateUrl: "partials/about.html",
      })
      .state('login', {
        url: "/login",
        templateUrl: "partials/login.html"
      })
      .state('register', {
        url: "/register",
        templateUrl: "partials/register.html",
      })
      .state('cart', {
        url: "/cart",
        templateUrl: "partials/cart.html",
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "partials/profile.html",
      })
      .state('checkout', {
        url: "/checkout",
        templateUrl: "partials/checkout.html",
      })



      
$urlRouterProvider.otherwise("/");
}