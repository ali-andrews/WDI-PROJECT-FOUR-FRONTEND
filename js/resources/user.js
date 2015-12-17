angular
  .module('babyBagApp')
  .factory('User', User);

User.$inject = ['$resource', 'API'];

function User($resource, API) {
  return $resource('http://localhost:3000/users/:id', null, {
    'authorize': { method:"POST", url: API+'authorize' },
    'join': { method:"POST", url: API+'join' }
  });
};

