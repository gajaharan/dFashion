angular.module('dFashionApp')
.factory('BasketService', function ($rootScope){
  var basket = [];
  var vouchers;
  var totalPrice = 0;
  var basketQuantity = 0;

  var basketObj = {
    product: "",
    prodName : "",
    quantity : 0,
    category : "",
    retailPrice: 0,
    prodImage: ""
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
      basketObj.product = product;
      basketObj.prodID = product.prodID;
      basketObj.prodName = product.prodName +', ' +product.color;
      basketObj.category = product.category;
      basketObj.quantity++;
      basketObj.retailPrice = product.retailPrice;
      basketObj.prodImage = product.prodImage;
      basket.push(basketObj);
    }

    updateTotalPrice();
    $rootScope.$broadcast('basket-updated');
  };

  var removeItem = function(product){
    console.log("removeItem");
    var index =  basket.indexOf(product);
    if (basket[index].quantity > 1) {
      basket[index].quantity--;
    }
    else {
      basket[index].quantity--;
      basket.splice(index,1);
    }

    updateTotalPrice();
    $rootScope.$broadcast('basket-updated');
  };

  var updateTotalPrice = function(){
    totalPrice = 0;
    basketQuantity = 0;
    for (var index in basket) {
      totalPrice = totalPrice + (basket[index].retailPrice * basket[index].quantity);
      basketQuantity = basketQuantity + basket[index].quantity;
    }
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

  return {
    addItem : addItem,
    getTotalPrice : getTotalPrice,
    getBasketSize : getBasketSize,
    getBasketItems : getBasketItems,
    removeItem : removeItem
  };
});
