myApp.controller('DeleteConfirmController', ["$scope", "$uibModalInstance", "items",
    function($scope, $uibModalInstance, items){

        console.log("items ", items);
        $scope.items = items;

        $scope.ok = function () {
            $uibModalInstance.close("ok");
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);