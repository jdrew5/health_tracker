myApp.controller('MedicationsController', ["$scope", "$http", "$uibModal", function($scope, $http, $uibModal){

    $scope.medications = [];
    $scope.medication = {};

    var patient = {patient_id: 1};

    $scope.getMedications = function() {
        $http.get('/medications/medications', {params: patient}).then(function(response){
            $scope.medications = response.data;
            console.log("getting meds: ", $scope.medications);
        });
    };

    $scope.getMedications();

    $scope.addMedication = function() {
        console.log("adding a med");
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/addmedication.html',
            controller: 'AddMedicationController',
            size: 'lg',
            resolve: {
                items: function () {
                    return 'something';
                }
            }
        });
    };

    $scope.editMedication = function(medication) {
        console.log("editing a med ", medication);
    };

    $scope.insertMedication = function(medicationData) {
        $http.post('/medications/medications', medicationData).then(function(response){
            $scope.getMedications();
        });
    };

}]);