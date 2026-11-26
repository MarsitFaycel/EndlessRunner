// Compteur de performances (stats.js), affiché seulement avec index.html?debug.
define( ["stats"], function ( Stats ) {

    if (!/[?&]debug\b/.test(window.location.search)) {
        return { begin: function () {}, end: function () {} };
    }

    var stat = new Stats();
    stat.showPanel(0);   // 0 : FPS, 1 : ms par image, 2 : mémoire
    document.body.appendChild(stat.domElement);
    return stat;
});
