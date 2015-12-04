myApp.controller('AddConditionController', ["$scope", "$http", "$uibModalInstance", "$localstorage",
    function($scope, $http, $uibModalInstance, $localstorage){

        $scope.conditions = [];
        $scope.condition = {};

        var patient = {patient_id: $localstorage.get('patient_id')};

        $scope.insertCondition = function(conditionData) {
            conditionData.patient_id = patient.patient_id;
            $http.post('/conditions/conditions', conditionData).then(function(response){
                $uibModalInstance.close("ok");
            });
        };

        $scope.ok = function (conditionData) {
            $scope.insertCondition(conditionData);

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);