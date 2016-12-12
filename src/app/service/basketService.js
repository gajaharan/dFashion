angular.module('dFashionApp')
.factory('BasketService', function ($rootScope, VoucherService){
  var SERVER_ERROR = ' Unable to get vouchers. Please try again later.'
  var basket = [];
  var vouchers;
  var totalPrice = 0;
  var basketQuantity = 0;
  var vouchercode;
  var voucherCodeFailed = false;
  var discountApplied = false;
  var appliedDiscountVouchers = [];

  function basketObj() {
    this.product = "";
    this.prodName = "";
    this.quantity = 0;
    this.category = "";
    this.retailPrice = 0;
    this.prodImage = "";
  }

  var addItem = function(product){
    var productExist = false;
    for (index in basket) {
      if (basket[index].prodID == product.prodID) {
         basket[index].quantity++;
         productExist = true;
         break;
      }
    }

    if (!productExist) {
      var obj = new basketObj()
      obj.product = product;
      obj.prodID = product.prodID;
      obj.prodName = product.prodName +', ' +product.color;
      obj.category = product.category;
      obj.quantity++;
      obj.retailPrice = product.retailPrice;
      obj.salePrice = product.salePrice;
      obj.prodImage = product.prodImage;
      basket.push(obj);
    }

    updateTotalPrice();
    $rootScope.$broadcast('basket-updated');
  };

  var removeItem = function(product){
    var index =  basket.indexOf(product);
    $rootScope.$broadcast('item-removed', basket[index].product);
    if (basket[index].quantity > 1) {
      basket[index].quantity--;
    }
    else {
      basket[index].quantity--;
      basket.splice(index,1);
    }

    updateTotalPrice();
  };

  var updateTotalPrice = function(){
    totalPrice = 0;
    basketQuantity = 0;
    for (var index in basket) {
      totalPrice = totalPrice + (checkSalePrice(basket[index]) * basket[index].quantity);
      basketQuantity = basketQuantity + basket[index].quantity;
    }
    applyDiscount();

    for (var index in appliedDiscountVouchers) {
      totalPrice = totalPrice - appliedDiscountVouchers[index].discountAmount;
    }

  };

  var checkSalePrice = function(basketIem){
    return ((basketIem.salePrice > 0) && (basketIem.salePrice < basketIem.retailPrice)) ? basketIem.salePrice : basketIem.retailPrice;
  };

  var getTotalPrice = function(){
    return totalPrice;
  }

  var getBasketSize = function(){
    return basketQuantity;
  }

  var getBasketItems = function(){
    return basket;
  }

  getVouchers = function() {
    VoucherService.getAllVouchers().then(function (result) {
      vouchers = result;
    }, function (result) {
      message = SERVER_ERROR;

    });
  };

  getVouchers();


  applyDiscount = function() {
    if (vouchers.length > 0 && basket.length > 0) {
      for (var index in vouchers) {
        if (appliedDiscountVouchers.indexOf(vouchers[index]) < 0) {
          if (!discountApplied &&  checkSpendingRequirements(vouchers[index])) {
            if (vouchers[index].category.length > 0) {
              if (checkCategoryRequirements(vouchers[index])) {
                  appliedDiscountVouchers.push(vouchers[index]);
              }
            }
            else {
              appliedDiscountVouchers.push(vouchers[index]);
            }
          }
          else if ((vouchercode) && (vouchers[index].voucherCode == vouchercode)) {
            appliedDiscountVouchers.push(vouchers[index]);
            updateTotalPrice();
          }
          else if ((vouchercode) && (vouchers[index].voucherCode != vouchercode)) {
            voucherCodeFailed = true;
          }
        }
      }
    }

    if (basket.length == 0) {
      appliedDiscountVouchers = []
    }
  };

  checkSpendingRequirements = function (voucher) {
    return (voucher.minimumSpend > 0) && (totalPrice > voucher.minimumSpend);
  };

  checkCategoryRequirements = function (voucher) {
    for (index in basket) {
      return voucher.category.indexOf(basket[index].category) > -1
    }
  };


  var setVouchercode = function(code) {
    vouchercode = code;
    applyDiscount();
    return voucherCodeFailed;
  }

  var getAppliedDiscountVouchers = function() {
    return appliedDiscountVouchers;
  }

  var getAvailableVouchers = function() {
    return vouchers;
  }

  return {
    addItem : addItem,
    getTotalPrice : getTotalPrice,
    getBasketSize : getBasketSize,
    getBasketItems : getBasketItems,
    removeItem : removeItem,
    setVouchercode : setVouchercode,
    getAppliedDiscountVouchers : getAppliedDiscountVouchers,
    getAvailableVouchers : getAvailableVouchers
  };
});
