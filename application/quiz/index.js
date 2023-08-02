const quizButton = document.getElementById('quiz-button');

quizButton.onclick = function quiz() {
    window.location.href = 'quiz.html';
}

const quizSent = localStorage.getItem('quiz_sent');
if (quizSent) {
    quizButton.style.display = 'none';
}

const table = document.getElementById("rank-table");
const tbody = table.querySelector("tbody");

function addItem(position, name, score) {
    const row = `<tr><th scope="row">${position}</th><td>${name}</td><td>${score}</td></tr>`;
    tbody.innerHTML += row;
}

fetch("https://birthday-api-y1wf.onrender.com/rank")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json(); 
  })
  .then(data => {
    //console.log(data);
    for (let i = 0; i < data.length; i++) {
        addItem(data[i].position, data[i].user, data[i].score)
    }
  })
  .catch(error => {
    console.error("Erro:", error);
  });
