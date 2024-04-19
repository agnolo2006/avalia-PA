document.addEventListener("DOMContentLoaded", () => {
    const mesAtualElement = document.getElementById('mesAtual');
    const botaoMesAnterior = document.getElementById('mesAnterior');
    const botaoProximoMes = document.getElementById('proxMes');
    const eventosLista = document.getElementById('eventos-lista');
    const anoSelect = document.getElementById('anoSelect');
    let [mes, ano] = [parseInt(localStorage.getItem('mes')) || new Date().getMonth() + 1, parseInt(localStorage.getItem('ano')) || new Date().getFullYear()];
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
                        exibirEventoDoDia(td.dataset.dia);
                    });
                    dia++;
                }
                
           
                tr.appendChild(td);
            }
            
            tbody.appendChild(tr);
        }
    };

    const exibirEventoDoDia = (dia) => {
        localStorage.setItem('dia', dia);
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
        localStorage.setItem('mes', mes);
        localStorage.setItem('ano', ano);
        exibirMesAtual();
        preencherCalendario();
    };

    botaoMesAnterior.addEventListener('click', () => alterarMes(-1));
    botaoProximoMes.addEventListener('click', () => alterarMes(1));

    const preencherSelectAno = () => {
        const anoAtual = new Date().getFullYear();
        for (let i = anoAtual - 10; i <= anoAtual + 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            anoSelect.appendChild(option);
        }
        anoSelect.value = ano;
        anoSelect.addEventListener('change', () => {
            ano = parseInt(anoSelect.value);
            localStorage.setItem('ano', ano);
            preencherCalendario();
        });
    };

    function pintarFundo(){
        let dia = localStorage.getItem("dia");
        g = document.querySelectorAll('td')
   
        dd = (g[dia])
        
        console.log(dd)
         
    }

    preencherSelectAno();
    exibirMesAtual();
    preencherCalendario();
    pintarFundo()
});
