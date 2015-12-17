angular
  .module('babyBagApp')
  .factory('Product', Product);

Product.$inject = ['$resource'];

function Product($resource) {
  // Obtain our resource class
  var Product = $resource('http://localhost:3000/products/:id', null, {
    'get': { method:'GET' }
  });

  // Product.prototype.firstName = function() {
  //   if (this.name) {
  //     return this.name.split(" ")[0];
  //   };
  // };

  // Object.defineProperty(Product.prototype, 'firstName', {
  //   get: function() {
  //     if (this.name) {
  //       return this.name.split(" ")[0];
  //     };
  //   }
  // });

  return Product;
}