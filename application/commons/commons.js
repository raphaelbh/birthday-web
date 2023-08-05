// theme
localStorage.removeItem("theme");

const backHomeButton = document.getElementById('back-home');
if (backHomeButton) backHomeButton.onclick = _backHome

function _backHome() {
    window.location.href = '../home/index.html';
}