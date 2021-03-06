myApp.controller('MedicationsController', ["$scope", "$http", "$uibModal", "$localstorage", function($scope, $http, $uibModal, $localstorage){

    $scope.medications = [];
    $scope.medication = {};
    $scope.gridOptions = {};

    var patient = {patient_id: $localstorage.get('patient_id')};

    $scope.getMedications = function() {
        return $http.get('/medications/medications', {params: patient}).then(function(response){
            console.log("medications ", response.data);
            $scope.medications = response.data;
        });
    };

    $scope.loadData = function() {

        var promise = $scope.getMedications();

        promise.then(function() {
            $scope.gridOptions = {
                columnDefs : [
                    {name: 'Action',
                        cellEditableCondition: false,
                        cellTemplate: '<button ng-click="grid.appScope.editMedication(row.entity)" ' +
                        'id="editMedication" class="btn btn-xs btn-primary">Edit</button>' +
                        '<button ng-click="grid.appScope.deleteMedication(row.entity)" class="btn btn-xs btn-danger">Delete</button>' },
                    { name: 'medication_id', displayName: 'Medication ID'},
                    { name: 'name', displayName: 'Name'},
                    { name: 'suggested_dose', displayName: 'Suggested Dose' },
                    { name: 'suggested_timing', displayName: 'Suggested Timing' },
                    { name: 'uom', displayName: 'Unit of Measure' },
                    { name: 'current_ind', displayName: 'Current Ind' },
                    { name: 'patient_id', displayName: 'Patient ID'}],
                data: $scope.medications
            };
        });

    };

    $scope.loadData();

    $scope.addMedication = function() {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/addmedication.html',
            controller: 'AddMedicationController',
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
                $scope.loadData();
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
            size: 'sm',
            resolve: {
                items: function () {
                    return medication;
                }
            }
        });

        modalInstance.result.then(function (returnValue) {
            if(returnValue=="ok"){
                $scope.loadData();
            }
        }, function () {
            $scope.loadData();
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.deleteMedication = function(medication){

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/deleteconfirm.html',
            controller: 'DeleteConfirmController',
            size: 'sm',
            resolve: {
                items: function () {
                    // if want to pass something to the modal, do it here and
                    // inject items in the modal controller
                    return medication;
                }
            }
        });

        modalInstance.result.then(function (returnValue) {
            if(returnValue=="ok"){
                console.log("deleting med...", medication);
                $http.delete('/medications/delete'+ medication.medication_id).then(function(response){
                    $scope.loadData();;
                });
            }
        }, function () {
            // cancelled confirm.  nothing to do.
        });

    };

}]);