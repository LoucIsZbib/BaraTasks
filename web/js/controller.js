var todoApp = angular.module("todoApp", []);

todoApp.controller("ctrl1", function($scope) {
    
    $scope.tasklist = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
    ];

    $scope.tasklist2 = [
    {"name": "tintin"},
    {"name": "milou"}
    ];


    $scope.show1 = false;

    $scope.show2 = false;

    $scope.click1 = function(){
        $scope.show1 = true;
        $scope.show2 = false;
    };

    $scope.click2 = function(){
        $scope.show1 = false;
        $scope.show2 = true;
    };
});
