
function updatePath() {
    if(playerScore  === 15){
        for(var i=20; i<40; i++){
            spawnBlock(i);
            console.log(stack.length);
        }

        blocknumber +=20;

    }
    /*for(var i=20; i<40; i++){
        if(stack[i].hit == 1){
            if(stack[i].deathTimeout <40){
                stack[i].deathTimeout++;
            }
              else{
                stack[i].position.y -= 0.1;
            }
        }
    }

     */

}



function shiftBlocks(){
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


function spawnBlock(index){
    var block;
    var rand = Math.floor(Math.random() * 2);
    if(stack.length != 0){
        block = new THREE.Mesh(
            new THREE.BoxGeometry(10,10,10),
            new THREE.MeshPhongMaterial({color:getRandomColor(), wireframe:USE_WIREFRAME})
        );
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
        block = new THREE.Mesh(
            new THREE.BoxGeometry(10,10,10),
            new THREE.MeshPhongMaterial({color:0x5E3C58, wireframe:USE_WIREFRAME})
        );
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
function textPRESSENTERTORESETGAME(on){
    if(on == 1){
        pressEnterToReset = document.createElement('div');
        pressEnterToReset.style.position = 'absolute';
        //pressEnterToReset.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        pressEnterToReset.style.width = 100;
        pressEnterToReset.style.height = 100;
        pressEnterToReset.style.opacity = 0.7;
        pressEnterToReset.style.fontSize = "xx-large";
        pressEnterToReset.style.fontFamily = "Impact,Charcoal,sans-serif";
        pressEnterToReset.innerHTML = "Taper ENTER pour rejouer" ;
        pressEnterToReset.style.color ="white" ;

        //pressEnterToReset.style.top = window.innerWidth/2 + 'px';
        //pressEnterToReset.style.left = window.innerHeight/2 + 'px';

        pressEnterToReset.style.top = window.innerHeight/2 + 'px';
        pressEnterToReset.style.left = window.innerWidth/2-150 + 'px';
        document.body.appendChild(pressEnterToReset);
    }
    else{
        if(pressEnterToReset != undefined)
            pressEnterToReset.innerHTML = "";
    }
}
function textPAUSED(on){
    if(on == 1){
        pressEnterToReset = document.createElement('div');
        pressEnterToReset.style.position = 'absolute';
        //pressEnterToReset.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        pressEnterToReset.style.width = 100;
        pressEnterToReset.style.height = 100;
        pressEnterToReset.style.opacity = 0.9;
        pressEnterToReset.style.fontSize = "xx-large";
        pressEnterToReset.style.fontFamily = "Impact,Charcoal,sans-serif";
        pressEnterToReset.innerHTML = "PAUSE" ;
        //pressEnterToReset.style.top = window.innerWidth/2 + 'px';
        //pressEnterToReset.style.left = window.innerHeight/2 + 'px';

        pressEnterToReset.style.top = window.innerHeight/2-50 + 'px';
        pressEnterToReset.style.left = window.innerWidth/2-37 + 'px';
        document.body.appendChild(pressEnterToReset);
    }
    else{
        if(pressEnterToReset != undefined)
            pressEnterToReset.innerHTML = "";
    }
}

function textWin(on){
    if(on == 1){
        pressEnterToReset = document.createElement('div');
        pressEnterToReset.style.position = 'absolute';
        //pressEnterToReset.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        pressEnterToReset.style.width = 100;
        pressEnterToReset.style.height = 100;
        pressEnterToReset.style.opacity = 0.9;
        pressEnterToReset.style.fontSize = "xx-large";
        pressEnterToReset.style.fontFamily = "Impact,Charcoal,sans-serif";
        pressEnterToReset.innerHTML = "WIN" ;
        //pressEnterToReset.style.top = window.innerWidth/2 + 'px';
        //pressEnterToReset.style.left = window.innerHeight/2 + 'px';

        pressEnterToReset.style.top = window.innerHeight/2-50 + 'px';
        pressEnterToReset.style.left = window.innerWidth/2-37 + 'px';
        document.body.appendChild(pressEnterToReset);
    }
    else{
        if(pressEnterToReset != undefined)
            pressEnterToReset.innerHTML = "";
    }
}



function score(){
    if(playerScoreText == null){
        playerScoreText = document.createElement('div');
        playerScoreText.style.position = 'absolute';
        //playerScoreText.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        playerScoreText.style.width = 100;
        playerScoreText.style.height = 100;
        playerScoreText.style.opacity = 0.6;
        playerScoreText.style.fontSize = "xx-large";
        playerScoreText.style.fontFamily = "Impact,Charcoal,sans-serif";
        playerScoreText.innerHTML = "SCORE:" + playerScore;
        //playerScoreText.style.top = window.innerWidth/2 + 'px';
        //playerScoreText.style.left = window.innerHeight/2 + 'px';

        playerScoreText.style.top = 50 + 'px';
        playerScoreText.style.left = window.innerWidth-160 + 'px';
        document.body.appendChild(playerScoreText);
    }
    else{
        playerScoreText.innerHTML = "SCORE:" + playerScore;
    }
}
