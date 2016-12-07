angular.module('dFashionApp')
.controller('basketCtrl', ['$scope','$rootScope', 'BasketService', '$timeout', '$location', function($scope, $rootScope, BasketService, $timeout, $location) {
  var vm = this;
  vm.basketItemAdded = false;
  vm.voucherCode ="";
  vm.appliedDiscountVouchers = BasketService.getAppliedDiscountVouchers();
  vm.voucherCodeFailed = false;

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

  goToBasket = function(){
    vm.basketItemAdded = false;
    $location.path('/basket');
  }

  continueShopping = function() {
    $location.path('/products');
  }

  closeBasket = function() {
    vm.basketItemAdded = false;
  }

  removeItem = function(product) {
    BasketService.removeItem(product);
  }

  applyVoucherCode = function() {
     if(vm.voucherCode.length > 0) {
       vm.voucherCodeFailed = BasketService.setVouchercode(vm.voucherCode);
     }
  }

  getAvailableVouchers = function() {
    return BasketService.getAvailableVouchers();
  }

  vm.getBasketSize = getBasketSize;
  vm.getTotalPrice = getTotalPrice;
  vm.getBasketItems = getBasketItems;
  vm.goToBasket = goToBasket;
  vm.continueShopping = continueShopping;
  vm.closeBasket = closeBasket;
  vm.removeItem = removeItem;
  vm.applyVoucherCode = applyVoucherCode;
  vm.getAvailableVouchers = getAvailableVouchers;

}]);
