define( ["three", "scene","variable","stack","color"], function ( THREE, scene, variable, stack, color ){

    // Dernier bloc posé au bout du parcours : le suivant se place à sa gauche ou à sa droite.
    var lastBlock = null;

    // Place `block` juste après le dernier bloc du parcours et le remet à l'état "neuf".
    function placeAtEnd(block) {
        if (lastBlock === null) {
            // Premier bloc, au bord de la zone de départ.
            block.position.x = 17.5;
            block.position.z = 22.6;
        } else if (Math.random() < 0.5) {
            block.position.x = lastBlock.position.x + 10.1;   // bloc à gauche
            block.position.z = lastBlock.position.z;
        } else {
            block.position.x = lastBlock.position.x;
            block.position.z = lastBlock.position.z + 10.1;   // bloc à droite
        }
        block.position.y = -5;
        block.hit = 0;            // 1 dès que le joueur l'a touché
        block.deathTimeout = 0;   // temps avant que le bloc touché ne tombe
        lastBlock = block;
    }

    function spawnBlock(index){
        if (stack.length === 0) lastBlock = null;   // nouvelle partie

        var material = window.innerWidth < 745
            ? new THREE.MeshNormalMaterial({color: color, wireframe: variable.USE_WIREFRAME})
            : new THREE.MeshPhongMaterial({color: color, wireframe: variable.USE_WIREFRAME});
        var block = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), material);
        block.receiveShadow = true;
        block.castShadow = true;

        placeAtEnd(block);
        stack.push(block);
        scene.add(block);
    }

    // Parcours infini : un bloc tombé hors de vue est recyclé au bout du chemin
    // (avant : 300 blocs fixes, le joueur tombait dans le vide une fois au bout).
    spawnBlock.recycle = placeAtEnd;

    return spawnBlock;
});
