var todoApp = angular
				.module("todoApp", ['moment-picker', 'ngSanitize'])
				.config(['momentPickerProvider', function (momentPickerProvider) {
						momentPickerProvider.options({
							locale : "fr",
							today : true,
							minView : "year",
							maxView : "month",
							startView : "month",
							format : "YYYY/MM/DD"
							
					});
				}]);
    
todoApp.filter('formatDate', function() {
    return function(input) {
            var newDate = null;
            if (input != undefined) {
                newDate = moment(input).format('DD/MM/YYYY');
            }
            return newDate;
        };
});


todoApp.filter('diffFromToday', function() {
    return function(input) {
            var deltaJours = null;
            if (input != undefined) {
                var aujourdhui = moment();
                 deltaJours = moment(input).startOf('day').diff(aujourdhui.startOf('day'), 'days', true);
            } else {
		 deltaJours = 9999
	    };
            return deltaJours;
        };
});

todoApp.filter('uncompleted_number', function() {
    return function(input) {
        var nombre = 0;
        if (input != undefined) {
            for (var i = 0; i < input.length; i++) {
                if ( !(input[i].completed == true)) {
                    nombre++;
                }
            }
        }
        return nombre;
    };
});


var local_or_remote = "remote"

todoApp.controller("listManageCtrl", function($scope, $http, $filter, $timeout) {
 
// pour autosélectionner le champ taskname lors d'une édition en cliquant sur le bouton
    $scope.giveFocus = function(idToFocus) {
        document.getElementById(idToFocus).focus();
    };
    
 
// INITIALISATION : on récupère la liste des tâche depuis le serveur
    $scope.lists = [];
	if (local_or_remote == "remote") {		
		$http.get("/get").then(
			//success
			function(retour) {
				data_json = retour.data;
				if(data_json == "")
				{
					data_json = [];
				}
				$scope.lists = data_json;
			},
			// error
			function(why) {
				alert("oups, /get n'a pas marché : " + why.message);
			}
		);
	}

// FONCTION POUR METTRE A JOUR LA LISTE DES TACHES SUR LE SERVEUR
    $scope.maj = function ()
    {
		if (local_or_remote == "remote") {
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
		}
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
        $scope.maj();
    };

// AJOUTER UNE LISTE
    $scope.ajouterListe = function(){

        // recherche de l'id de liste le plus haut
        var maxId = 0;
        if($scope.lists.length > 0)
        {
            // la liste n'est pas vide
            for (var i = 0; i < $scope.lists.length; i++) {
                var id = $scope.lists[i].listid;
                if (id > maxId) {
                    maxId = id;
                }
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
        $scope.maj();
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
        $scope.maj();
    };

// SUPPRIMER UNE TACHE
$scope.deleteTask = function(taskid){
        // recherche de l'élément ayant le taskid
        for (var index = 0; index <$scope.lists[$scope.listeAffichee-1].taskslist.length; index++) {
            if($scope.lists[$scope.listeAffichee-1].taskslist[index].taskid == taskid) {
                // suppression de cet élément
                $scope.lists[$scope.listeAffichee-1].taskslist.splice(index,1);
                break;
            }
        }

        // MAJ de la liste sur le serveur
        $scope.maj();
    };
// SUPPRIMER LES TACHES BARREES
$scope.deleteTaskDone = function(list){
        // recherche des listes ayant le completed :true
        for (var index = (list.taskslist.length-1); index >= 0; index--) {
            // parcourir toute la liste
            if (list.taskslist[index].completed == true) {
                //suppression de la tache
                list.taskslist.splice(index,1);
            }
        }

        //MAJ
        $scope.maj();

    };
	
// FLAGS POUR LE TRI DES TACHES
$scope.order="";
$scope.reverse=false;


});
