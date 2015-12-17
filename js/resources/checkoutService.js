angular
  .module('babyBagApp')
  .service('checkoutService', checkoutService);

function checkoutService() {
  return {
    success: false,
    products: [],
    totalAmount: 0
  }
}