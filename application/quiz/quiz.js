const data = [
    {
        "code": "1",
        "description": "Qual é o meu sabor de sorvete favorito?",
        "options": [
            {
                "code": "1",
                "description": "Unicórnio"
            },
            {
                "code": "2",
                "description": "Menta com chocolate"
            },
            {
                "code": "3",
                "description": "Pistache"
            }
        ]
    },
    {
        "code": "2",
        "description": "Qual é o meu filme preferido de todos os tempos?",
        "options": [
            {
                "code": "1",
                "description": "Casa comigo"
            },
            {
                "code": "2",
                "description": "Melhor amigo da noiva"
            },
            {
                "code": "3",
                "description": "Uma linda mulher"
            }
        ]
    },
    {
        "code": "3",
        "description": "Qual é o meu destino dos seus sonhos para viajar?",
        "options": [
            {
                "code": "1",
                "description": "Austrália"
            },
            {
                "code": "2",
                "description": "Tailândia"
            },
            {
                "code": "3",
                "description": "Filipinas"
            }
        ]
    },
    {
        "code": "4",
        "description": "Qual é o meu prato de comida preferido?",
        "options": [
            {
                "code": "1",
                "description": "Strogonoff"
            },
            {
                "code": "2",
                "description": "Macarrão"
            },
            {
                "code": "3",
                "description": "Feijoada"
            }
        ]
    },
    {
        "code": "5",
        "description": "Qual é o meu jogo de tabuleiro ou vídeo game preferido?",
        "options": [
            {
                "code": "1",
                "description": "Need for speed "
            },
            {
                "code": "2",
                "description": "Counter strike"
            },
            {
                "code": "3",
                "description": "Super Mario"
            }
        ]
    },
    {
        "code": "6",
        "description": "Qual o estilo de filme que mais odeio?",
        "options": [
            {
                "code": "1",
                "description": "Suspense"
            },
            {
                "code": "2",
                "description": "Terror"
            },
            {
                "code": "3",
                "description": "Drama"
            }
        ]
    },
    {
        "code": "7",
        "description": "Quantos irmão tenho?",
        "options": [
            {
                "code": "1",
                "description": "Um"
            },
            {
                "code": "2",
                "description": "Dois"
            },
            {
                "code": "3",
                "description": "Três"
            }
        ]
    },
    {
        "code": "8",
        "description": "Qual lugar eu sonho morar?",
        "options": [
            {
                "code": "1",
                "description": "Jericoacoara"
            },
            {
                "code": "2",
                "description": "São Miguel dos milagres"
            },
            {
                "code": "3",
                "description": "Maragogi"
            }
        ]
    },
    {
        "code": "9",
        "description": "Em quantas cidades já morei?",
        "options": [
            {
                "code": "1",
                "description": "Duas"
            },
            {
                "code": "2",
                "description": "Três"
            },
            {
                "code": "3",
                "description": "Quatro"
            }
        ]
    },
    {
        "code": "10",
        "description": "Qual minha cor favorita?",
        "options": [
            {
                "code": "1",
                "description": "Azul"
            },
            {
                "code": "2",
                "description": "Vermelho"
            },
            {
                "code": "3",
                "description": "Amarelo"
            }
        ]
    }
];

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

    const backIndexButton = document.getElementById('back-quiz-index')
    backIndexButton.onclick = _backIndex
}

function _backIndex() {
    window.location.href = 'index.html';
}

function _send() {
    const answers = _getAnswers();
    _sendAnswers(answers)
}

function _getAnswers() {
    const answers = {};
    for (let i = 0; i < data.length; i++) {
        answers[i+1] = _getValue('input[name="question' + i + '"]');
    }

    return answers;
}

function _sendAnswers(answers) {

    const headers = new Headers();
    headers.append("x-user", localStorage.getItem('name'));
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

    // redirect
    window.location.href = 'index.html';
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
        <label class="list-group-item rounded-3 py-3 text-center" style="background-color:white; color: black;" for="question${index}Radios${option.code}">${option.description}</label>
        `
    }

    const questionContent = `
        <div style="font-weight: bold; color: antiquewhite !important;">${question.description}</div>
        <div class="p-4">
            <div class="list-group list-group-checkable gap-2 border-0 text-center" style="max-width: none; width: auto;">
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
