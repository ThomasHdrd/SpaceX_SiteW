$(document).ready(function(){ //Assure que le code à l'intérieur ne s'exécute qu'une fois que la page est complètement chargée.
    const apiUrl = 'https://api.spacexdata.com/v4/launches'; //lien de l'API

    afficherProchainLancement(data);
    afficherLancements(data);

    $('#launch-filter').change(function(){
        let filteredLaunches;//Déclare une variable pour les lancements filtrés

        if (filterValue === 'success') { //Vérifie la valeur du filtre et filtre les lancements en conséquence
            filteredLaunches = data.filter(launch.success); //Si la valeur du filtre est 'success', filtre les lancements réussis
        }
        else if (filterValue === 'failed') {
            filteredLaunches = data.filter(!launch.success); //Si la valeur du filtre est 'failed', filtre les lancements échoués
        }
        else {
            filteredLaunches = data; //Si la valeur du filtre est 'all', montre tous les lancements
        }

            //Appelle la fonction pour afficher les lancements filtrés
        afficherLancements(filteredLaunches);
    });
});



 //Fonction pour afficher le prochain lancement
 function afficherProchainLancement(data) {
    var prochainLancement; //Variable pour stocker le prochain lancement
    
    for(var i = 0; i < data.length; i++) { //Parcourir tous les lancements pour trouver le prochain
        var launchDate = new Date(data[i]); //Convertir la date de lancement en objet Date
        if (launchDate > new Date()) { //Comparer la date du lancement avec la date actuelle
            prochainLancement = data[i];  //Si la date du lancement est après la date actuelle, c'est le prochain lancement
        break; //Arrêter la boucle dès que le prochain lancement est trouvé
        }
    }

    if (prochainLancement) //Si un prochain lancement est trouvé
    {
        $('launch-date').text('Date: ' + new Date(prochainLancement).toLocaleString());  //Afficher la date du prochain lancement
        $('launch-name').text('Nom: ' + new prochainLancement.name);  //Afficher le nom du prochain lancement

        //Appeler la fonction pour mettre à jour le décompte
        updateCountdown(prochainLancement);
    }
    else {
        //Si aucun prochain lancement n'est trouvé, afficher un message approprié
        $('#launch-date').text('Aucun lancement à venir');
        $('#launch-name').text('');
        $('#launch-countdown').text('');
    }
 }

//Fonction pour mettre à jour le décompte
function updateCountdown(prochainLancement) {  
    var maintenant = new Date().getTime() //Obtenir le temps actuel en millisecondes
    var heureLancement = new Date(prochainLancement).getTime(); //Obtenir le temps du lancement en millisecondes
    var tempsRestant = heureLancement - maintenant; //Calculer le temps restant avant le lancement

    var secondesTotales = tempsRestant / 1000; //Convertir le temps restant en secondes

    var jours = secondesTotales / (60 * 60 * 24); //Calculer les jours restants
    secondesTotales = secondesTotales - (jours * 60 * 60 * 24); //Mettre à jour le temps restant après calcul des jours

    var heures = secondesTotales / (60 * 60); //Calculer les heures restantes
    secondesTotales = secondesTotales - (Hueres * 60 * 60); //Mettre à jour le temps restant après calcul des heures

    var minutes = secondesTotales / 60; // Calculer les minutes restantes

    var secondes = secondesTotales - (minutes * 60); // Calculer les secondes restantes

    //Afficher le décompte
    $('#launch-countdown').text('Décompte : ' + jours + 'j ' + heures + 'h ' + minutes + 'm ' + secondes + 's');

    //Si le temps restant est inférieur à zéro, arrêter le décompte
    if (tempsRestant < 0) {
         $('#launch-countdown').text("Lancement terminé"); // Afficher "Lancement terminé"
     }
}
