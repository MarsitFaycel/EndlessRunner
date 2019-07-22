define( ["three", "scene","variable"], function ( THREE, scene, variable ) {

    var diff= {
        playerdiffText: null,
        Facile: null,
        Intermed : null,
        Diff : null,

        diff: function () {

            if (diff.playerdiffText == null) {
                diff.playerdiffText = document.createElement('div');
                diff.playerdiffText.style.position = 'absolute';
                //diff.playerdiffText.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
                diff.playerdiffText.style.width = 100;
                diff.playerdiffText.style.height = 100;
                diff.playerdiffText.style.opacity = 0.6;
                diff.playerdiffText.style.fontSize = "xx-large";
                diff.playerdiffText.style.fontFamily = "Impact,Charcoal,sans-serif";
                diff.playerdiffText.innerHTML = "difficulté:" ;

                diff.Facile = document.createElement('button');
                diff.Facile.style.position = 'absolute';
                diff.Facile.style.width = 100;
                diff.Facile.style.height = 100;
                diff.Facile.style.opacity = 0.6;
                diff.Facile.style.fontSize = "xx-large";
                diff.Facile.style.fontFamily = "Impact,Charcoal,sans-serif";
                diff.Facile.innerHTML = "facile";
                diff.Facile.style.top = 90 + 'px';
                diff.Facile.style.left = 20 + 'px';
                diff.Facile.id ="buttonFacile"

                document.body.appendChild(diff.Facile);


                diff.Intermed = document.createElement('button');
                diff.Intermed.style.position = 'absolute';
                diff.Intermed.style.width = 100;
                diff.Intermed.style.height = 100;
                diff.Intermed.style.opacity = 0.6;
                diff.Intermed.style.fontSize = "xx-large";
                diff.Intermed.style.fontFamily = "Impact,Charcoal,sans-serif";
                diff.Intermed.innerHTML = "Intermediaire";
                diff.Intermed.style.top = 140 + 'px';
                diff.Intermed.style.left = 20 + 'px';

                document.body.appendChild(diff.Intermed);

                //diff.playerdiffText.style.top = window.innerWidth/2 + 'px';
                //diff.playerdiffText.style.left = window.innerHeight/2 + 'px';


                diff.Diff = document.createElement('button');
                diff.Diff.style.position = 'absolute';
                diff.Diff.style.width = 100;
                diff.Diff.style.height = 100;
                diff.Diff.style.opacity = 0.6;
                diff.Diff.style.fontSize = "xx-large";
                diff.Diff.style.fontFamily = "Impact,Charcoal,sans-serif";
                diff.Diff.innerHTML = "Difficile";
                diff.Diff.style.top = 190 + 'px';
                diff.Diff.style.left = 20 + 'px';

                document.body.appendChild(diff.Diff);


                diff.playerdiffText.style.top = 50 + 'px';
                diff.playerdiffText.style.left = 20 + 'px';
                document.body.appendChild(diff.playerdiffText);

            }


            /*document.body.removeChild(document.body.children[3]);

            diff.Facile.onselect  =function(){
             console.log("eeeee");
              //  document.body.removeChild(diff.Intermed);
                //document.body.removeChild(diff.Facile);
                document.body.removeChild(document.body.children[3]);
            }

             */

        }
    };




    return diff;
} );