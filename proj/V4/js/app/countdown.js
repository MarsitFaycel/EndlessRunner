define(
    ["three","variable"],
    function(TREE,variable){

        function countdown(i){
            var e = document.getElementById("demo");

            if(i== 0) {

                e.style.display = "block";
                variable.stat=1;
            }else{
                e.style.display = "none";

            }




        }
        return countdown;

    });