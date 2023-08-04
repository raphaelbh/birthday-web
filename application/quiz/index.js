main();

function main() {

  const table = document.getElementById("rank-table");
  table.style.display = "none";

  // load rank
  const url = "https://birthday-api-y1wf.onrender.com/rank";
  fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json(); 
  }).then(data => {
      _loadItems(data);
  }).catch(error => {
    console.error("Erro:", error);
  });

  // block if sent
  const quizSent = localStorage.getItem('quiz_sent');
  if (quizSent) {
      quizButton.style.display = 'none';
  }

  // events
  const quizButton = document.getElementById('quiz-button');
  quizButton.onclick = function quiz() {
      window.location.href = 'quiz.html';
  }

}

function _loadItems(data) {

  const spinner = document.getElementById("spinner");
  const table = document.getElementById("rank-table");
  const tbody = table.querySelector("tbody");

  for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const row = `
        <tr>
          <th scope="row">${item.position}</th>
          <td>${item.user}</td>
          <td style="text-align: center;">${item.score}</td>
        </tr>`;
      tbody.innerHTML += row;
  }

  spinner.style.display = "none";
  table.style.display = "block";
}
