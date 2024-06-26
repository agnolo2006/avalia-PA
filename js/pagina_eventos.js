document.addEventListener("DOMContentLoaded", () => {
    const adicionarEventoBtn = document.getElementById('adicionarEvento');
    const eventoForm = document.getElementById('evento-form');
    const eventosLista = document.getElementById('eventos-lista');

    adicionarEventoBtn.addEventListener('click', () => {
        const titulo = document.getElementById('titulo').value;
        const detalhes = document.getElementById('detalhes').value;

        // Verifica se os campos estão preenchidos
        if (titulo.trim() !== '' && detalhes.trim() !== '') {
            const ano = localStorage.getItem('ano');
            const mes = localStorage.getItem('mes');
            const dia = localStorage.getItem('dia');

            // Verifica se ano, mês e dia estão presentes no Local Storage
            if (ano && mes && dia) {
                const evento = { titulo, detalhes };
                const eventos = JSON.parse(localStorage.getItem(`eventos_${ano}_${mes}_${dia}`)) || [];
                eventos.push(evento);
                localStorage.setItem(`eventos_${ano}_${mes}_${dia}`, JSON.stringify(eventos));
                atualizarListaEventos();
                eventoForm.reset();
                alert('Evento adicionado com sucesso!');
            } else {
                alert('Erro ao adicionar evento. Parâmetros inválidos.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    const atualizarListaEventos = () => {
        eventosLista.innerHTML = '';
        const ano = localStorage.getItem('ano');
        const mes = localStorage.getItem('mes');
        const dia = localStorage.getItem('dia');

        if (ano && mes && dia) {
            const eventos = JSON.parse(localStorage.getItem(`eventos_${ano}_${mes}_${dia}`)) || [];

            eventos.forEach((evento, indice) => {
                const eventoElement = document.createElement('div');
                eventoElement.classList.add('evento');
                eventoElement.innerHTML = `
                    <h3>${evento.titulo}</h3>
                    <p>${evento.detalhes}</p>
                    <button class="editar-evento animated-button" data-indice="${indice}"><span>Editar</span><span></span></button>
                    <button class="remover-evento animated-button" data-indice="${indice}"><span>Remover</span><span></span></button>
                `;
                eventosLista.appendChild(eventoElement);
            });

            // Adiciona ouvintes de evento para os botões de edição
            const botoesEditar = document.querySelectorAll('.editar-evento');
            botoesEditar.forEach(botao => {
                botao.addEventListener('click', () => {
                    const indice = botao.getAttribute('data-indice');
                    editarEvento(indice);
                });
            });

            // Adiciona ouvintes de evento para os botões de exclusão
            const botoesRemover = document.querySelectorAll('.remover-evento');
            botoesRemover.forEach(botao => {
                botao.addEventListener('click', () => {
                    const indice = botao.getAttribute('data-indice');
                    removerEvento(indice);
                });
            });
        }
    };

    const editarEvento = (indice) => {
        const ano = localStorage.getItem('ano');
        const mes = localStorage.getItem('mes');
        const dia = localStorage.getItem('dia');
        let eventos = JSON.parse(localStorage.getItem(`eventos_${ano}_${mes}_${dia}`)) || [];
        const evento = eventos[indice];

        // Preencher o formulário de evento com os detalhes do evento selecionado para edição
        document.getElementById('titulo').value = evento.titulo;
        document.getElementById('detalhes').value = evento.detalhes;

        // Remover o evento antigo da lista
        eventos.splice(indice, 1);
        localStorage.setItem(`eventos_${ano}_${mes}_${dia}`, JSON.stringify(eventos));

        // Atualizar a lista de eventos
        atualizarListaEventos();
    };

    const removerEvento = (indice) => {
        const ano = localStorage.getItem('ano');
        const mes = localStorage.getItem('mes');
        const dia = localStorage.getItem('dia');
        let eventos = JSON.parse(localStorage.getItem(`eventos_${ano}_${mes}_${dia}`)) || [];
        eventos.splice(indice, 1);
        localStorage.setItem(`eventos_${ano}_${mes}_${dia}`, JSON.stringify(eventos));
        atualizarListaEventos();
    };

    atualizarListaEventos();
});
