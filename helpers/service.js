
function shuffle(array) {
    let currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        //permuter lia les valeurs
        [array[randomIndex], array[currentIndex]] = [array[currentIndex], array[randomIndex]];
        /*
             temporaryValue = array[currentIndex];
             array[currentIndex] = array[randomIndex];
             array[randomIndex] = temporaryValue;
             */
    }
    return array;
}

module.exports = service;