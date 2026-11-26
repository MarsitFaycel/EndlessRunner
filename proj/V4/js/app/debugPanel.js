define( ["renderer", "scene", "stack", "meshPlayer", "variable"], function ( renderer, scene, stack, meshPlayer, variable ) {

    // Contrôle mémoire : ouvrir index.html?debug pour afficher en direct le nombre
    // d'objets, de géométries et de textures chargés sur le GPU.
    // Si le jeu ne fuit pas, ces nombres restent stables pendant toute la partie.
    var enabled = /[?&]debug\b/.test(window.location.search);
    var panel = null;
    var frame = 0;

    if (enabled) {
        panel = document.createElement('pre');
        panel.style.cssText = 'position:absolute;bottom:8px;left:8px;margin:0;padding:6px 8px;' +
            'background:rgba(0,0,0,.6);color:#9f9;font:12px monospace;z-index:10;pointer-events:none';
        document.body.appendChild(panel);
    }

    return {
        update: function () {
            if (!enabled || ++frame % 30 !== 0) return;
            var mem = renderer.info.memory;
            var p = meshPlayer.position;
            panel.textContent =
                'objets scene : ' + scene.children.length + '\n' +
                'geometries   : ' + mem.geometries + '\n' +
                'textures     : ' + mem.textures + '\n' +
                'blocs        : ' + stack.length + '\n' +
                'score        : ' + variable.playerScore + '\n' +
                'vitesse      : ' + variable.player.speed.toFixed(3) + '\n' +
                'position     : ' + p.x.toFixed(0) + ', ' + p.z.toFixed(0);
        }
    };
} );
