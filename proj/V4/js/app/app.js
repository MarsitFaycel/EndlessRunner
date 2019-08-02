define( ["three", "camera", "light", "renderer", "scene","meshPlayer","variable","ambientLight","pauseMenu","score","updatePlayer","diff","controls","spawnBlock", "checkBlockHit","stack","resetGame","stat","startMenu"],
    function ( THREE, camera,  light, renderer, scene,meshPlayer,variable ,ambientLight,pauseMenu,score,updatePlayer,diff,controls,spawnBlock,checkBlockHit,stack,resetGame,stat,startMenu) {
        var app = {
            //meshes: [],

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
                scene.add(meshPlayer);
                for(var i=0; i<300; i++){
                   spawnBlock(i);
                    //console.log(stack.length);

                }

                scene.add(startZone);
                scene.add(ambientLight);
                scene.add(light);
                variable.instructions.innerHTML = "<strong>Press Echap to Play!</strong> </br></br> TAB Key  =change direction ";

                window.addEventListener('resize', app.onWindowResize, false);

                //document.body.appendChild(renderer.domElement);
                //document.getElementById("Jeux").appendChild(renderer.domElement);

           },
            animate: function () {



                stat.begin()

                const GRAVITY_RATE = -9.81;
                if(variable.paused == 0 ){
                   pauseMenu(0);
                    requestAnimationFrame(app.animate);
                }
                if(variable.paused == 1){

                    pauseMenu(1);
                    requestAnimationFrame(app.pause);
                }
                startMenu();
                score.score();
                diff.diff();
                updatePlayer.updatePlayer();
                checkBlockHit();

                if(variable.alive == 1){
                    if(variable.gameReset == 1){
                        console.log('RESET!!!!' + variable.gameReset);
                        resetGame();
                    }
                    //mesh.position.x =0;
                    //mesh.position.z =0;
                    //mesh.remove(camera);
                   // variable.lastPosition=300;
                    camera.position.x = variable.lastPosition.x-10;
                    camera.position.y = variable.lastPosition.y+10;
                    camera.position.z = variable.lastPosition.z-10;
                    variable.timeDead++;
                    //alive =0;
                    pauseMenu(1);

                    meshPlayer.position.y += GRAVITY_RATE*variable.player.downSpeed;
                    variable.player.downSpeed +=  0.002;

                    //if(player.speed>0.1)
                    //player.speed = player.speed + GRAVITY_RATE*timeDead;
                }
                for(var i=0; i<300; i++){
                    if(stack[i].hit == 1){
                        if(stack[i].deathTimeout <40){
                            stack[i].deathTimeout++;
                        }
                        else{
                            stack[i].position.y -= 0.1;
                        }
                    }
                }


                controls();
                //window.requestAnimationFrame( app.animate );
                //controls.update();
                //window.requestAnimationFrame( app.animate );
               // controls.update();

                 renderer.render( scene, camera );
                    stat.end()
                 },
             pause:function(){
            //pauseMenu(1);
            //renderer.render(scene, camera);

                 stat.begin()
            if(variable.paused == 0){


                requestAnimationFrame(app.animate);
            }
            if(variable.paused == 1){

                requestAnimationFrame(app.pause);

            }
                 stat.end()

        },
            onWindowResize: function () {
              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);
            }






        };
        return app;
    } );
