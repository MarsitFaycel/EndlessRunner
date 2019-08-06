define( ["three", "scene","variable","stack","color"], function ( THREE, scene, variable, stack,color ){

         function spawnBlock(index){

             var block;
             var rand = Math.floor(Math.random() * 2);
             if(stack.length != 0){
                 if(window.innerWidth<745){block = new THREE.Mesh(
                     new THREE.BoxGeometry(10,10,10),
                     new THREE.MeshNormalMaterial({color: color, wireframe:variable.USE_WIREFRAME})
                 );}else{
                     block = new THREE.Mesh(
                         new THREE.BoxGeometry(10,10,10),
                         new THREE.MeshPhongMaterial({color: color, wireframe:variable.USE_WIREFRAME})
                     );
                 }

                 //left block
                 if(rand == 0){
                     block.position.x = (stack[stack.length - 1].position.x) + 10.1;
                     block.position.z = (stack[stack.length - 1].position.z);
                 }
                 //right block
                 else{
                     block.position.z = (stack[stack.length - 1].position.z) + 10.1;
                     block.position.x = (stack[stack.length - 1].position.x) ;
                 }
                 //block.position.x = 2;
                 //block.position.z = 2;
                 block.position.y = -5;
                 block.receiveShadow = true;
                 block.castShadow = true;
                 //0 if the player has not hit the block
                 //1 if the player has hit the block
                 block.hit = 0;
                 //time after death before block starts falling
                 block.deathTimeout =0;
                 stack.push(block);
                 scene.add(stack[index]);

             }
             else{
                 if(window.innerWidth<745){block = new THREE.Mesh(
                     new THREE.BoxGeometry(10,10,10),
                     new THREE.MeshNormalMaterial({color: color, wireframe:variable.USE_WIREFRAME})
                 );}else{
                     block = new THREE.Mesh(
                         new THREE.BoxGeometry(10,10,10),
                         new THREE.MeshPhongMaterial({color: color, wireframe:variable.USE_WIREFRAME})
                     );
                 }
                 block.position.x = 17.5;
                 block.position.z = 22.6;
                 block.position.y = -5;
                 block.hit = 0;
                 block.deathTimeout =0;
                 block.receiveShadow = true;
                 block.castShadow = true;
                 stack.push(block);
                 scene.add(stack[0]);

             }


         }


    return spawnBlock;
});