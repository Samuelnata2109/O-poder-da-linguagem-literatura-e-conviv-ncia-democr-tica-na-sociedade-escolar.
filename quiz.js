const gabarito = {
    1: "A", 2: "A", 3: "B", 4: "C", 5: "B",
    6: "A", 7: "A", 8: "C", 9: "B", 10: "A",
    11: "A", 12: "A", 13: "B", 14: "C", 15: "B",
    16: "C", 17: "B", 18: "B", 19: "A", 20: "C"
};

function verificarRespostas() {
    let acertos = 0;

    for (let i = 1; i <= 20; i++) {
        const selecionada = document.querySelector(`input[name="q${i}"]:checked`);
        const correta = gabarito[i];

        // Limpa estilos anteriores de todas as opções desta questão
        ['A', 'B', 'C', 'D'].forEach(letra => {
            const lbl = document.getElementById(`label-${i}-${letra}`);
            if (lbl) lbl.classList.remove('correct', 'incorrect');
        });

        if (selecionada) {
            const letraSelecionada = selecionada.value;
            const lblSelecionada = document.getElementById(`label-${i}-${letraSelecionada}`);

            if (letraSelecionada === correta) {
                acertos++;
                if (lblSelecionada) lblSelecionada.classList.add('correct');
            } else {
                if (lblSelecionada) lblSelecionada.classList.add('incorrect');
                const lblCorreta = document.getElementById(`label-${i}-${correta}`);
                if (lblCorreta) lblCorreta.classList.add('correct');
            }
        } else {
            const lblCorreta = document.getElementById(`label-${i}-${correta}`);
            if (lblCorreta) lblCorreta.classList.add('correct');
        }
    }

    const resultadoDiv = document.getElementById('result-container');
    resultadoDiv.innerHTML = `Você acertou ${acertos} de 20 questões!`;
}