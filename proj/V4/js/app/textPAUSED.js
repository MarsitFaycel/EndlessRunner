define(
    ["variable"],
    function (variable) {
        // L'ancien code ajoutait un <div> vide au document à chaque image de pause.
        // Le seul effet visible restant : effacer les instructions quand la partie reprend.
        function textPAUSED(on) {
            if (on !== 1 && variable.instructions) {
                variable.instructions.innerText = "";
            }
        }
        return textPAUSED;
    }
);
