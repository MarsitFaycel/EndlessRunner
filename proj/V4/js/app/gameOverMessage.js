// Message "Taper ENTER pour rejouer", créé une seule fois puis affiché / masqué.
define( [], function () {

    var message = document.createElement('div');
    message.style.position = 'absolute';
    message.style.width = '60%';
    message.style.opacity = 0.7;
    message.style.fontSize = 'xx-large';
    message.style.fontFamily = 'Impact,Charcoal,sans-serif';
    message.style.color = 'white';
    message.style.display = 'none';
    message.textContent = 'Taper ENTER pour rejouer';
    document.body.appendChild(message);

    return function gameOverMessage(visible) {
        if (visible) {
            message.style.top = window.innerHeight / 2 + 'px';
            message.style.left = window.innerWidth / 2 - 150 + 'px';
            message.style.display = 'block';
        } else {
            message.style.display = 'none';
        }
    };
});
