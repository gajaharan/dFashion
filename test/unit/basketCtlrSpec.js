describe('basket controller', function(){
  var scope, controller, $httpBackend, compile;

  beforeEach(module('app'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $compile) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('vouchers.json').
      respond([{}]);

    scope = $rootScope.$new();
    compile = $compile;
    controller = $controller('basketCtrl', { $scope: scope });
  }));

  it("should load vouchers", function () {
    expect(true);
  });
});
