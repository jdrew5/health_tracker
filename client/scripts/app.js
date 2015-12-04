var myApp = angular.module("myApp", ['ngRoute', 'ng-fusioncharts', 'ui.grid', 'ui.bootstrap',
    'ngMaterial']);

myApp.config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider){
    $routeProvider.
        when('/dashboard', {
            templateUrl: "/assets/views/routes/dashboard.html"

        }).
        when('/dailydata', {
            templateUrl: "/assets/views/routes/dailydata.html"
        }).
        when('/medications', {
            templateUrl: "/assets/views/routes/medications.html"
        }).
        when('/conditions', {
            templateUrl: "/assets/views/routes/conditions.html"
        }).
        otherwise({
            redirectTo: 'dashboard'
        })
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('pink')
        .warnPalette('red')
        .backgroundPalette('grey');
}]);
