define( ["three", "camera",  "geometry", "light", "renderer", "scene","meshPlayer","USE_WIREFRAME","ambientLight"],
    function ( THREE, camera,  geometry, light, renderer, scene,meshPlayer,USE_WIREFRAME ,ambientLight) {
        var app = {
            //meshes: [],
            init: function () {
                var startZone = new THREE.Mesh(
                    new THREE.PlaneGeometry(40,40, 50,50),
                    // MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
                    new THREE.MeshPhongMaterial({color:0x5E3C58, wireframe:USE_WIREFRAME})
                    // See threejs.org/examples/ for other material types
                );
                startZone.rotation.x -= Math.PI / 2;
                startZone.position.y = 0;
                // Floor can have shadows cast onto it
                startZone.receiveShadow = true;

                scene.add(startZone);
                scene.add(ambientLight);
                scene.add(light);

                document.body.appendChild(renderer.domElement);
           },
            animate: function () {
                //window.requestAnimationFrame( app.animate );
                //controls.update();



                renderer.render( scene, camera );
            }
        };
        return app;
    } );
