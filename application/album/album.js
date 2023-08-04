// theme
localStorage.removeItem("theme");


const spinner = document.getElementById('spinner');


const imagesInput = document.getElementById('images-input');
const uploadButton = document.getElementById('upload-button');

uploadButton.addEventListener('click', async () => {

    if (imagesInput.files.length === 0) {
        _showError("Informe ao menos uma imagem");
        return;
    }

    if (imagesInput.files.length > 10) {
        _showError("Informe no máximo 10 imagens");
        return;
    }


    const formData = new FormData();
    for (const file of imagesInput.files) {

        const isImage = await _isFileAnImage(file);
        if (!isImage) {
            _showError(`${file.name} não é uma imagem`);
            return;
        }

        formData.append('images[]', file);
    }

    try {
        spinner.style.display = 'block';

        const headers = new Headers();
        headers.append("x-user", localStorage.getItem('name'));
        headers.append("Content-Type", "application/json");

        const url = "https://birthday-api-y1wf.onrender.com/photos";
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: formData,
        });

        spinner.style.display = 'none';
        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            console.error('Erro ao fazer upload:', error);
            _showError(`Erro ao enviar imagem`);
            return;
        }
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        _showError(`Erro ao enviar imagem`);
        return;
    }
});


function _showError(message) {
    spinner.style.display = 'none';
    
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = message;

    const errorSection = document.getElementById('error-section');
    errorSection.style.display = "block";
}


const photosSection = document.getElementById("photos-section");

function _addItem(photo) {

    const item = `
        <div class="col">
            <div class="card shadow-sm">
            <img src="https://bailedajack.s3.us-east-2.amazonaws.com/${photo.image}" />
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


async function _isFileAnImage(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const img = new Image();
            
            img.onload = () => {
                resolve(true);
            };
            
            img.onerror = () => {
                resolve(false);
            };
            
            img.src = event.target.result;
        };
        
        reader.readAsDataURL(file);
    });
}
