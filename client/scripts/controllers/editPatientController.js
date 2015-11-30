myApp.controller('EditPatientController', ["$scope", "$http", "$uibModalInstance", "items",
    function($scope, $http, $uibModalInstance, items){

        // put the data passed in into the form
        items.dob = new Date(items.dob);
        $scope.patient = items;

        $scope.editPatient = function(patientData) {

            return $http.put('/patient/patients', patientData).then(function(response){

            });
        };

        $scope.ok = function (patientData) {

            var promise = $scope.editPatient(patientData);

            promise.then(function() {
                $uibModalInstance.close("ok");
            });

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);