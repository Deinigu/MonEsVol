const blessings = require('../../utils/json/bendiciones.json')

// Función para seleccionar una bendición aleatoria
function getRandomBlessing() {
    const randomIndex = Math.floor(Math.random() * blessings.length);
    return blessings[randomIndex];
}

// Exportar la función para reusarla en otros archivos
module.exports = {getRandomBlessing};