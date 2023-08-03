const data = [
    {
        "ID": 1,
        "CreatedAt": "2023-08-02T19:07:00.979341Z",
        "UpdatedAt": "2023-08-02T19:07:00.979341Z",
        "DeletedAt": null,
        "user": "raphael oliv",
        "message": "mensagem"
    },
    {
        "ID": 2,
        "CreatedAt": "2023-08-02T19:07:15.620411Z",
        "UpdatedAt": "2023-08-02T19:07:15.620411Z",
        "DeletedAt": null,
        "user": "raphael oliv 2",
        "message": "mensagem pequena"
    },
    {
        "ID": 3,
        "CreatedAt": "2023-08-02T21:02:32.907537Z",
        "UpdatedAt": "2023-08-02T21:02:32.907537Z",
        "DeletedAt": null,
        "user": "Raphael Oliv - 8",
        "message": "mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem grande mensagem"
    },
    {
        "ID": 4,
        "CreatedAt": "2023-08-02T21:02:43.505927Z",
        "UpdatedAt": "2023-08-02T21:02:43.505927Z",
        "DeletedAt": null,
        "user": "Raphael Oliv - 8",
        "message": "mensagem"
    },
    {
        "ID": 5,
        "CreatedAt": "2023-08-02T21:03:53.697386Z",
        "UpdatedAt": "2023-08-02T21:03:53.697386Z",
        "DeletedAt": null,
        "user": "Raphael Oliv - 8",
        "message": "mensagem"
    },
    {
        "ID": 6,
        "CreatedAt": "2023-08-02T21:07:38.018111Z",
        "UpdatedAt": "2023-08-02T21:07:38.018111Z",
        "DeletedAt": null,
        "user": "Raphael Oliv - 8",
        "message": "mensagem"
    },
    {
        "ID": 7,
        "CreatedAt": "2023-08-02T21:11:31.017424Z",
        "UpdatedAt": "2023-08-02T21:11:31.017424Z",
        "DeletedAt": null,
        "user": "Raphael Dias Oliveira",
        "message": "Nova mensagem"
    },
    {
        "ID": 8,
        "CreatedAt": "2023-08-03T17:59:15.7997Z",
        "UpdatedAt": "2023-08-03T17:59:15.7997Z",
        "DeletedAt": null,
        "user": "John Snow",
        "message": "Eu te amo sua linda!!! \u003c3"
    },
    {
        "ID": 9,
        "CreatedAt": "2023-08-03T18:00:10.3325Z",
        "UpdatedAt": "2023-08-03T18:00:10.3325Z",
        "DeletedAt": null,
        "user": "John Snow",
        "message": "No mensagem - te amo muito!!! \u003c3"
    }
];


main();

function main() {

    // load messages
    /*fetch("https://birthday-api-y1wf.onrender.com/messages")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); 
    }).then(data => {
        _loadMessages(data);
    }).catch(error => {
        console.error("Erro:", error);
    });*/
    _loadMessages(data);

    // events
    const sendButton = document.getElementById('send-message');
    sendButton.onclick = _send;
}

function _loadMessages(messages) {

    const mural = document.getElementById('mural');    
    for (let i = messages.length-1; i >= 0; i--) {

        const message = messages[i];
        const messageContent = `
            <div class="mb-4">
                <div class="card text-center" style="background-color: white;">
                <div class="card-body">
                    <p class="card-text" style="text-align: left; color: darkslategray;">${message.message}</p>
                    <p class="card-text" style="text-align: right;"><small class="text-body-secondary">${message.user}</small></p>
                </div>
                </div>
            </div>
        `

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
