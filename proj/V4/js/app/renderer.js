define( ["three"], function ( THREE ) {

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor( 0x60A1F0 );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    var container = document.getElementById('world');
    container.appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);






    return renderer;
} );

