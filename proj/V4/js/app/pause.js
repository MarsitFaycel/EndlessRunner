define( ["three","app","variable","meshPlayer","camera","scene"],
    function (THREE, app,variable,meshPlayer,camera ,scene) {
        var pause = {
             pressEnterToReset: null,

            textPRESSENTERTORESETGAME : function(on){
            if(on === 1){

               pause.pressEnterToReset = document.createElement('div');
                pressEnterToReset.style.position = 'absolute';
                //pause.pressEnterToReset.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
                pause.pressEnterToReset.style.width = 100;
                pause.pressEnterToReset.style.height = 100;
                pause.pressEnterToReset.style.opacity = 0.7;
                pause.pressEnterToReset.style.fontSize = "xx-large";
                pause.pressEnterToReset.style.fontFamily = "Impact,Charcoal,sans-serif";
                pause.pressEnterToReset.innerHTML = "Taper ENTER pour rejouer" ;
                pause.pressEnterToReset.style.color ="white" ;

                //pause.pressEnterToReset.style.top = window.innerWidth/2 + 'px';
                //pause.pressEnterToReset.style.left = window.innerHeight/2 + 'px';

                pause.pressEnterToReset.style.top = window.innerHeight/2 + 'px';
                pause.pressEnterToReset.style.left = window.innerWidth/2-150 + 'px';
                document.body.appendChild(pause.pressEnterToReset);
            }
            else{
                if(pause.pressEnterToReset !== undefined)
                    pause.pressEnterToReset.innerHTML = "";
            }
        },
            textPAUSED: function(on){
            if(on === 1){
                pause.pressEnterToReset = document.createElement('div');
                pause.pressEnterToReset.style.position = 'absolute';
                //pause.pressEnterToReset.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
                pause.pressEnterToReset.style.width = 100;
                pause.pressEnterToReset.style.height = 100;
                pause.pressEnterToReset.style.opacity = 0.9;
                pause.pressEnterToReset.style.fontSize = "xx-large";
                pause.pressEnterToReset.style.fontFamily = "Impact,Charcoal,sans-serif";
                pause.pressEnterToReset.innerHTML = "PAUSE" ;
                //pause.pressEnterToReset.style.top = window.innerWidth/2 + 'px';
                //pause.pressEnterToReset.style.left = window.innerHeight/2 + 'px';

                pause.pressEnterToReset.style.top = window.innerHeight/2-50 + 'px';
                pause.pressEnterToReset.style.left = window.innerWidth/2-37 + 'px';
                document.body.appendChild(pause.pressEnterToReset);
            }
            else{
                if(pause.pressEnterToReset !== undefined)
                    pause.pressEnterToReset.innerHTML = "";
            }
        }, pauseMenu: function (on){
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
                       pause.textPRESSENTERTORESETGAME(1);
                    }else{
                        pause.textPAUSED(1);
                    }

                }
                else{
                    pause.textPRESSENTERTORESETGAME(0);
                    pause.textPAUSED(0);
                    scene.remove(menu);
                }

            }




    };
        return pause;
    } );
