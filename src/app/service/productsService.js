/*
* Gets the product data from json file. Can easily replace file with server
* address.
*/
angular.module('dFashionApp')
.service('ProductService', ['$http', function ($http)  {
  var productsFactory = {};
  productsFactory.getAllProducts = function () {
    return $http.get('resources/products.json')
      .then(function(result) {
        return result.data;
      });
    };
    return productsFactory;
}]);
