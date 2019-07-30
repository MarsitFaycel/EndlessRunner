define(["variable"], function (variable) {

     function textPRESSENTERTORESETGAME(on){
        if(on === 1){

            variable.pressEnterToReset = document.createElement('div');
            variable.pressEnterToReset.style.position = 'absolute';
            //pause.pressEnterToReset.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
            variable.pressEnterToReset.style.width = 60+"%";
            variable.pressEnterToReset.style.height = 100;
            variable.pressEnterToReset.style.opacity = 0.7;
            variable.pressEnterToReset.style.fontSize = "xx-large";
            variable.pressEnterToReset.style.fontFamily = "Impact,Charcoal,sans-serif";
            variable.pressEnterToReset.innerHTML = "Taper ENTER pour rejouer" ;
            variable.pressEnterToReset.style.color ="white" ;

            //pause.pressEnterToReset.style.top = window.innerWidth/2 + 'px';
            //pause.pressEnterToReset.style.left = window.innerHeight/2 + 'px';

            variable.pressEnterToReset.style.top = window.innerHeight/2 + 'px';
            variable.pressEnterToReset.style.left = window.innerWidth/2-150 + 'px';
            document.body.appendChild(variable.pressEnterToReset);
        }
        else{
            if(variable.pressEnterToReset !== undefined)
                variable.pressEnterToReset.innerHTML = "";
        }
    }
    return textPRESSENTERTORESETGAME;
})