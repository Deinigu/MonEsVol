function capitalizeFirstLetter(string) {
    if (!string) return ''; // Handle empty or undefined string
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = { capitalizeFirstLetter };