angular.module('dFashionApp')
.factory('BasketService', function ($rootScope){
  var basket = [];
  var vouchers;
  var totalPrice = 0;

  var basketObj = {
    product: "",
    prodName : "",
    quantity : 0,
    category : "",
    retailPrice: 0,
    prodImage: ""
  }

  var addItem = function(product){
    basketObj.product = product;
    basketObj.prodID = product.prodID;
    basketObj.prodName = product.prodName +', ' +product.color;
    basketObj.category = product.category;
    basketObj.quantity++;
    basketObj.retailPrice = product.retailPrice;
    basketObj.prodImage = product.prodImage;
    basket.push(basketObj);

    updateTotalPrice();
    $rootScope.$broadcast('basket-updated');
  };

  var updateTotalPrice = function(){
    totalPrice = 0;
    for (var index in basket) {
      totalPrice = totalPrice + (basket[index].retailPrice * basket[index].quantity);
    }
  };

  var getTotalPrice = function(){
    return totalPrice;
  }

  var getBasketSize = function(){
    return basket.length;
  }

  var getBasketItems = function(){
    return basket;
  }

  return {
    addItem : addItem,
    getTotalPrice : getTotalPrice,
    getBasketSize : getBasketSize,
    getBasketItems : getBasketItems,
  };
});
