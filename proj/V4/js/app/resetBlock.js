define(["scene" ,"stack" ,"spawnBlock"] , function(scene, stack, spawnBlock){
function resetBlock(){
    for(var i =0; i<300; i++){
        scene.remove(stack[i]);
    }
    stack.length = 0;

    for(var i=0; i<300; i++){
        spawnBlock(i);

    }

}
return resetBlock;
})