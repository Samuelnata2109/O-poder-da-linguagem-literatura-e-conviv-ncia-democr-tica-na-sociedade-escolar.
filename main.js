document.addEventListener('DOMContentLoaded', () => {
    const btnAddFile = document.getElementById('btnAddFile');
    const fileInput = document.getElementById('fileInput');
  
    // Faz o botão "Novo Arquivo" abrir a janela de seleção
    if (btnAddFile && fileInput) {
        btnAddFile.addEventListener('click', () => {
            fileInput.click();
        });

        // Escuta quando um arquivo é selecionado no index.html
        fileInput.addEventListener('change', function(event) {
            const arquivo = event.target.files[0];
            if (!arquivo) return;

            const leitor = new FileReader();
            
            leitor.onload = function(e) {
                const dadosArquivo = {
                    nome: arquivo.name,
                    url: e.target.result 
                };

                let storedFiles = JSON.parse(localStorage.getItem('importedFiles')) || [];
                storedFiles.push(dadosArquivo);
                
                try {
                    localStorage.setItem('importedFiles', JSON.stringify(storedFiles));
                    alert('Arquivo salvo com sucesso! Vá em "Ver Arquivos" para visualizá-lo.');
                } catch (error) {
                    alert('Erro ao salvar o arquivo. O armazenamento do navegador pode estar cheio.');
                }
                
                fileInput.value = ''; 
            };

            leitor.onerror = function() {
                alert('Erro ao ler o arquivo selecionado.');
            };

            leitor.readAsDataURL(arquivo);
        });
    }
});