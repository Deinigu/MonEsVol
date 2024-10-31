const insultos = require('../../utils/json/insultos.json')

// Función para seleccionar un insulto aleatorio
function getRandomInsulto() {
    const randomIndex = Math.floor(Math.random() * insultos.length);
    return insultos[randomIndex];
}

// Exportar la función para reusarla en otros archivos
module.exports = {getRandomInsulto};