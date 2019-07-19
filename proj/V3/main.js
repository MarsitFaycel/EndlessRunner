var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;
const GRAVITY_RATE = -9.81;

var keyboard = {};
var player = { height:1.8, speed:1, turnSpeed:Math.PI*0.02, direction:0, downSpeed:0.0001 };
var USE_WIREFRAME = false;
var pressed = 0;
var stack = [];
//pause = 0 means game is running
//pause = 1 means game is paused
var paused = 0;
var menu;
//0 -> alive | 1 -> dead
var alive = 0;
var timeDead =0;
//stores last position of player before death
var lastPosition;
//stores position in the stack (for the block) the player is currently on
var currentBlock = null;
//player score
var playerScore = 0;
//player score text
var playerScoreText;
var blocknumber=20;

var pressEnterToReset;
// 1 = game queued to be reset
var gameReset = 0;



function resetGame(){
    //location.reload();
    if(gameReset == 1){
        gameReset = 0;
        alive = 0;
        mesh.position.x = 0;
        mesh.position.y = 0.65;
        mesh.position.z = 0;
        paused = 0;
        mesh.add(camera);
        camera.position.set(-10, 10, -10);
        //camera.lookAt(new THREE.Vector3(0,player.height,0));
        camera.lookAt(mesh.position);
        lastPosition = null;
        player.speed=1;
        player.direction=0;
        player.downSpeed=0.0001;
        playerScore =0;
        resetBlocks();
    }
}

function resetBlocks(){
    for(var i =0; i<40; i++){
        scene.remove(stack[i]);
    }
    stack = [];
    for(var i=0; i<300; i++){
        spawnBlock(i);
        //console.log(stack.length);
    }

}

function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.5, 70);
    //var width = 40;
    //var height = 40;
    //camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    //xyzAxis();
    spawnPlayer();


    var startZone = new THREE.Mesh(
        new THREE.PlaneGeometry(40,40, 50,50),
        // MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
        new THREE.MeshPhongMaterial({color:0x5E3C58, wireframe:USE_WIREFRAME})
        // See threejs.org/examples/ for other material types
    );
    startZone.rotation.x -= Math.PI / 2;
    startZone.position.y = 0;
    // Floor can have shadows cast onto it
    startZone.receiveShadow = true;
    scene.add(startZone);

    for(var i=0; i<300; i++){
        spawnBlock(i);
        //console.log(stack.length);

    }


    // LIGHTS
    ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 0.8, 600);
    light.position.set(-10,60,10);
    light.castShadow = true;
    // Will not light anything closer than 0.1 units or further than 25 units
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 15;
    scene.add(light);


    camera.position.set(-10, 10, -10);
    //camera.lookAt(new THREE.Vector3(0,player.height,0));
    camera.lookAt(mesh.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0x60A1F0 );
    // Enable Shadows in the Renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);

    animate();
}
function pause(){
    //pauseMenu(1);
    //renderer.render(scene, camera);
    if(paused == 0){
        requestAnimationFrame(animate);
    }
    if(paused == 1){
        requestAnimationFrame(pause);
    }

}

function pauseMenu(on){
    if(on == 1){
        menu = new THREE.Mesh(
            new THREE.BoxGeometry(15,15,15),
            new THREE.MeshPhongMaterial({color:0x000000, wireframe:USE_WIREFRAME, transparent: true, opacity: 0.5})
        );
        //document.getElementById("paused").innerHTML = 5 + 6;

        //menu.lookAt(camera);
        if(alive == 0){
            menu.position.x = mesh.position.x-4;
            menu.position.z = mesh.position.z-4;
            menu.position.y = mesh.position.y+4;
        }
        else if(alive == 1){
            //console.log('x: ' + menu.position.x + ' y: '+menu.position.y+' z: '+menu.position.z);
            menu.position.x = lastPosition.x-4;
            menu.position.z = lastPosition.z-4;
            menu.position.y = lastPosition.y+4;
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
        if(alive == 1){
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

function animate(){
    if(paused == 0){
        pauseMenu(0);
        requestAnimationFrame(animate);
    }
    if(paused == 1){
        pauseMenu(1);
        requestAnimationFrame(pause);
    }

    //cubeHit();
    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;

    score();

    updatePlayer();
    //updatePath();
    checkBlockHit();

    if(alive == 1){
        if(gameReset == 1){
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


    //iterate through stack of blocks, whichever were hit, make them fall
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






    //if(keyboard[32]){ // W key
    if (pressed == 1 && alive == 0){
        if(player.direction == 0)
            player.direction = 1;
        else
            player.direction = 0;
        //keyboard[32] = false;
        pressed =2;
        //camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        //camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }
    if(keyboard[30]) { // Z key up
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
        mesh.position.z += player.speed * 0.5;
    }
    if(keyboard[83]){ // S key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    }
    if(keyboard[81]){ // Q key
        camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
    }
    if(keyboard[68]){ // D key
        camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
    }

    if(keyboard[37]){ // left arrow key
        camera.rotation.y -= player.turnSpeed;
    }
    if(keyboard[39]){ // right arrow key
        camera.rotation.y += player.turnSpeed;
    }

    renderer.render(scene, camera);
}

function keyDown(event){
    keyboard[event.keyCode] = true;
    if(event.keyCode == 32 && pressed == 0)
        pressed = 1;
    if(event.keyCode == 27 && alive != 1){
        paused ==1 ? paused = 0 : paused = 1;
    }
    if(event.keyCode == 13){
        gameReset = 1;
    }

}

function keyUp(event){
    keyboard[event.keyCode] = false;
    if(event.keyCode == 32 && pressed == 2)
        pressed = 0;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;




function xyzAxis(){

//x axis
    var material = new THREE.LineBasicMaterial({
        color: 0xff0000
    });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( -30, 0, 0 ),
        new THREE.Vector3( 30, 0, 0 ),
        new THREE.Vector3( 25, 5,0)
    );
    var line1 = new THREE.Line( geometry, material );
    scene.add( line1 );

//y axis
    material = new THREE.LineBasicMaterial({
        color: 0x008000
    });
    geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( 0, -30, 0 ),
        new THREE.Vector3( 0, 30, 0 ),
        new THREE.Vector3( 5, 25,0)
    );
    var line2 = new THREE.Line( geometry, material );
    scene.add( line2 );

//z axis
    material = new THREE.LineBasicMaterial({
        color: 0x0000FF
    });
    geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( 0, 0, -30 ),
        new THREE.Vector3( 0, 0, 30 ),
        new THREE.Vector3( 0, 5,25)
    );
    var line3 = new THREE.Line( geometry, material );
    scene.add( line3 );

}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}