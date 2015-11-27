myApp.controller('EditMedicationController', ["$scope", "$http", "$uibModalInstance", "items",
    function($scope, $http, $uibModalInstance, items){

        console.log("items ", items);
        $scope.meds = items;

        $scope.editMedication = function(medicationData) {

            $http.put('/medications/medications', medicationData).then(function(response){
                console.log("do something after updating");
            });
        };

        $scope.ok = function (medicationData) {
            console.log("ok function ", medicationData);
            $scope.editMedication(medicationData);
            $uibModalInstance.close("ok");
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);