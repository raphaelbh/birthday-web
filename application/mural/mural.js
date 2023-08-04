main();

function main() {

    // load messages
    fetch("https://birthday-api-y1wf.onrender.com/messages")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); 
    }).then(data => {
        _loadMessages(data);
    }).catch(error => {
        console.error("Erro:", error);
    });

    // events
    const sendButton = document.getElementById('send-message');
    sendButton.onclick = _send;
}

function _loadMessages(messages) {

    const mural = document.getElementById('messages-section');    
    for (let i = messages.length-1; i >= 0; i--) {

        const message = messages[i];
        const messageContent = `
            <div class="col"">
              <div class="card shadow-sm">
                  <div class="card text-center" style="background-color: white;">
                  <div class="card-body">
                      <p class="card-text" style="text-align: left; color: darkslategray;">${message.message}</p>
                      <p class="card-text" style="text-align: right;"><small class="text-body-secondary" style="color: gray !important;">${message.user}</small></p>
                  </div>
                  </div>
              </div>
            </div>
        `;
        mural.innerHTML += messageContent;
    }
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
    window.location.href = 'index.html';
}
