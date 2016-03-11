var todoApp = angular.module("todoApp", []);

todoApp.controller("listManageCtrl", function($scope) {
    
    $scope.lists = [
    {
        'listid': 1,
        'name': 'Nettoyage',
        'taskslist': [
        {
            'taskid': 1,
            'completed':true,
            'name': 'Vaisselle'
        },
        {
            'taskid': 2,
            'completed':false,
            'name': 'Ménage'
        },
        {
            'taskid': 3,
            'completed':false,
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
            'completed':false,
            'name': 'Pizza'
        },
        {
            'taskid': 2,
            'completed':true,
            'name': 'pates'
        },
        {
            'taskid': 3,
            'completed':false,
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
            'completed':false,
            'name': 'Paris'
        },
        {
            'taskid': 2,
            'completed':false,
            'name': 'Rome'
        },
        {
            'taskid': 3,
            'completed':true,
            'name': 'Madrid'
        }
        ]
    }
    ];





    $scope.listeAffichee = 0;

    $scope.click = function(listid){
        $scope.listeAffichee = listid;
    };

    $scope.ajouterTache = function(){

        $scope.lists[$scope.listeAffichee-1].taskslist.push(
                {
                    'taskid': 2,
                    'name':$scope.nouvelleTache
                });

        // on réinitialise le champ, pour etre pret à avoir une nouvelle tache
        $scope.nouvelleTache = null;

    };

    $scope.ajouterListe = function(){

        $scope.lists.push(
                {
                    'listid'    : 4,
                    'name'      : $scope.nouvelleListe,
                    'taskslist'  : []
                }
                );

        // on réinitialise le champ, pour etre pret à avoir une nouvelle liste
        $scope.nouvelleListe = null;

    };




});
