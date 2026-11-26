// Lumière principale : elle suit la bille (voir updatePlayer.js).
define( ["three"], function ( THREE ) {

    var light = new THREE.PointLight(0xffffff, 0.8, 600);
    light.position.set(-10, 60, 10);
    light.castShadow = true;
    // NB : avec far = 15 et une lumière à 60 de hauteur, aucune ombre n'est visible.
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 15;

    return light;
} );
