myApp.controller('ConditionsController', ["$scope", "$http", "$uibModal", function($scope, $http, $uibModal){

    $scope.conditions = [];
    $scope.condition = {};

    var patient = {patient_id: 1};

    $scope.getConditions = function() {
        $http.get('/conditions/conditions', {params: patient}).then(function(response){
            $scope.conditions = response.data;
        });
    };

    $scope.getConditions();

    $scope.addCondition = function() {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/addcondition.html',
            controller: 'AddConditionController',
            size: 'lg',
            resolve: {
                items: function () {
                    // if want to pass something to the modal, do it here and
                    // inject items in the modal controller
                    return "something";
                }
            }
        });

        modalInstance.result.then(function (returnValue) {
            if(returnValue=="ok"){
                $scope.getConditions();
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.editCondition = function(condition) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/editcondition.html',
            controller: 'EditConditionController',
            size: 'lg',
            resolve: {
                items: function () {
                    return condition;
                }
            }
        });

        modalInstance.result.then(function (returnValue) {
            if(returnValue=="ok"){
                $scope.getConditions();
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

}]);