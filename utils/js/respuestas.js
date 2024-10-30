const respuestas = require('../../utils/json/respuestaPregunta.json')

// Función para seleccionar una bendición aleatoria
function getRandomRespuesta() {
    const randomIndex = Math.floor(Math.random() * respuestas.length);
    return respuestas[randomIndex];
}

// Exportar la función para reusarla en otros archivos
module.exports = {getRandomRespuesta};