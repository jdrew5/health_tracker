myApp.controller('AddMedicationController', ["$scope", "$http", "$uibModalInstance",
    function($scope, $http, $uibModalInstance){

    $scope.medications = [];
    $scope.medication = {};

    var patient = {patient_id: 1};

    $scope.insertMedication = function(medicationData) {
        medicationData.patient_id = patient.patient_id;
        $http.post('/medications/medications', medicationData).then(function(response){

        });
    };

    $scope.ok = function (medicationData) {
        $scope.insertMedication(medicationData);
        $uibModalInstance.close("ok");
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);