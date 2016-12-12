angular.module('dFashionApp')
.directive('formatPrice', ['$filter', function($filter) {
  return {
    restrict: 'E',
    template: '<span class="{{myClass}} price">{{retailPrice}}</span><span ng-show="showSalePrice" class="sale">&nbsp;{{salePrice}}</span>',
    scope: {
      product: "=",
      isBasket: "="
    },
    link: function(scope, ele, attrs) {

      scope.showSalePrice = false;
      if (!scope.isBasket && (scope.product.salePrice > 0) && (scope.product.salePrice < scope.product.retailPrice)) {
        scope.salePrice = $filter('currency')(scope.product.salePrice, '£', 2);
        scope.showSalePrice = true;
        scope.myClass ="line-through";
      }

      if (scope.isBasket) {
        scope.retailPrice = $filter('currency')(scope.product, '£', 2);
      } else {
        scope.retailPrice = $filter('currency')(scope.product.retailPrice, '£', 2);
      }

    }
  }
}]);
