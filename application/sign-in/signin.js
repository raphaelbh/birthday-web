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

    if (!validForm()) {
        _errorFields();
        return;
    }

    
    // --- authenticate
    /*const body = {
        username: document.getElementById('user').value,
        password: document.getElementById('pass').value
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    fetch('https://exemplo-api-rest.com/auth', options)
    .then(response => {

        console.log("response", response)

        if (!response.ok) {
            throw new Error('Erro na chamada da API: ' + response.status);
        }
        return response.json();

    })
    .then(data => {
        console.log('Resposta da API POST:', data);
        _success();
    })
    .catch(error => {
        console.error(error.message);
        _error();
    });*/
    
    
    _success()
}

function validForm() {
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