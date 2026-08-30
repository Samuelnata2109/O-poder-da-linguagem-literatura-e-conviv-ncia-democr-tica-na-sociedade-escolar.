let arquivoIndexParaDeletar = null;

// Carrega os arquivos salvos ao abrir a página de arquivos
window.addEventListener('DOMContentLoaded', () => {
    carregarArquivos();
});

// Função que desenha a lista na tela
function carregarArquivos() {
    const listElement = document.getElementById('savedFilesList');
    const storedFiles = JSON.parse(localStorage.getItem('importedFiles')) || [];

    listElement.innerHTML = '';

    if (storedFiles.length === 0) {
        listElement.innerHTML = '<li class="no-files">Nenhum arquivo importado ainda.</li>';
    } else {
        storedFiles.forEach((fileObj, index) => {
            const nomeArquivo = (fileObj && typeof fileObj === 'object' && fileObj.nome) ? fileObj.nome : 'Arquivo sem nome';

            const li = document.createElement('li');
            li.className = 'file-item';
            
            li.innerHTML = `
                <span class="file-name" onclick="abrirArquivo(${index})" title="Clique para abrir ou baixar o arquivo">
                    <i class="fa-solid fa-file-lines"></i> ${nomeArquivo}
                </span>
                <button onclick="abrirModal(${index})" class="btn-delete" title="Excluir arquivo">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            listElement.appendChild(li);
        });
    }
}

// Função universal para abrir qualquer tipo de arquivo
function abrirArquivo(index) {
    const storedFiles = JSON.parse(localStorage.getItem('importedFiles')) || [];
    const fileObj = storedFiles[index];

    if (fileObj && fileObj.url) {
        const extensao = fileObj.nome.split('.').pop().toLowerCase();
        const tiposVisualizaveis = ['pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'txt', 'html', 'mp4', 'mp3'];

        if (tiposVisualizaveis.includes(extensao)) {
            const novaAba = window.open();
            if (novaAba) {
                novaAba.document.write(`
                    <html>
                        <head><title>${fileObj.nome}</title></head>
                        <body style="margin:0; background:#f4f4f4; display:flex; justify-content:center; align-items:center; height:100vh;">
                            <iframe src="${fileObj.url}" style="width:100%; height:100%; border:none;"></iframe>
                        </body>
                    </html>
                `);
            } else {
                alert('O navegador bloqueou a abertura da aba. Permita os pop-ups para este site.');
            }
        } else {
            const linkDownload = document.createElement('a');
            linkDownload.href = fileObj.url;
            linkDownload.download = fileObj.nome;
            document.body.appendChild(linkDownload);
            linkDownload.click();
            document.body.removeChild(linkDownload);
        }
    } else {
        alert('O conteúdo deste arquivo não pôde ser carregado. Tente excluí-lo e enviá-lo novamente.');
    }
}

// Funções do Modal de Exclusão
function abrirModal(index) {
    arquivoIndexParaDeletar = index;
    document.getElementById('modal-remover').style.display = 'flex';
}

function fecharModal() {
    arquivoIndexParaDeletar = null;
    document.getElementById('modal-remover').style.display = 'none';
}

function confirmarRemocao() {
    if (arquivoIndexParaDeletar !== null) {
        let storedFiles = JSON.parse(localStorage.getItem('importedFiles')) || [];
        storedFiles.splice(arquivoIndexParaDeletar, 1);
        localStorage.setItem('importedFiles', JSON.stringify(storedFiles));
        carregarArquivos();
    }
    fecharModal();
}