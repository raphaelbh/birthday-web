main();

function main() {
    
    // events
    const sendButton = document.getElementById('send-message');
    sendButton.onclick = _send;
}

function _send() {

    const message = {
        "user": localStorage.getItem('name'),
        "message": document.getElementById('message').value
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch("https://birthday-api-y1wf.onrender.com/messages", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(message)
    }).then(response => {
        if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        _success()
    }).catch(error => {
        console.error("Erro:", error);
    });
}

function _success() {
    document.getElementById('message').value = ""
}
