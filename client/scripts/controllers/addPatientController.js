myApp.controller('AddPatientController', ["$scope", "$http", "$uibModalInstance",
    function($scope, $http, $uibModalInstance){

        $scope.patients = [];
        $scope.patient = {};

        var patient = {patient_id: 1};

        $scope.insertPatient = function(patientData) {
            patientData.patient_id = patient.patient_id;
            $http.post('/patient/patients', patientData).then(function(response){
                $uibModalInstance.close("ok");
            });
        };

        $scope.ok = function (patientData) {
            console.log("ok function ", patientData);
            $scope.insertPatient(patientData);

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);