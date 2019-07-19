require(
    // La liste des module qui doivent être
    // chargés avant d'initialiser le bazar
    ['monModule', 'monAutreModule'],

    // La fonction qui sera lancée une fois
    // les modules précédents chargés
    function (monModule, monAutreModule) {
        // L'initialisation des modules et
        // de toute votre application ici
    },

    // Une fonction de gestion des erreurs
    // de RequireJS (c-à-d s'il n'arrive pas
    // a charger un fichier, quel qu’en soit
    // la raison)
    function (err) {
        console.error('ERROR: ', err.requireType);
        console.error('MODULES: ', err.requireModules);
    }
);