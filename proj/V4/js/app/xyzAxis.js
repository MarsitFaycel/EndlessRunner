define(["three","scene"] , function (THREE, scene) {

    function xyzAxis(){

//x axis
        var material = new THREE.LineBasicMaterial({
            color: 0xff0000
        });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( -30, 0, 0 ),
            new THREE.Vector3( 30, 0, 0 ),
            new THREE.Vector3( 25, 5,0)
        );
        var line1 = new THREE.Line( geometry, material );
        scene.add( line1 );

//y axis
        material = new THREE.LineBasicMaterial({
            color: 0x008000
        });
        geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( 0, -30, 0 ),
            new THREE.Vector3( 0, 30, 0 ),
            new THREE.Vector3( 5, 25,0)
        );
        var line2 = new THREE.Line( geometry, material );
        scene.add( line2 );

//z axis
        material = new THREE.LineBasicMaterial({
            color: 0x0000FF
        });
        geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( 0, 0, -30 ),
            new THREE.Vector3( 0, 0, 30 ),
            new THREE.Vector3( 0, 5,25)
        );
        var line3 = new THREE.Line( geometry, material );
        scene.add( line3 );

    }
    return xyzAxis;
})