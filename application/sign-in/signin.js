// theme
localStorage.setItem('theme', 'dark');

// home redirect
const localDataName = getLocalDataName();
if (localDataName) {
    window.location.href = '../home/index.html';
}

// actions
const signInButton = document.getElementById('sign-in')
signInButton.onclick = signIn;

function signIn() {

    if (!_validForm()) {
        _errorFields();
        return;
    }
    
    if (!_validAuth()) {
        _errorAuth();
        return
    }
    
    _success()
}

function _validForm() {
    const user = document.getElementById('user').value
    const pass = document.getElementById('pass').value
    const name = document.getElementById('name').value
    if ((user != null && user.length >= 4)
        && (pass != null && pass.length >= 4) 
        && (name != null && name.length >= 4)
        ) {
        return true;
    }
    return false;
}

function _validAuth() {
    const user = document.getElementById('user').value
    const pass = document.getElementById('pass').value
    if (user == "jack" && pass == "2023") {
        return true
    }
    return false
}

function _success() {
    saveLocalDataName()
    window.location.href = '../home/index.html';
}

function _errorAuth() {
    const errorDiv = document.getElementById('error-auth');
    errorDiv.style.display = 'block';
}

function _errorFields() {
    const errorInvalidFields = document.getElementById('error-fields');
    errorInvalidFields.style.display = 'block';
}
