myApp.controller('AddConditionController', ["$scope", "$http", "$uibModalInstance",
    function($scope, $http, $uibModalInstance){

        $scope.conditions = [];
        $scope.condition = {};

        var patient = {patient_id: 1};

        $scope.insertCondition = function(conditionData) {
            conditionData.patient_id = patient.patient_id;
            $http.post('/conditions/conditions', conditionData).then(function(response){
                console.log("do something after inserting");
            });
        };

        $scope.ok = function (conditionData) {
            console.log("ok function ", conditionData);
            $scope.insertCondition(conditionData);
            $uibModalInstance.close("ok");
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);