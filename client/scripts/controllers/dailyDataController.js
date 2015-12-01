myApp.controller('DailyDataController', ["$scope", "$http", "$localstorage", function($scope, $http, $localstorage){

    $scope.medications = [];
    $scope.conditions = [];
    $scope.selectedDate = {};

    var patient = {patient_id: $localstorage.get('patient_id')};

    $scope.getConditions = function() {
        $http.get('/dailydata/conditions', {params: patient}).then(function(response){
            $scope.conditions = response.data;
        });
    };

    $scope.getConditions();

    $scope.getMedications = function() {
        $http.get('/dailydata/medications', {params: patient}).then(function(response){
            $scope.medications = response.data;
        });
    };

    $scope.getMedications();

    $scope.submitConditions = function(conditionData) {

        for (var i = 0; i < conditionData.length; i++) {
            var conditionInsert = {};
            if(conditionData[i].addCheckbox) {
                conditionInsert.entry_date = $scope.selectedDate.date;
                conditionInsert.patient_id = patient.patient_id;
                conditionInsert.condition_id = conditionData[i].condition_id;
                conditionInsert.add_value = conditionData[i].addValue;

                // do the post
                $http.post('/dailydata/conditions', conditionInsert).then(function(response){
                    $scope.getConditions();
                });
            }
        }
    };

    $scope.submitMedications = function(medicationData) {

        for (var i = 0; i < medicationData.length; i++) {
            var medicationInsert = {};
            if(medicationData[i].addCheckbox) {
                medicationInsert.entry_date = $scope.selectedDate.date;
                medicationInsert.patient_id = patient.patient_id;
                medicationInsert.medication_id = medicationData[i].medication_id;
                medicationInsert.dose_given = medicationData[i].suggested_dose;
                medicationInsert.uom = medicationData[i].uom;

                // do the actual post stuff
                $http.post('/dailydata/medications', medicationInsert).then(function(response){
                    $scope.getMedications();
                });
            }
        }
    };
}]);