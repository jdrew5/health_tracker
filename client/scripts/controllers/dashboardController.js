myApp.controller('DashboardController', ["$scope", "$http", "$localstorage", function($scope, $http, $localstorage){

    $scope.medications = [];
    $scope.conditions = [];
    $scope.allconditions = [];
    $scope.conditionChartData = {};
    $scope.filterData = {};

    $scope.filterData.patient_id = $localstorage.get('patient_id');

    // default date filters to today and one week prior
    if(!$scope.filterData.end_date) {
        $scope.filterData.end_date =  new Date;
    }

    if(!$scope.filterData.start_date) {
        $scope.filterData.start_date = new Date($scope.filterData.end_date.getTime() - (60*60*24*7*1000));
    }

    $scope.getAllConditions = function() {
        $http.get('/dashboard/allconditions', {params: $scope.filterData}).then(function(response){
            $scope.allconditions = response.data;
            $scope.filterData.condition_id = 1;
        });
    };

    $scope.getAllConditions();

    $scope.loadData = function() {
        $scope.getMedications();
        $scope.getConditions();
    };

    $scope.getMedications = function() {
        $http.get('/dashboard/medications', {params: $scope.filterData}).then(function(response){
            $scope.medications = response.data;

            //$scope.gridOptions = {
            //    headerTemplate: './views/templates/med-grid-header-template.html',
            //    data: $scope.medications
            //};
        });
    };

    $scope.getMedications();

    $scope.getConditions = function() {
        $http.get('/dashboard/conditions', {params: $scope.filterData}).then(function(response){

            $scope.conditions = response.data;

            $scope.conditionChartData = {
                        chart: {
                            caption: "Condition Chart",
                            subCaption: "",
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