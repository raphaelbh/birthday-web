const quizSent = localStorage.getItem('quiz_sent');
if (quizSent) {
    window.location.href = 'index.html';
}

const sendButton = document.getElementById('send');
sendButton.onclick = send;

function send() {
    const totalQuestions = 2;
    const questions = {};
    for (let i = 0; i < totalQuestions; i++) {
        questions[i] = getValue('input[name="question' + i + '"]');
    }

    // send answers
    console.log(questions);

    // set send flag
    localStorage.setItem('quiz_sent', true);

    // hide questions section
    const questionsSection = document.getElementById('questions-section');
    questionsSection.style.display = 'none';

    // show message
    const quizMessage = document.getElementById('quiz-message');
    quizMessage.style.display = 'block';
}


function getValue(selector) {
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

const questionsSection = document.getElementById("questions");

function addQuestion(index, question) {

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
    questionsSection.innerHTML += questionContent;
}

fetch("https://birthday-api-y1wf.onrender.com/questions")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json(); 
  })
  .then(data => {
    for (let i = 0; i < data.length; i++) {
        addQuestion(i, data[i]);
    }
  })
  .catch(error => {
    console.error("Erro:", error);
  });
