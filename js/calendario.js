document.addEventListener("DOMContentLoaded", () => {
    const mesAtualElement = document.getElementById('mesAtual');
    const botaoMesAnterior = document.getElementById('mesAnterior');
    const botaoProximoMes = document.getElementById('proxMes');
    const eventosLista = document.getElementById('eventos-lista');
    const anoSelect = document.getElementById('anoSelect');
    const ano = 2024; // Definindo o ano como 2024
    let mes = parseInt(localStorage.getItem('mes')) || new Date().getMonth() + 1;
    let diaSelecionado = parseInt(localStorage.getItem('dia')) || new Date().getDate();
    const nomeMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const exibirMesAtual = () => mesAtualElement.textContent = `${nomeMeses[mes - 1]} ${ano}`;

    const obterNumeroDiasNoMes = (mes, ano) => {
        return new Date(ano, mes, 0).getDate();
    };

    const preencherCalendario = () => {
        const numeroDias = obterNumeroDiasNoMes(mes, ano);
        const primeiraSemana = new Date(ano, mes - 1, 1).getDay();
        const tbody = document.querySelector('#calendario tbody');
        tbody.innerHTML = '';

        let dia = 1;

        for (let i = 0; dia <= numeroDias; i++) {
            const tr = document.createElement('tr');
            
            // Preenche cada célula da linha com os dias do mês
            for (let j = 0; j < 7; j++) {
                const td = document.createElement('td');
                
                if (i === 0 && j < primeiraSemana) {
                    // Células vazias antes do primeiro dia do mês
                    td.textContent = '';
                } else if (dia > numeroDias) {
                    // Células vazias após o último dia do mês
                    td.textContent = '';
                } else {
                    // Células com os dias do mês
                    td.textContent = dia;
                    td.dataset.dia = dia;
                    td.addEventListener('click', () => {
                        diaSelecionado = parseInt(td.dataset.dia);
                        localStorage.setItem('dia', diaSelecionado);
                        exibirEventoDoDia(diaSelecionado);
                    });
                    dia++;
                }
                
           
                tr.appendChild(td);
            }
            
            tbody.appendChild(tr);
        }
    };

    const exibirEventoDoDia = (dia) => {
        // Adiciona um evento fictício no localStorage para o dia selecionado
        const eventos = JSON.parse(localStorage.getItem("eventos")) || {};
        eventos[dia] = true;
        localStorage.setItem('eventos', JSON.stringify(eventos));

        // Verifica se o evento foi adicionado ao dia
        if (eventos[dia]) {
            const td = document.querySelector(`td[data-dia="${dia}"]`);
            td.classList.add('evento-dia');
        }

        window.location.href = `pagina_eventos.html?ano=${ano}&mes=${mes}&dia=${dia}`;
    };

    const alterarMes = (delta) => {
        mes += delta;
        if (mes < 1) {
            mes = 12;
            ano--;
        } else if (mes > 12) {
            mes = 1;
            ano++;
        }
        localStorage.setItem('mes', mes); // Atualiza o mês no localStorage
        exibirMesAtual();
        preencherCalendario();
    };

    botaoMesAnterior.addEventListener('click', () => alterarMes(-1));
    botaoProximoMes.addEventListener('click', () => alterarMes(1));

    const atualizarListaEventos = () => {
       const dia = localStorage.getItem('dia');
        const eventos = JSON.parse(localStorage.getItem(`eventos_${ano}_${mes}_${dia}`)) || [];

        eventos.forEach((evento, indice) => {
            const eventoElement = document.createElement('div');
            eventoElement.classList.add('evento');
            eventoElement.innerHTML = `
                <h3>${evento.titulo}</h3>
                <p>${evento.detalhes}</p>
                <button class="remover-evento" data-indice="${indice}">Remover</button>
            `;
            eventosLista.appendChild(eventoElement);
        });

        // Adiciona ouvintes de evento para os botões de exclusão
        const botoesRemover = document.querySelectorAll('.remover-evento');
        botoesRemover.forEach(botao => {
            botao.addEventListener('click', () => {
                const indice = botao.getAttribute('data-indice');
                removerEvento(indice);
            });
        });
    };

    const removerEvento = (indice) => {
        let eventos = JSON.parse(localStorage.getItem(`eventos_${ano}_${mes}_${diaSelecionado}`)) || [];
        eventos.splice(indice, 1);
        localStorage.setItem(`eventos_${ano}_${mes}_${diaSelecionado}`, JSON.stringify(eventos));
        atualizarListaEventos();
    };

    // Exibe o dia selecionado no console
    console.log('Dia selecionado:', diaSelecionado);

    exibirMesAtual();
    preencherCalendario();
    atualizarListaEventos();
});
