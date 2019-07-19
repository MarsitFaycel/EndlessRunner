define( ["three", "scene"], function ( THREE, scene ) {



    var light = new THREE.PointLight(0xffffff, 0.8, 600);
    light.position.set(-10,60,10);
    light.castShadow = true;

    // Will not light anything closer than 0.1 units or further than 25 units
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 15;
    scene.add(light);

    return light;
} );

