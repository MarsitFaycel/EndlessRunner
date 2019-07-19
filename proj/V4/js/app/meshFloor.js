efine( ["three", "scene"], function ( THREE, scene ) {
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    return ambientLight;
});