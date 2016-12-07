angular.module('dFashionApp')
.service('VoucherService', ['$http', function ($http)  {
  var voucherFactory = {};
  voucherFactory.getAllVouchers = function (location) {
    return $http.get('resources/vouchers.json')
      .then(function(result) {
          return result.data;
    });
  };
  return voucherFactory;
}]);
