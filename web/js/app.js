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
            'taskid': 5,
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

        // recherche de l'id de tache le plus haut
        var myCurrentTasklist = $scope.lists[$scope.listeAffichee-1].taskslist;
        var maxId = 0;
        for (var i = 0; i < myCurrentTasklist.length; i++) {
            var id = myCurrentTasklist[i].taskid;
            if (id > maxId) {
                maxId = id;
            }
        }

        var newId = maxId +1 ;
        $scope.lists[$scope.listeAffichee-1].taskslist.push(
                {
                    'taskid': newId,
                    'name':$scope.nouvelleTache
                });

        // on réinitialise le champ, pour etre pret à avoir une nouvelle tache
        $scope.nouvelleTache = null;

        // DEBUG
        //alert(newId);
    };

    $scope.ajouterListe = function(){

        // recherche de l'id de liste le plus haut
        var maxId = 0;
        for (var i = 0; i < $scope.lists.length; i++) {
            var id = $scope.lists[i].listid;
            if (id > maxId) {
                maxId = id;
            }
        }

        var newId = maxId +1 ;
        $scope.lists.push(
                {
                    'listid'    : newId,
                    'name'      : $scope.nouvelleListe,
                    'taskslist'  : []
                }
                );

        // on réinitialise le champ, pour etre pret à avoir une nouvelle liste
        $scope.nouvelleListe = null;

        // DEBUG
        alert(newId);
    };




});
