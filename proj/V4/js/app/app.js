define( ["three", "camera", "light", "renderer", "scene", "meshPlayer", "variable", "ambientLight", "pauseMenu",
         "score", "updatePlayer", "controls", "spawnBlock", "checkBlockHit", "stack", "resetGame", "stat", "world", "debugPanel"],
    function ( THREE, camera, light, renderer, scene, meshPlayer, variable, ambientLight, pauseMenu,
               score, updatePlayer, controls, spawnBlock, checkBlockHit, stack, resetGame, stat, world, debugPanel ) {

        var GRAVITY_RATE = -9.81;
        var BLOCK_COUNT = 300;            // taille fixe de la réserve de blocs (recyclés)
        var BLOCK_FALL_DELAY = 40;        // en images à 60 FPS
        var BLOCK_RECYCLE_DEPTH = -60;    // un bloc tombé plus bas est recyclé
        var BEHIND_DISTANCE = 40;         // un bloc non touché aussi loin derrière le joueur est abandonné
        var DEAD_FLOOR = -200;            // après la mort, la bille s'arrête de tomber ici
        var MAX_FRAME_STEP = 3;
        var clock = new THREE.Clock();
        var reportedErrors = {};

        var app = {

            init: function () {
                scene.add(meshPlayer);
                for (var i = 0; i < BLOCK_COUNT; i++) {
                    spawnBlock();
                }
                world.init();
                scene.add(ambientLight);
                scene.add(light);
                variable.instructions.innerHTML = "<strong>Press Echap to Play!</strong> </br></br> ESPACE ou TAP = changer de direction ";

                window.addEventListener('resize', app.onWindowResize, false);

                // Si le navigateur retire le contexte WebGL (pilote GPU, manque de mémoire...),
                // Three.js le restaure tout seul ; on met simplement la partie en pause.
                renderer.domElement.addEventListener('webglcontextlost', function () {
                    if (variable.alive === 0) variable.paused = 1;
                }, false);
            },

            animate: function () {
                stat.begin();
                var step = app.frameStep();
                var paused = variable.paused == 1;

                // On programme l'image suivante AVANT tout le reste :
                // même si une erreur survient plus bas, la boucle continue.
                requestAnimationFrame(paused ? app.pause : app.animate);

                try {
                    if (paused) {
                        pauseMenu(1);
                    } else {
                        app.update(step);
                    }
                    renderer.render(scene, camera);
                    debugPanel.update();
                } catch (error) {
                    app.handleError(error);
                }
                stat.end();
            },

            // Une image de jeu. `step` = temps écoulé en "images à 60 FPS" (1 = 1/60 s).
            update: function (step) {
                pauseMenu(variable.alive == 1 ? 1 : 0);
                score.score();

                // Après la mort, la bille s'arrête une fois hors de vue
                // (avant : elle avançait et tombait à l'infini).
                if (variable.alive == 0 || meshPlayer.position.y > DEAD_FLOOR) {
                    updatePlayer.updatePlayer(step);
                }
                checkBlockHit();

                if (variable.alive == 1) {
                    if (variable.gameReset == 1) {
                        resetGame();
                    } else {
                        // Caméra fixe pendant que la bille tombe.
                        camera.position.x = variable.lastPosition.x - 10;
                        camera.position.y = variable.lastPosition.y + 10;
                        camera.position.z = variable.lastPosition.z - 10;
                        if (meshPlayer.position.y > DEAD_FLOOR) {
                            meshPlayer.position.y += GRAVITY_RATE * variable.player.downSpeed * step;
                            variable.player.downSpeed += 0.002 * step;
                        }
                    }
                }

                app.updateBlocks(step);
                world.rebaseIfNeeded();
                controls();
            },

            // Les blocs touchés tombent après un délai, puis sont recyclés au bout du parcours.
            updateBlocks: function (step) {
                var p = meshPlayer.position;
                var playerProgress = p.x + p.z;   // le chemin avance toujours en +x ou +z

                for (var i = 0; i < stack.length; i++) {
                    var block = stack[i];

                    // Un bloc dépassé sans être touché ne tomberait jamais :
                    // la réserve se viderait peu à peu. On le fait tomber aussi.
                    if (block.hit === 0 && variable.alive === 0 &&
                        block.position.x + block.position.z < playerProgress - BEHIND_DISTANCE) {
                        block.hit = 1;
                    }

                    if (block.hit === 1) {
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
            },

            // Une erreur inattendue ne doit pas figer le jeu : on la signale une fois
            // dans la console et on met en pause (Echap pour reprendre).
            handleError: function (error) {
                var key = String(error && error.message);
                if (!reportedErrors[key]) {
                    reportedErrors[key] = true;
                    console.error("[EndlessRunner] erreur dans la boucle de jeu :", error);
                }
                if (variable.alive === 0) variable.paused = 1;
            },

            // Temps écoulé depuis l'image précédente, en "images à 60 FPS" (1 = 1/60 s).
            // Le jeu va ainsi à la même vitesse sur un écran 60 Hz ou 144 Hz.
            // Plafonné pour éviter un saut énorme après un changement d'onglet.
            frameStep: function () {
                return Math.min(clock.getDelta() * 60, MAX_FRAME_STEP);
            },

            pause: function () {
                clock.getDelta();   // le temps passé en pause ne compte pas
                requestAnimationFrame(variable.paused == 0 ? app.animate : app.pause);
            },

            onWindowResize: function () {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };
        return app;
    } );
