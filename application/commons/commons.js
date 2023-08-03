// theme
localStorage.removeItem("theme");

const backHomeButton = document.getElementById('back-home')
backHomeButton.onclick = backHome

function backHome() {
    window.location.href = '../home/index.html';
}