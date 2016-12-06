angular.module('dFashionApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/productList', {templateUrl: 'partials/product-list.html', controller: 'productCtrl as products'});
  $routeProvider.when('/basket', {templateUrl: 'partials/basket.html', controller: 'basketCtrl as basket'});  
  $routeProvider.otherwise({redirectTo: '/productList'});
}]);
