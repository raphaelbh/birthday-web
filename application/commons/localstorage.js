function getLocalDataName() {
    return localStorage.getItem('name');
}

function saveLocalDataName() {
    const name = document.getElementById('name').value;
    localStorage.setItem('name', name);
}