// La bille du joueur.
define( ["three", "variable"], function ( THREE, variable ) {

    var material = variable.IS_MOBILE
        ? new THREE.MeshNormalMaterial({wireframe: variable.USE_WIREFRAME})
        : new THREE.MeshPhongMaterial({color: 0xFCECA4, wireframe: variable.USE_WIREFRAME});

    var meshPlayer = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), material);
    meshPlayer.position.set(0, 0.65, 0);
    meshPlayer.receiveShadow = true;
    meshPlayer.castShadow = true;

    return meshPlayer;
} );
