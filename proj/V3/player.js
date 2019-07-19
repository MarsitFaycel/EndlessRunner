function spawnPlayer(){
    //var randPos = [(Math.random()*50)-25,(Math.random()*50)-25];
    mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1,16,16),
        new THREE.MeshPhongMaterial({color:0xFCECA4, wireframe:USE_WIREFRAME})
    );
    mesh.position.y += 0.65; // Move the player up 1 meter
    mesh.position.x = 0;
    mesh.position.z = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.add(camera);
    scene.add(mesh);

}


function updatePlayer(){

    if ((player.direction) == 0)
        mesh.position.x += player.speed * 0.5;
    else
        mesh.position.z += player.speed * 0.5;
    if(alive ==0){
        light.position.x = mesh.position.x-20;
        light.position.z = mesh.position.z+20;
    }


    player.speed +=0.0001;
}
