// Configuration de Require.js
var require = {
    // Les modules du jeu sont dans js/app
    baseUrl: 'js/app',
    shim: {
        'threeCore': { exports: 'THREE' },
        'stats': { exports: 'Stats' }
    },
    // Bibliothèques tierces (js/lib)
    paths: {
        three: '../lib/three',
        threeCore: '../lib/three.min',
        stats: '../lib/stats'
    }
};
