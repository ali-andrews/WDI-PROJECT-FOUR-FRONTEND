// scope.$watch("assignments", function (value) {//I change here
//   var val = value || null;            
//   if (val)
//     element.dataTable({"bDestroy": true});
//   });
// }
angular
  .module("babyBagApp")
  .controller("HomeController", HomeController)

function HomeController(){
  $('#fullpage').fullpage();
  
}