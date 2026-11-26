// Caméra en vue de 3/4, attachée à la bille pendant la partie (voir resetGame / checkBlockHit).
define( ["three", "meshPlayer"], function ( THREE, meshPlayer ) {

    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.5, 1200);
    camera.position.set(-10, 10, -10);
    camera.lookAt(meshPlayer.position);

    return camera;
} );
