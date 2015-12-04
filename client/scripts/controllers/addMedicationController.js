myApp.controller('AddMedicationController', ["$scope", "$http", "$uibModalInstance", "$localstorage",
    function($scope, $http, $uibModalInstance, $localstorage){

    $scope.medications = [];
    $scope.medication = {};

    var patient = {patient_id: $localstorage.get('patient_id')};

    $scope.insertMedication = function(medicationData) {
        medicationData.patient_id = patient.patient_id;
        $http.post('/medications/medications', medicationData).then(function(response){
            $uibModalInstance.close("ok");
        });
    };

    $scope.ok = function (medicationData) {
        $scope.insertMedication(medicationData);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);