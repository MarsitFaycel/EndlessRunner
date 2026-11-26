define( ["three", "scene", "variable", "meshPlayer", "stack", "light"],
    function ( THREE, scene, variable, meshPlayer, stack, light ) {

    var START_ZONE_HALF = 20;
    // Au-delà de cette distance, on ramène tout le monde près de l'origine.
    var REBASE_DISTANCE = 1000;

    var startZone = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 40, 50, 50),
        window.innerWidth < 745
            ? new THREE.MeshNormalMaterial({wireframe: variable.USE_WIREFRAME})
            : new THREE.MeshPhongMaterial({color: 0x5E3C58, wireframe: variable.USE_WIREFRAME})
    );
    startZone.rotation.x -= Math.PI / 2;
    startZone.receiveShadow = true;

    function shift(object, dx, dz) {
        object.position.x += dx;
        object.position.z += dz;
    }

    var world = {
        startZone: startZone,

        init: function () {
            scene.add(startZone);
        },

        isOnStartZone: function (position) {
            return position.x - startZone.position.x < START_ZONE_HALF &&
                   position.z - startZone.position.z < START_ZONE_HALF;
        },

        // "Origine flottante" : les positions envoyées au GPU sont en 32 bits.
        // Sans ça, après quelques dizaines de milliers d'unités, l'image tremble
        // et les collisions deviennent imprécises. On décale donc tout le monde
        // (joueur, blocs, zone de départ, lumière) pour que le joueur revienne en (0, 0).
        // La caméra est enfant du joueur : elle suit automatiquement.
        rebaseIfNeeded: function () {
            var p = meshPlayer.position;
            if (variable.alive !== 0) return false;
            if (p.x < REBASE_DISTANCE && p.z < REBASE_DISTANCE) return false;

            var dx = -p.x, dz = -p.z;
            shift(meshPlayer, dx, dz);
            shift(startZone, dx, dz);
            shift(light, dx, dz);
            for (var i = 0; i < stack.length; i++) shift(stack[i], dx, dz);
            return true;
        },

        reset: function () {
            startZone.position.set(0, 0, 0);
        }
    };

    return world;
} );
