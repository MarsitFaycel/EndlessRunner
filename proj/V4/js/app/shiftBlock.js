define(["stack" , "scene" ],
    function(stack , scene){

        function shiftBlock(){
            //scene.remove(stack[0]);
            //stack.shift();

            var rand = Math.floor(Math.random() * 2);
            //spawnBlock(10);
            var block = new THREE.Mesh(
                new THREE.BoxGeometry(10,10,10),
                new THREE.MeshPhongMaterial({color:0x00CC2C})
            );
            //left block

            if(rand == 0){
                block.position.x = (stack[stack.length - 1].position.x) + 5.1;
                block.position.z = (stack[stack.length - 1].position.z);
            }
            //right block
            else{
                block.position.z = (stack[stack.length - 1].position.z) + 5.1;
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
            scene.add(stack.length);

        }



        return  shiftBlock;
    })