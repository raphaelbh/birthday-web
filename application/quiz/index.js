const quizButton = document.getElementById('quiz-button');

quizButton.onclick = function quiz() {
    window.location.href = 'quiz.html';
}

const quizSent = localStorage.getItem('quiz_sent');
if (quizSent) {
    quizButton.style.display = 'none';
}
