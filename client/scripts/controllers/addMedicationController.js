myApp.controller('AddMedicationController', ["$scope", "$http", "$uibModalInstance", function($scope, $http, $uibModalInstance){

    $scope.medications = [];
    $scope.medication = {};

    var patient = {patient_id: 1};

    $scope.insertMedication = function(medicationData) {
        $http.post('/medications/medications', medicationData).then(function(response){
            //$scope.getMedications();
            console.log("do something after inserting");
        });
    };

    $scope.ok = function () {
        $uibModalInstance.close();
    };

}]);