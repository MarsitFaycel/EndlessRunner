define( ["three","app","variable","meshPlayer","camera","scene","textPRESSENTERTORESETGAME","textPAUSED"],
    function (THREE, app,variable,meshPlayer,camera ,scene,textPRESSENTERTORESETGAME,textPAUSED) {

        function startMenu(on){
           var menu = document.getElementById("demo");
            if(on === 1){

                menu.style.display = "block";






            }
            else{
                menu.style.display = "none";
            }

        }





        return startMenu;
    } );
