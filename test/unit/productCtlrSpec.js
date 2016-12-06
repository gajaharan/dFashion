describe('product controller', function(){
  var scope, controller, $httpBackend, compile;

  beforeEach(module('app'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $compile) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('product.json').
      respond([{prodID: '001', prodName: 'blue shoe', category: 'footwear', retialPrice: 45, quantity: 5}]);

    scope = $rootScope.$new();
    compile = $compile;
    controller = $controller('productCtrl', { $scope: scope });
  }));

  it("should load product list", function () {
    expect(true);
  });
});
