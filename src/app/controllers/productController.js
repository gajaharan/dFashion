/*
* Gets the product data from product service. Will be able to get the model for
* the view to display the products and add items to basket.
*/
angular.module('dFashionApp')
.controller('productCtrl', ['ProductService', function(ProductService) {
  var vm = this;
  var SERVER_ERROR = ' Unable to get products. Please try again later.'
  vm.message = '';

  getAllProducts = function() {
	  ProductService.getAllProducts().then(function (result) {
	    vm.productList = result;
	  }, function (result) { // on failure
	    vm.message = SERVER_ERROR;

	  });
	}

  addItem = function(product){

  };

  getAllProducts();

  vm.getAllProducts = getAllProducts;
  vm.addItem = addItem;
}]);
