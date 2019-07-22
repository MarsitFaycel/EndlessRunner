define( ["three", "camera", "light", "renderer", "scene","meshPlayer","variable","ambientLight","pause","score","updatePlayer","diff","controls"],
    function ( THREE, camera,  light, renderer, scene,meshPlayer,variable ,ambientLight,pause,score,updatePlayer,diff,controls) {
        var app = {
            //meshes: [],
                stack: [],
            init: function () {
                var startZone = new THREE.Mesh(
                    new THREE.PlaneGeometry(40,40, 50,50),
                    // MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
                    new THREE.MeshPhongMaterial({color:0x5E3C58, wireframe:variable.USE_WIREFRAME})
                    // See threejs.org/examples/ for other material types
                );
                startZone.rotation.x -= Math.PI / 2;
                startZone.position.y = 0;
                // Floor can have shadows cast onto it
                startZone.receiveShadow = true;

                for(var i=0; i<300; i++){
                   app.spawnBlock(i);
                    //console.log(stack.length);

                }

                scene.add(startZone);
                scene.add(ambientLight);
                scene.add(light);

                document.body.appendChild(renderer.domElement);
           },
            animate: function () {
                if(variable.paused == 0){
                    pause.pauseMenu(0);
                    requestAnimationFrame(app.animate);
                }
                if(variable.paused == 1){
                   pause.pauseMenu(1);
                    requestAnimationFrame(app.pause);
                }
                score.score();
                diff.diff();
                updatePlayer.updatePlayer();
                app.checkBlockHit();

                if(variable.alive == 1){
                    if(variable.gameReset == 1){
                        console.log('RESET!!!!' + gameReset);
                        resetGame();
                    }
                    //mesh.position.x =0;
                    //mesh.position.z =0;
                    //mesh.remove(camera);
                    camera.position.x = lastPosition.x-10;
                    camera.position.y = lastPosition.y+10;
                    camera.position.z = lastPosition.z-10;
                    timeDead++;
                    //alive =0;
                    pauseMenu(1);
                    mesh.position.y += GRAVITY_RATE*player.downSpeed;
                    player.downSpeed +=  0.002;

                    //if(player.speed>0.1)
                    //player.speed = player.speed + GRAVITY_RATE*timeDead;
                }

                    controls();
                //window.requestAnimationFrame( app.animate );
                //controls.update();
                //window.requestAnimationFrame( app.animate );
               // controls.update();

                 renderer.render( scene, camera );
            },
             pause:function(){
            //pauseMenu(1);
            //renderer.render(scene, camera);
            if(variable.paused == 0){
                requestAnimationFrame(app.animate);
            }
            if(variable.paused == 1){
                requestAnimationFrame(app.pause);
            }

        },
            spawnBlock : function(index){
                var block;
                var rand = Math.floor(Math.random() * 2);
                if(app.stack.length != 0){
                    block = new THREE.Mesh(
                        new THREE.BoxGeometry(10,10,10),
                        new THREE.MeshPhongMaterial({color:app.getRandomColor(), wireframe:variable.USE_WIREFRAME})
                    );
                    //left block
                    if(rand == 0){
                        block.position.x = (app.stack[app.stack.length - 1].position.x) + 10.1;
                        block.position.z = (app.stack[app.stack.length - 1].position.z);
                    }
                    //right block
                    else{
                        block.position.z = (app.stack[app.stack.length - 1].position.z) + 10.1;
                        block.position.x = (app.stack[app.stack.length - 1].position.x) ;
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
                    app.stack.push(block);
                    scene.add(app.stack[index]);

                }
                else{
                    block = new THREE.Mesh(
                        new THREE.BoxGeometry(10,10,10),
                        new THREE.MeshPhongMaterial({color:0x5E3C58, wireframe:variable.USE_WIREFRAME})
                    );
                    block.position.x = 17.5;
                    block.position.z = 22.6;
                    block.position.y = -5;
                    block.hit = 0;
                    block.deathTimeout =0;
                    block.receiveShadow = true;
                    block.castShadow = true;
                    app.stack.push(block);
                    scene.add(app.stack[0]);

                }
            },
            checkBlockHit : function() {

                var hit = 0;

                if(meshPlayer.position.x < 20 && meshPlayer.position.z < 20){
                    hit =1;
                }
                for(var i=0; i<300 ; i++){
                    if(meshPlayer.position.x <= app.stack[i].position.x+5.7 && meshPlayer.position.x >= app.stack[i].position.x-5.7){
                        if(meshPlayer.position.z <= app.stack[i].position.z+5.7 && meshPlayer.position.z >= app.stack[i].position.z-5.7){
                            if(app.stack[i].hit == 0){
                                variable.playerScore++
                                app.stack[i].hit = 1;
                            }
                            hit = 1;
                        }
                    }
                }

                if(hit == 0){
                    if(variable.lastPosition == null){
                        meshPlayer.remove(camera);
                        variable.lastPosition = new THREE.Vector3(meshPlayer.position.x, meshPlayer.position.y, meshPlayer.position.z);
                    }
                    alive = 1;
                }


                },
            reset: function(){

                    //location.reload();
                    if(variable.gameReset == 1){
                        variable.gameReset = 0;
                        variable.alive = 0;
                        meshPlayer.position.x = 0;
                        meshPlayer.position.y = 0.65;
                        meshPlayer.position.z = 0;
                        variable.paused = 0;
                        meshPlayer.add(camera);
                        variable.camera.position.set(-10, 10, -10);
                        //camera.lookAt(new THREE.Vector3(0,player.height,0));
                        variable.camera.lookAt(mesh.position);
                        variable.lastPosition = null;
                        variable.player.speed=1;
                        variable.player.direction=0;
                        variable.player.downSpeed=0.0001;
                        variable.playerScore =0;
                        app.resetBlocks();
                    }


            },
            resetBlocks:function(){
            for(var i =0; i<40; i++){
               scene.remove(stack[i]);
            }
            stack = [];
            for(var i=0; i<300; i++){
                app.spawnBlock(i);
                //console.log(stack.length);
            }

        },
            shiftBlocks:function(){
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
            app.stack.push(block);
            scene.add(app.stack.length);

        },
          spawnBlock: function(index){
            var block;
            var rand = Math.floor(Math.random() * 2);
            if(app.stack.length != 0){
                block = new THREE.Mesh(
                    new THREE.BoxGeometry(10,10,10),
                    new THREE.MeshPhongMaterial({color:app.getRandomColor(), wireframe:variable.USE_WIREFRAME})
                );
                //left block
                if(rand == 0){
                    block.position.x = (app.stack[app.stack.length - 1].position.x) + 10.1;
                    block.position.z = (app.stack[app.stack.length - 1].position.z);
                }
                //right block
                else{
                    block.position.z = (app.stack[app.stack.length - 1].position.z) + 10.1;
                    block.position.x = (app.stack[app.stack.length - 1].position.x) ;
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
                app.stack.push(block);
                scene.add(app.stack[index]);

            }
            else{
                block = new THREE.Mesh(
                    new THREE.BoxGeometry(10,10,10),
                    new THREE.MeshPhongMaterial({color:0x5E3C58, wireframe:variable.USE_WIREFRAME})
                );
                block.position.x = 17.5;
                block.position.z = 22.6;
                block.position.y = -5;
                block.hit = 0;
                block.deathTimeout =0;
                block.receiveShadow = true;
                block.castShadow = true;
                app.stack.push(block);
                scene.add(app.stack[0]);

            }
        },

        getRandomColor : function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }


        };
        return app;
    } );
