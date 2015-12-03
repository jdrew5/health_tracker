myApp.controller('DashboardController', ["$scope", "$http", "$localstorage", function($scope, $http, $localstorage){

    $scope.medications = [];
    $scope.conditions = [];
    $scope.allconditions = [];
    $scope.conditionChartData = {};
    $scope.filterData = {};
    $scope.selectedCondition = {};

    $scope.filterData.patient_id = $localstorage.get('patient_id');

    // default date filters to today and one week prior
    if(!$scope.filterData.end_date) {
        $scope.filterData.end_date =  new Date;
    }

    if(!$scope.filterData.start_date) {
        $scope.filterData.start_date = new Date($scope.filterData.end_date.getTime() - (60*60*24*7*1000));
    }

    // get all conditions for a patient to populate drop down
    $scope.getAllConditions = function() {
        return $http.get('/dashboard/allconditions', {params: $scope.filterData}).then(function(response){
            $scope.allconditions = response.data;
        });
    };

    $scope.loadDropDown = function() {

        var promise = $scope.getAllConditions();

        promise.then(function() {
            // default to the first item in the drop down
            $scope.selectedCondition = $scope.allconditions[0];
            });
    };

    $scope.loadDropDown();


    $scope.loadData = function() {
        $scope.getMedications();
        $scope.getConditions();
    };

    $scope.getMedications = function() {
        $scope.filterData.condition_id = $scope.selectedCondition.condition_id;
        $http.get('/dashboard/medications', {params: $scope.filterData}).then(function(response){
            $scope.medications = response.data;
            //$scope.gridOptions = {
            //    headerTemplate: './views/templates/med-grid-header-template.html',
            //    data: $scope.medications
            //};
        });
    };

    $scope.getMedications();

    // gets condition entries for a condition between date range
    $scope.getConditions = function() {
        $scope.filterData.condition_id = $scope.selectedCondition.condition_id;
        $http.get('/dashboard/conditions', {params: $scope.filterData}).then(function(response){

            $scope.conditions = response.data;

            $scope.conditionChartData = {
                        chart: {
                            caption: "Condition Chart",
                            subCaption: $scope.selectedCondition.name,
                            "xAxisName": "Date",
                            "yAxisName": "Value",

                            //Cosmetics
                            "lineThickness" : "2",
                            "paletteColors" : "#0075c2",
                            "baseFontColor" : "#333333",
                            "baseFont" : "Helvetica Neue,Arial",
                            "captionFontSize" : "14",
                            "subcaptionFontSize" : "14",
                            "subcaptionFontBold" : "0",
                            "showBorder" : "0",
                            "bgColor" : "#ffffff",
                            "showShadow" : "0",
                            "canvasBgColor" : "#ffffff",
                            "canvasBorderAlpha" : "0",
                            "divlineAlpha" : "100",
                            "divlineColor" : "#999999",
                            "divlineThickness" : "1",
                            "divLineIsDashed" : "1",
                            "divLineDashLen" : "1",
                            "divLineGapLen" : "1",
                            "showXAxisLine" : "1",
                            "xAxisLineThickness" : "1",
                            "xAxisLineColor" : "#999999",
                            "showAlternateHGridColor" : "0"
                        },

                        data: $scope.conditions
            }

        });
    };

    $scope.getConditions();

}]);