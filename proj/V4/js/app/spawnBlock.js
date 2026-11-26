define( ["three", "scene","variable","stack","color"], function ( THREE, scene, variable, stack, color ){

    var BLOCK_STEP = 10.1;   // distance entre deux blocs consécutifs

    // Une seule géométrie et un seul matériau partagés par tous les blocs
    // (avant : 300 géométries + 300 matériaux recréés à chaque partie, jamais libérés).
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = window.innerWidth < 745
        ? new THREE.MeshNormalMaterial({wireframe: variable.USE_WIREFRAME})
        : new THREE.MeshPhongMaterial({color: color, wireframe: variable.USE_WIREFRAME});

    // Dernier bloc posé au bout du parcours : le suivant se place à sa gauche ou à sa droite.
    var lastBlock = null;

    // Place `block` juste après le dernier bloc du parcours et le remet à l'état "neuf".
    function placeAtEnd(block) {
        if (lastBlock === null) {
            // Premier bloc, au bord de la zone de départ.
            block.position.x = 17.5;
            block.position.z = 22.6;
        } else if (Math.random() < 0.5) {
            block.position.x = lastBlock.position.x + BLOCK_STEP;   // bloc à gauche
            block.position.z = lastBlock.position.z;
        } else {
            block.position.x = lastBlock.position.x;
            block.position.z = lastBlock.position.z + BLOCK_STEP;   // bloc à droite
        }
        block.position.y = -5;
        block.hit = 0;            // 1 dès que le joueur l'a touché
        block.deathTimeout = 0;   // temps avant que le bloc touché ne tombe
        lastBlock = block;
    }

    // Crée un bloc (uniquement au démarrage : ensuite les blocs sont recyclés).
    function spawnBlock(){
        var block = new THREE.Mesh(geometry, material);
        block.receiveShadow = true;
        block.castShadow = true;
        placeAtEnd(block);
        stack.push(block);
        scene.add(block);
    }

    // Parcours infini : un bloc tombé hors de vue est replacé au bout du chemin.
    spawnBlock.recycle = placeAtEnd;

    // Nouvelle partie : on reconstruit le chemin avec les MÊMES blocs, sans rien recréer.
    spawnBlock.resetAll = function () {
        lastBlock = null;
        for (var i = 0; i < stack.length; i++) {
            placeAtEnd(stack[i]);
        }
    };

    return spawnBlock;
});
