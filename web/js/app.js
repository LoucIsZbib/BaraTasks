var todoApp = angular.module("todoApp", []);

todoApp.controller("listManageCtrl", function($scope) {
    
    $scope.lists = [
    {
        'listid': 1,
        'name': 'Nettoyage',
        'taskslist': [
        {
            'taskid': 1,
            'name': 'Vaisselle'
        },
        {
            'taskid': 2,
            'name': 'Ménage'
        },
        {
            'taskid': 3,
            'name': 'Linge'
        }
        ]
    },
    {
        'listid': 2,
        'name': 'Repas',
        'taskslist': [
        {
            'taskid': 1,
            'name': 'Pizza'
        },
        {
            'taskid': 2,
            'name': 'pates'
        },
        {
            'taskid': 3,
            'name': 'Haricots'
        }
        ]
    },
    {
        'listid': 3,
        'name': 'Capitales',
        'taskslist': [
        {
            'taskid': 1,
            'name': 'Paris'
        },
        {
            'taskid': 2,
            'name': 'Rome'
        },
        {
            'taskid': 3,
            'name': 'Madrid'
        }
        ]
    }
    ];






    $scope.listeAffichee = 0;

    $scope.click = function(listid){
        $scope.listeAffichee = listid;
    };

});
