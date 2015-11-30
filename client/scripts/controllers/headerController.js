myApp.controller('HeaderController', ["$scope", "$http", "$uibModal", function($scope, $http, $uibModal){

    $scope.patients = [];
    $scope.patient = {};

    var patient_id = 1;
    $scope.patients.patient_id = patient_id;

    $scope.getAllPatients = function() {
        $http.get('/patient/allpatients').then(function(response){
            $scope.patients = response.data;
        });
    };

    $scope.getPatient = function() {
        $scope.patient.patient_id = patient_id;
        $http.get('/patient/patients', {params: $scope.patient}).then(function(response){
            $scope.patient = response.data;
        });
    };

    $scope.getAllPatients();
    $scope.getPatient();

    $scope.addPatient = function() {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/addpatient.html',
            controller: 'AddPatientController',
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
                $scope.getPatient();
                $scope.getAllPatients();
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.editPatient = function(patient) {
        console.log("edit patient ", patient);

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/editpatient.html',
            controller: 'EditPatientController',
            size: 'lg',
            resolve: {
                items: function () {
                    return patient;
                }
            }
        });

        modalInstance.result.then(function (returnValue) {
            if(returnValue=="ok"){
                $scope.getPatient();
                $scope.getAllPatients();
            }
        }, function () {
            console.log("cancelled?");
            $scope.getPatient();
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

}]);