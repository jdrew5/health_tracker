myApp.controller('MedicationsController', ["$scope", "$http", "$uibModal", function($scope, $http, $uibModal){

    $scope.medications = [];
    $scope.medication = {};

    var patient = {patient_id: 1};

    $scope.getMedications = function() {
        $http.get('/medications/medications', {params: patient}).then(function(response){
            $scope.medications = response.data;
        });
    };

    $scope.getMedications();

    $scope.addMedication = function() {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/addmedication.html',
            controller: 'AddMedicationController',
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
                $scope.getMedications();
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.editMedication = function(medication) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/editmedication.html',
            controller: 'EditMedicationController',
            size: 'lg',
            resolve: {
                items: function () {
                    return medication;
                }
            }
        });

        modalInstance.result.then(function (returnValue) {
            if(returnValue=="ok"){
                $scope.getMedications();
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

}]);