angular.module('dFashionApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/productList', {templateUrl: 'partials/product-list.html', controller: 'productCtrl as products'});
  $routeProvider.otherwise({redirectTo: '/productList'});
}]);
