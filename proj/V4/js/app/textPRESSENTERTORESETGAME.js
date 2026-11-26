define(["variable"], function (variable) {

    // Créé une seule fois puis affiché / masqué (avant : un nouveau <div> à chaque image).
    var message = null;

    function createMessage() {
        message = document.createElement('div');
        message.style.position = 'absolute';
        message.style.width = 60 + "%";
        message.style.opacity = 0.7;
        message.style.fontSize = "xx-large";
        message.style.fontFamily = "Impact,Charcoal,sans-serif";
        message.style.color = "white";
        message.style.display = "none";
        message.innerHTML = "Taper ENTER pour rejouer";
        document.body.appendChild(message);
    }

    function textPRESSENTERTORESETGAME(on) {
        if (message === null) createMessage();

        if (on === 1) {
            message.style.top = window.innerHeight / 2 + 'px';
            message.style.left = window.innerWidth / 2 - 150 + 'px';
            message.style.display = "block";
        } else {
            message.style.display = "none";
        }
    }
    return textPRESSENTERTORESETGAME;
});
