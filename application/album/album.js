// theme
localStorage.removeItem("theme");



const imagesInput = document.getElementById('images-input');
const uploadButton = document.getElementById('upload-button');


uploadButton.addEventListener('click', async () => {
    
    const formData = new FormData();
    for (const file of imagesInput.files) {
        formData.append('images[]', file);
    }

    try {
        const url = "https://birthday-api-y1wf.onrender.com/photos";
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            //statusMessage.textContent = 'Imagens enviadas com sucesso!';
            //statusMessage.style.color = 'green';
            window.location.href = 'index.html';
        } else {
            //statusMessage.textContent = 'Erro ao enviar imagens.';
            //statusMessage.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        //statusMessage.textContent = 'Erro ao enviar imagens.';
        //statusMessage.style.color = 'red';
    }
});



const photosSection = document.getElementById("photos-section");

function _addItem(image) {

    const item = `
        <div class="col">
            <div class="card shadow-sm">
            <img src="https://bailedajack.s3.us-east-2.amazonaws.com/${image}" />
            </div>
        </div>
    `;
    photosSection.innerHTML += item;

}



const url = "https://birthday-api-y1wf.onrender.com/photos";
fetch(url).then(response => {
    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
    }
  return response.json(); 
}).then(data => {
    for (let i = 0; i < data.length; i++) {
         _addItem(data[i])
    }
}).catch(error => {
    console.error("Erro:", error);
});

