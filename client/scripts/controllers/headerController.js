myApp.controller('HeaderController', ["$scope", "$http", "$uibModal", "$localstorage",
    "$route", function($scope, $http, $uibModal, $localstorage, $route){

    $scope.patients = [];
    $scope.selectedPatient = {};

    if(!$localstorage.get('patient_id')){
      $localstorage.set('patient_id', 1);
    }

    this.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    // get all patients.  this fills patient drop down
    $scope.getAllPatients = function() {
        return $http.get('/patient/allpatients').then(function(response){
            $scope.patients = response.data;
        });
    };

    $scope.loadDropDown = function() {

        var promise = $scope.getAllPatients();

        promise.then(function() {
            var searchTerm = $localstorage.get('patient_id'),
                index = -1;
            for(var i = 0, len = $scope.patients.length; i < len; i++) {
                if ($scope.patients[i].patient_id == searchTerm) {
                    index = i;
                    break;
                }
            }

            $scope.selectedPatient = $scope.patients[i];

        });

    };

    $scope.loadDropDown();

    $scope.addPatient = function() {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/addpatient.html',
            controller: 'AddPatientController',
            size: 'sm',
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
                $scope.loadDropDown();
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.editPatient = function(patient) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/editpatient.html',
            controller: 'EditPatientController',
            size: 'sm',
            resolve: {
                items: function () {
                    return patient;
                }
            }
        });

        modalInstance.result.then(function (returnValue) {
            if(returnValue=="ok"){
                $scope.loadDropDown();
            }
        }, function () {
            // just reload if cancel
            $scope.loadDropDown();
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.changePatient = function(selectedPatientObject) {

        $localstorage.set('patient_id', selectedPatientObject.patient_id);
        $scope.selectedPatient = selectedPatientObject;

        // reload the route
        $route.reload();
    };

}]);
