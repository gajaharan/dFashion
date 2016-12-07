/*
* Gets the product data from product service. Will be able to get the model for
* the view to display the products and add items to basket.
*/
angular.module('dFashionApp')
.controller('productCtrl', ['$rootScope', 'ProductService', 'BasketService', function($rootScope, ProductService, BasketService) {
  var vm = this;
  var SERVER_ERROR = ' Unable to get products. Please try again later.'
  vm.message = '';

  $rootScope.$on('item-removed',function(event, product){
    product.stock++;
    for(index in vm.productList) {
      if (vm.productList[index].prodID == product.prodID) {
        vm.productList[index] = product
      }
    }
  });

  getAllProducts = function() {
	  ProductService.getAllProducts().then(function (result) {
	    vm.productList = result;
	  }, function (result) { // on failure
	    vm.message = SERVER_ERROR;

	  });
	}

  addItem = function(index, product){
    if (product.stock > 0) {
      BasketService.addItem(product);
      product.stock--;
      vm.productList[index] = product;
    }
  };

  getAllProducts();

  vm.getAllProducts = getAllProducts;
  vm.addItem = addItem;
}]);
