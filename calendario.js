document.addEventListener("DOMContentLoaded", function() {
    const mesAtualElement = document.getElementById('mesAtual');
    const botaoMesAnterior = document.getElementById('mesAnterior');
    const botaoProximoMes = document.getElementById('proxMes');

    let mes = localStorage.getItem('mes') || new Date().getMonth() + 1; // Mês atual (1-12)
    let ano = localStorage.getItem('ano') || new Date().getFullYear(); // Ano atual

    const nomeMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    // Função para exibir o mês atual
    function exibirMesAtual() {
        mesAtualElement.textContent = `${nomeMeses[mes - 1]} ${ano}`;
    }

    // Função para atualizar o calendário com os dias do mês atual
    function atualizarCalendario() {
        const diasNoMes = new Date(ano, mes, 0).getDate(); // Número de dias no mês
        const primeiraSemana = new Date(ano, mes - 1, 1).getDay(); // Dia da semana do primeiro dia do mês (0-6, onde 0 é domingo)

        const tbody = document.querySelector('#calendario tbody');
        tbody.innerHTML = ''; // Limpa o conteúdo atual do tbody

        let dia = 1;

        // Loop para criar as linhas e colunas do calendário
        for (let i = 0; i < 6; i++) {
            const tr = document.createElement('tr');

            // Loop para criar as células de cada linha
            for (let j = 0; j < 7; j++) {
                const td = document.createElement('td');

                if (i === 0 && j < primeiraSemana) {
                    // Células vazias antes do primeiro dia do mês
                    td.textContent = '';
                } else if (dia > diasNoMes) {
                    // Células vazias após o último dia do mês
                    td.textContent = '';
                } else {
                    // Células com os dias do mês
                    td.textContent = dia;
                    td.dataset.dia = dia; // Adiciona o atributo 'dia' para identificar o dia
                    dia++;
                }

                // Adiciona evento de clique para selecionar o dia
                td.addEventListener('click', function() {
                    const diaSelecionado = this.dataset.dia;
                    localStorage.setItem('dia', diaSelecionado);
                    window.location.href = `pagina_eventos.html`;
                });

                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }
    }

    // Função para navegar para o mês anterior
    function mesAnterior() {
        if (mes === 1) {
            mes = 12;
            ano--;
        } else {
            mes--;
        }
        localStorage.setItem('mes', mes);
        localStorage.setItem('ano', ano);
        exibirMesAtual();
        atualizarCalendario();
    }

    // Função para navegar para o próximo mês
    function proximoMes() {
        if (mes === 12) {
            mes = 1;
            ano++;
        } else {
            mes++;
        }
        localStorage.setItem('mes', mes);
        localStorage.setItem('ano', ano);
        exibirMesAtual();
        atualizarCalendario();
    }

    // Adiciona event listeners para os botões de navegação
    botaoMesAnterior.addEventListener('click', mesAnterior);
    botaoProximoMes.addEventListener('click', proximoMes)

    // Chamada inicial para exibir o mês atual e atualizar o calendário
    exibirMesAtual();
    atualizarCalendario();
});
