var todoApp = angular.module("todoApp", []);

todoApp.controller("listManageCtrl", function($scope, $http) {
 
// INITIALISATION : on récupère la liste des tâche depuis le serveur
    $scope.lists = [];
    $http.get("/get").then(
        //success
        function(retour) {
            $scope.lists = retour.data;
        },
        // error
        function(why) {
            alert("oups, /get n'a pas marché : " + why.message);
        }
    );

// FONCTION POUR METTRE A JOUR LA LISTE DES TACHES SUR LE SERVEUR
    maj = function ()
    {
        $http.post("/set", $scope.lists).then(
            //success
            function() {
                // DEBUG
                //alert("post = succes selon angular");
            },
            //echec
            function(why) {
                alert("oups, /set n'a pas marché : " + why.message);
            }
        );
    };

// GESTION AFFICHAGE DES LISTES
    $scope.listeAffichee = 0;
    $scope.click = function(listid){
        $scope.listeAffichee = listid;
    };


// AJOUTER UNE TACHE
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
        
        // MAJ de la liste sur le serveur
        maj();
    };

// AJOUTER UNE LISTE
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
        //alert(newId);
        
        // MAJ de la liste sur le serveur
        maj();
    };

// SUPPRIMER UNE LISTE
    $scope.deleteList = function(listid){
        // recherche de l'élément ayant le listid
        for (var index = 0; index <$scope.lists.length; index++) {
            if($scope.lists[index].listid == listid) {
                // suppression de cet élément
                $scope.lists.splice(index,1);
                break;
            }
        
        }

        // MAJ de la liste sur le serveur
        maj();
    };


});
