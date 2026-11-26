define( ["three", "camera", "light", "renderer", "scene","meshPlayer","variable","ambientLight","pauseMenu","score","updatePlayer","diff","controls","spawnBlock", "checkBlockHit","stack","resetGame","stat","startMenu","countdown"],
    function ( THREE, camera,  light, renderer, scene,meshPlayer,variable ,ambientLight,pauseMenu,score,updatePlayer,diff,controls,spawnBlock,checkBlockHit,stack,resetGame,stat,startMenu,countdown) {
        var GRAVITY_RATE = -9.81;
        var BLOCK_FALL_DELAY = 40;        // en images à 60 FPS
        var BLOCK_RECYCLE_DEPTH = -60;    // un bloc tombé plus bas est recyclé
        var MAX_FRAME_STEP = 3;
        var clock = new THREE.Clock();

        var app = {
            //meshes: [],

            init: function () {

               if(window.innerWidth <745){
                   var startZone = new THREE.Mesh(
                       new THREE.PlaneGeometry(40,40, 50,50),
                       // MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
                       new THREE.MeshNormalMaterial({color:0x5E3C58, wireframe:variable.USE_WIREFRAME})
                       // See threejs.org/examples/ for other material types
                   );
                }else{
                var startZone = new THREE.Mesh(
                    new THREE.PlaneGeometry(40,40, 50,50),
                    // MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
                    new THREE.MeshPhongMaterial({color:0x5E3C58, wireframe:variable.USE_WIREFRAME})
                    // See threejs.org/examples/ for other material types
                );}


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
                variable.instructions.innerHTML = "<strong>Press Echap to Play!</strong> </br></br> ESPACE ou TAP = changer de direction ";

                window.addEventListener('resize', app.onWindowResize, false);

                //document.body.appendChild(renderer.domElement);
                //document.getElementById("Jeux").appendChild(renderer.domElement);

           },
            animate: function () {
                stat.begin();

                var step = app.frameStep();

                if (variable.paused == 1) {
                    // Jeu en pause : on fige la partie (le joueur n'avance plus).
                    pauseMenu(1);
                    requestAnimationFrame(app.pause);
                    renderer.render(scene, camera);
                    stat.end();
                    return;
                }

                pauseMenu(variable.alive == 1 ? 1 : 0);
                requestAnimationFrame(app.animate);

                score.score();
                updatePlayer.updatePlayer(step);
                checkBlockHit();

                if (variable.alive == 1) {
                    if (variable.gameReset == 1) {
                        resetGame();
                    } else {
                        // Caméra fixe pendant que la bille tombe.
                        camera.position.x = variable.lastPosition.x - 10;
                        camera.position.y = variable.lastPosition.y + 10;
                        camera.position.z = variable.lastPosition.z - 10;
                        variable.timeDead += step;
                        meshPlayer.position.y += GRAVITY_RATE * variable.player.downSpeed * step;
                        variable.player.downSpeed += 0.002 * step;
                    }
                }

                // Les blocs touchés tombent après un délai, puis sont recyclés au bout du parcours.
                for (var i = 0; i < stack.length; i++) {
                    var block = stack[i];
                    if (block.hit == 1) {
                        if (block.deathTimeout < BLOCK_FALL_DELAY) {
                            block.deathTimeout += step;
                        } else {
                            block.position.y -= 0.1 * step;
                            if (block.position.y < BLOCK_RECYCLE_DEPTH) {
                                spawnBlock.recycle(block);
                            }
                        }
                    }
                }

                controls();
                renderer.render(scene, camera);
                stat.end();
            },

            // Temps écoulé depuis l'image précédente, en "images à 60 FPS" (1 = 1/60 s).
            // Le jeu va ainsi à la même vitesse sur un écran 60 Hz ou 144 Hz.
            // Plafonné pour éviter un saut énorme après un changement d'onglet.
            frameStep: function () {
                return Math.min(clock.getDelta() * 60, MAX_FRAME_STEP);
            },

            pause: function () {
                clock.getDelta();   // le temps passé en pause ne compte pas
                if (variable.paused == 0) {
                    requestAnimationFrame(app.animate);
                } else {
                    requestAnimationFrame(app.pause);
                }
            },
            onWindowResize: function () {
              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);
            }






        };
        return app;
    } );
