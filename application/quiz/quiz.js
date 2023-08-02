const data = [
    {
        "code": "1",
        "description": "Quantos irmãos você tem?",
        "options": [
            {
                "code": "1",
                "description": "1"
            },
            {
                "code": "2",
                "description": "2"
            },
            {
                "code": "3",
                "description": "3"
            }
        ]
    },
    {
        "code": "2",
        "description": "Quantos estados brasileiros eu conheço?",
        "options": [
            {
                "code": "1",
                "description": "3"
            },
            {
                "code": "2",
                "description": "6"
            },
            {
                "code": "3",
                "description": "9"
            }
        ]
    }
]

main();

function main() {

    // bypass if quiz sent
    const quizSent = localStorage.getItem('quiz_sent');
    if (quizSent) {
        window.location.href = 'index.html';
    }

    // load questions
    _loadQuestions();

    // events
    const sendButton = document.getElementById('send');
    sendButton.onclick = _send;

}

function _send() {
    const answers = _getAnswers();
    _sendAnswers(answers)
}

function _getAnswers() {
    const answers = {};
    for (let i = 0; i < data.length; i++) {
        answers[i] = _getValue('input[name="question' + i + '"]');
    }

    return answers;
}

function _sendAnswers(answers) {

    const headers = new Headers();
    headers.append("x-user", localStorage.getItem('user'));
    headers.append("Content-Type", "application/json");

    fetch("https://birthday-api-y1wf.onrender.com/quiz", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(answers)
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
    // set send flag
    localStorage.setItem('quiz_sent', true);

    // hide questions section
    const questionsSection = document.getElementById('questions-section');
    questionsSection.style.display = 'none';

    // show message
    const quizMessage = document.getElementById('quiz-message');
    quizMessage.style.display = 'block';
}

function _getValue(selector) {
    const options = document.querySelectorAll(selector);
    let selected = null;
    for (let option of options) {
        if (option.checked) {
            selected = option.value;
            break;
        }
    }
    return selected;
}



function _addQuestion(index, question) {

    const questions = document.getElementById("questions");

    let optionsContent = ""
    for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i]
        optionsContent += `
        <input class="list-group-item-check pe-none" type="radio" name="question${index}" id="question${index}Radios${option.code}" value="${option.code}">
        <label class="list-group-item rounded-3 py-3 text-center" for="question${index}Radios${option.code}">${option.description}</label>
        `
    }

    const questionContent = `
        <div style="font-weight: bold; font-size: 20px;">${question.description}</div>
        <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5">
            <div class="list-group list-group-checkable d-grid gap-2 border-0">
            ${optionsContent}
            </div>
        </div>
    `;
    questions.innerHTML += questionContent;
}

function _loadQuestions() {

    /*fetch("https://birthday-api-y1wf.onrender.com/questions")
    .then(response => {
        if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {*/
        for (let i = 0; i < data.length; i++) {
            _addQuestion(i, data[i]);
        }
    /*})
    .catch(error => {
        console.error("Erro:", error);
    });*/
}


