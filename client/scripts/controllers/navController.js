myApp.controller('NavController', ['$scope','$location', function($scope, $location){
    $scope.isActive = function (viewLocation) {
        //console.log($location.path());
        return viewLocation === $location.path();
    };
}]);