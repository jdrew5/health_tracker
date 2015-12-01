myApp.controller('ConditionsController', ["$scope", "$http", "$uibModal", "$localstorage", function($scope, $http, $uibModal, $localstorage){

    $scope.conditions = [];
    $scope.condition = {};
    $scope.gridOptions = {};

    var patient = {patient_id: $localstorage.get('patient_id')};

    $scope.getConditions = function() {
        return $http.get('/conditions/conditions', {params: patient}).then(function(response){
            $scope.conditions = response.data;

        });
    };

    //$scope.getConditions();

    $scope.loadData = function() {

        var promise = $scope.getConditions();

        promise.then(function() {
            $scope.gridOptions = {
                columnDefs : [
                    {name: 'Action',
                        cellEditableCondition: false,
                        cellTemplate: '<button ng-click="grid.appScope.editCondition(row.entity)" ' +
                        'id="editCondition" class="btn btn-xs btn-primary">Edit</button>' },
                    { name: 'condition_id', displayName: 'Condition ID'},
                    { name: 'name', displayName: 'Name' },
                    { name: 'current_ind', displayName: 'Current Ind' },
                    { name: 'patient_id', displayName: 'Patient ID'}],
                data: $scope.conditions
            };

        });

    };

    $scope.loadData();

    $scope.addCondition = function() {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/addcondition.html',
            controller: 'AddConditionController',
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
                $scope.loadData();
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.editCondition = function(condition) {

        console.log("condition arg ", condition);

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../assets/views/templates/editcondition.html',
            controller: 'EditConditionController',
            size: 'lg',
            resolve: {
                items: function () {
                    return condition;
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

}]);