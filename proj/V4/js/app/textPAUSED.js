define(
    ["variable"],
    function (variable) {
         function textPAUSED(on){
            if(on === 1){
                variable.pressEnterToReset = document.createElement('div');
                variable.pressEnterToReset.style.position = 'absolute';
                //variable.pressEnterToReset.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
                variable.pressEnterToReset.style.width = 100;
                variable.pressEnterToReset.style.height = 100;
                variable.pressEnterToReset.style.opacity = 0.9;
                variable.pressEnterToReset.style.fontSize = "xx-large";
                variable.pressEnterToReset.style.fontFamily = "Impact,Charcoal,sans-serif";
                variable.pressEnterToReset.innerHTML = "PAUSE" ;
                //variable.pressEnterToReset.style.top = window.innerWidth/2 + 'px';
                //variable.pressEnterToReset.style.left = window.innerHeight/2 + 'px';

                variable.pressEnterToReset.style.top = window.innerHeight/2-50 + 'px';
                variable.pressEnterToReset.style.left = window.innerWidth/2-37 + 'px';
                document.body.appendChild(variable.pressEnterToReset);
            }
            else{
                if(variable.pressEnterToReset !== undefined)
                    variable.pressEnterToReset.innerHTML = "";
            }
        }
        return textPAUSED;

    }
)