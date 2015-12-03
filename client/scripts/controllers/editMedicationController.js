myApp.controller('EditMedicationController', ["$scope", "$http", "$uibModalInstance", "items",
    function($scope, $http, $uibModalInstance, items){

        $scope.meds = items;

        $scope.editMedication = function(medicationData) {

            return $http.put('/medications/medications', medicationData).then(function(response){

            });
        };

        $scope.ok = function (medicationData) {

            var promise = $scope.editMedication(medicationData);

            promise.then(function() {
                $uibModalInstance.close("ok");
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);