define( ["three","app","variable","meshPlayer","camera","scene","textPRESSENTERTORESETGAME","textPAUSED"],
    function (THREE, app,variable,meshPlayer,camera ,scene,textPRESSENTERTORESETGAME,textPAUSED) {

              function pauseMenu(on){
                if(on === 1){
                    menu = new THREE.Mesh(
                        new THREE.BoxGeometry(15,15,15),
                        new THREE.MeshPhongMaterial({color:0x000000, wireframe:variable.USE_WIREFRAME, transparent: true, opacity: 0.5})
                    );
                    //document.getElementById("paused").innerHTML = 5 + 6;

                    //menu.lookAt(camera);
                    if(variable.alive === 0){
                        menu.position.x = meshPlayer.position.x-4;
                        menu.position.z = meshPlayer.position.z-4;
                        menu.position.y = meshPlayer.position.y+4;
                    }
                    else if(variable.alive === 1){
                        //console.log('x: ' + menu.position.x + ' y: '+menu.position.y+' z: '+menu.position.z);
                        menu.position.x = variable.lastPosition.x-4;
                        menu.position.z = variable.lastPosition.z-4;
                        menu.position.y = variable.lastPosition.y+4;
                    }
                    if(variable.start == 0){

                        var e=document.getElementById("demo");
                        e.style.display = "block";
                        variable.start =1;
                    }else{
                        var e=document.getElementById("demo");
                        e.style.display = "none";

                    }
                    //console.log(alive);
                    //console.log('x: ' + menu.position.x + ' y: '+menu.position.y+' z: '+menu.position.z);
                    //console.log('x: ' + lastPosition.x + ' y: '+lastPosition.y+' z: '+lastPosition.z);
                    menu.quaternion.copy(camera.quaternion);
                    //menu.rotation.x += Math.PI/4;
                    //menu.rotation.x -= Math.PI/4;
                    //menu.rotation.z += Math.PI/4;

                    menu.receiveShadow = true;
                    menu.castShadow = true;
                    scene.add(menu);
                    if(variable.alive === 1){
                       textPRESSENTERTORESETGAME(1);
                    }else{
                        textPAUSED(1);
                    }

                }
                else{

                    textPRESSENTERTORESETGAME(0);
                    textPAUSED(0);
                    scene.remove(menu);
                }

            }





        return pauseMenu;
    } );
