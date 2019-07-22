define( ["three","meshPlayer"], function ( THREE ,meshPlayer) {
    var camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.5, 1200 );
    //camera.position.z = 400;
    camera.position.set(-10, 10, -10);
    //camera.lookAt(new THREE.Vector3(0,player.height,0));
    camera.lookAt(meshPlayer.position);

/*
    var updateSize = function () {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
    };
    window.addEventListener( 'resize', updateSize, false );
    updateSize();

 */

    return camera;
} );
