angular.module('dFashionApp')
.controller('basketCtrl', ['$scope','$rootScope', 'BasketService', '$timeout', '$location', function($scope, $rootScope, BasketService, $timeout, $location) {
  var vm = this;

  $rootScope.$on('basket-updated',function(){
    vm.basketItemAdded = true;
    $timeout(function () { vm.basketItemAdded = false; }, 3000);
  });

  getBasketSize = function(){
    return BasketService.getBasketSize();
  }

  getTotalPrice = function(){
    return BasketService.getTotalPrice();
  }

  getBasketItems = function(){
     return BasketService.getBasketItems();
  }

  vm.getBasketSize = getBasketSize;
  vm.getTotalPrice = getTotalPrice;
  vm.getBasketItems = getBasketItems;
}]);
