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
    const questionsSection = document.getElementById('questions');
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
