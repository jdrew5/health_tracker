myApp.controller('EditConditionController', ["$scope", "$http", "$uibModalInstance", "items",
    function($scope, $http, $uibModalInstance, items){

        console.log("items ", items);
        $scope.conditions = items;

        $scope.editCondition = function(conditionData) {

            return $http.put('/conditions/conditions', conditionData).then(function(response){

            });
        };

        $scope.ok = function (conditionData) {

            var promise = $scope.editCondition(conditionData);

            promise.then(function() {
                $uibModalInstance.close("ok");
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);