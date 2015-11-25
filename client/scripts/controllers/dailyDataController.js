myApp.controller('DailyDataController', ["$scope", "$http", function($scope, $http){

    $scope.medications = [];
    $scope.conditions = [];
    $scope.selectedDate = {};

    var patient = {patient_id: 1};

    $scope.getConditions = function() {
        $http.get('/dailydata/conditions', {params: patient}).then(function(response){
            $scope.conditions = response.data;
        });
    };

    $scope.getConditions();

    $scope.getMedications = function() {
        $http.get('/dailydata/medications', {params: patient}).then(function(response){
            $scope.medications = response.data;
            console.log("meds: ", $scope.medications);
        });
    };

    $scope.getMedications();

    $scope.submitConditions = function(conditionData) {
        console.log("form stuff", conditionData);
        console.log("selectedDate", $scope.selectedDate);

        for (var i = 0; i < conditionData.length; i++) {
            var conditionInsert = {};
            if(conditionData[i].addCheckbox) {
                conditionInsert.entry_date = $scope.selectedDate.date;
                conditionInsert.patient_id = patient.patient_id;
                conditionInsert.condition_id = conditionData[i].condition_id;
                conditionInsert.add_value = conditionData[i].addValue;

                console.log("condition insert data ", conditionInsert);
                // do the post
                $http.post('/dailydata/conditions', conditionInsert).then(function(response){
                    $scope.getConditions();
                });
            }
        }
    };

    $scope.submitMedications = function(medicationData) {
        console.log("form stuff", medicationData);
        console.log("selectedDate", $scope.selectedDate);

        for (var i = 0; i < medicationData.length; i++) {
            var medicationInsert = {};
            if(medicationData[i].addCheckbox) {
                medicationInsert.entry_date = $scope.selectedDate.date;
                medicationInsert.patient_id = patient.patient_id;
                medicationInsert.medication_id = medicationData[i].medication_id;
                medicationInsert.dose_given = medicationData[i].suggested_dose;
                medicationInsert.uom = medicationData[i].uom;

                console.log("medication insert data ", medicationInsert);
                // do the actual post stuff
                $http.post('/dailydata/medications', medicationInsert).then(function(response){
                    $scope.getMedications();
                });
            }
        }
    };
}]);