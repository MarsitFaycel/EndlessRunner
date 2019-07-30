define( ["three", "scene","variable"], function ( THREE, scene, variable ) {

    var diff= {
        playerdiffText: null,
        Facile: null,
        Intermed : null,
        Diff : null,

        diff: function () {



            /*document.body.removeChild(document.body.children[3]);

            diff.Facile.onselect  =function(){
             console.log("eeeee");
              //  document.body.removeChild(diff.Intermed);
                //document.body.removeChild(diff.Facile);
                document.body.removeChild(document.body.children[3]);
            }

             */

        },
         facile: function(event){

        let button = event.target ;
        console.log(button.innerHTML);
        variable.start=1;

        /*if(button.innerHTML === "facile"){
            diff.playerdiffText.innerHTML= "difficulté:"
            diff.playerdiffText.innerHTML+= "facile";
            document.body.removeChild(diff.Facile);
            document.body.removeChild(diff.Intermed);
            document.body.removeChild(diff.Diff);

        }else if(button.innerHTML === "Intermediaire"){
            diff.playerdiffText.innerHTML= "difficulté:";
            diff.playerdiffText.innerHTML+= "Intermediaire";
            variable.player.speed = 1.2;
            document.body.removeChild(diff.Facile);
            document.body.removeChild(diff.Intermed);
            document.body.removeChild(diff.Diff);

            console.log(event.target)
        }else if (button.innerHTML === "Difficile") {

            diff.playerdiffText.innerHTML= "difficulté:";
            diff.playerdiffText.innerHTML+= "Difficile";
            variable.player.speed = 1.4;
            document.body.removeChild(diff.Facile);
            document.body.removeChild(diff.Intermed);
            document.body.removeChild(diff.Diff);
            console.log(event.target)
        }else{
            event.stopPropagation();
        }

         */
        //console.log(event.target)




    }
    };




    return diff;
} );