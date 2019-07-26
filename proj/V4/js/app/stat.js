define(["stats"],
    function(stats){
        var stat = new stats();
        stat.showPanel( 2);
        //console.log(stat)
        document.body.appendChild( stat.domElement );

    return stat;
    })