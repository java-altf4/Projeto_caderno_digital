const apiKey = 'AIzaSyBby7SFUPRJErUASTqkBP-1RL-Fl7-EU7c'; // Sua chave API

document.getElementById('addNoteButton').addEventListener('click', function() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText) {
        const notesContainer = document.getElementById('notesContainer');
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.textContent = noteText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = function() {
            notesContainer.removeChild(noteDiv);
        };

        noteDiv.appendChild(deleteButton);
        notesContainer.appendChild(noteDiv);
        noteInput.value = ''; // Limpa o campo de entrada
    } else {
        alert('Por favor, escreva uma nota antes de adicionar.');
    }
});

// Função para ler arquivos
document.getElementById('readFileButton').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        document.getElementById('noteInput').value = content; // Adiciona o conteúdo ao campo de texto
    };

    if (file) {
        reader.readAsText(file);
    }
});

// Função para traduzir texto
document.getElementById('translateButton').addEventListener('click', function() {
    const noteInput = document.getElementById('noteInput');
    const textToTranslate = noteInput.value.trim();

    if (textToTranslate) {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: textToTranslate,
                target: 'pt' // Alvo da tradução
            })
        })
        .then(response => response.json())
        .then(data => {
            noteInput.value = data.data.translations[0].translatedText; // Atualiza o campo de texto com a tradução
        })
        .catch(error => {
            console.error('Erro ao traduzir:', error);
        });
    } else {
        alert('Por favor, escreva uma nota para traduzir.');
    }
});

// Função para resumir texto (exemplo fictício)
document.getElementById('summarizeButton').addEventListener('click', function() {
    const noteInput = document.getElementById('noteInput');
    const textToSummarize = noteInput.value.trim();

    if (textToSummarize) {
        // Aqui você deve integrar uma API de resumo, como OpenAI ou outra
        const summarizedText = `Resumo: ${textToSummarize.substring(0, 50)}...`; // Substitua pela chamada da API
        noteInput.value = summarizedText;
    } else {
        alert('Por favor, escreva uma nota para resumir.');
    }
});

// Função para tirar foto
document.getElementById('takePhotoButton').addEventListener('click', function() {
    navigator.mediaDevices.getUser Media({ video: true })
        .then(function(stream) {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Captura a imagem após 1 segundo
            setTimeout(function() {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = canvas.toDataURL('image/png');
                const img = document.createElement('img');
                img.src = imageData;
                const notesContainer = document.getElementById('notesContainer');
                const noteDiv = document.createElement('div');
                noteDiv.className = 'note';
                noteDiv.appendChild(img);
                notesContainer.appendChild(noteDiv);
                stream.getTracks().forEach(track => track.stop()); // Para a captura
            }, 1000);
        })
        .catch(function(err) {
            console.error("Erro ao acessar a câmera: ", err);
        });
});
