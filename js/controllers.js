angular
  .module("babyBagApp")
  // .controller("MainController", MainController)
  .controller("ProductController", ProductController)
  .controller("ProductViewController", ProductViewController)
  .controller("CartController", CartController);

// MainController.$inject = ['User', 'TokenService']
// function MainController() {
// }

function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}

ProductController.$inject = ['Product'];
function ProductController(Product) {
  var self = this;
  Product.query(function(data) {
    self.products = chunk(data, 3);
  });
}

ProductViewController.$inject = ["$window", "$stateParams", 'Product'];
function ProductViewController($window, $stateParams, Product) {
  this.product = Product.get({ id: $stateParams.id });

  this.addToCart = function() {
    var cart = $window.localStorage.getItem("cart");
    var items;

    if (cart) {
      items = angular.fromJson(cart);
      items.push(this.product);
    } else {
      items = [this.product];      
    }
    
    $window.localStorage.setItem("cart", angular.toJson(items));
    // $window.alert('added to cart');
  }
}

CartController.$inject = ["$window", "$scope", "Checkout", "$state", "checkoutService"];
function CartController($window, $scope, Checkout, $state, checkoutService) {
  var self = this;
  this.totalAmount = 0;  
  this.products = angular.fromJson($window.localStorage.getItem("cart")) || [];  

  this.totalAmount = this.products.reduce(function(prev, current) { 
    return prev + current.price;
  }, 0).toFixed(2);

  this.paymentSuccessful = false;

  var amountToSend = self.totalAmount; //sends to back end

    jQuery(function($) {    //creates token
      $('#payment-form-2').submit(function(event) {
        var $form = $(this);

        // Disable the submit button to prevent repeated clicks
        $form.find('button').prop('disabled', true);

        Stripe.card.createToken($form, stripeResponseHandler);

        // Prevent the form from submitting with the default action
        return false;
      });
    });

    function stripeResponseHandler(status, response) {
      var $form = $('#payment-form-2');

      if (response.error) {
        // Show the errors on the form
        $form.find('.payment-errors').text(response.error.message);
        $form.find('button').prop('disabled', false);
      } else {
        // response contains id and card, which contains additional card details
        var token = response.id;
        var data = {
          payToken: token,
          amount:amountToSend
        }
        Checkout.checkout(data, function() {
          console.log("done");
          $scope.$evalAsync(function(){
            self.paymentSuccessful = true;
            checkoutService.totalAmount = self.totalAmount;
            checkoutService.success = true;
            $window.localStorage.removeItem("cart")
            $state.go('profile');
          })
        })

      }
    };

}
