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
        //console.log(data);
        _loadMessages(data);
    }).catch(error => {
        console.error("Erro:", error);
    });

    // events
    const sendButton = document.getElementById('send-message');
    sendButton.onclick = _send;
}

function _loadMessages(messages) {

    const col1 = document.getElementById('col1');
    const col2 = document.getElementById('col2');

    for (let i = 0; i < messages.length; i++) {

        const message = messages[i];
        const messageContent = `
            <div class="card p-3">
                <figure class="p-3 mb-0">
                    <blockquote class="blockquote">
                    <p>${message.message}</p>
                    </blockquote>
                    <figcaption class="blockquote-footer mb-0 text-body-secondary">
                        ${message.user}
                    </figcaption>
                </figure>
            </div><br />
        `

        if (i % 2 === 0) col1.innerHTML += messageContent;
        else col2.innerHTML += messageContent;
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
