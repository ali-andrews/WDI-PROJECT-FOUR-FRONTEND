angular
  .module('babyBagApp')
  .factory('Checkout', Checkout);

Checkout.$inject = ['$resource', 'API'];

function Checkout($resource, API) {
  return $resource('http://localhost:3000/checkout', null, {
    'checkout': { method:"POST", url: 'http://localhost:3000/checkout' },  //Remember to change this API+'checkout'
  });
};

