//registrar o carro no sistema, precisando de inputs de placa e descrição
//gerando um ticket com um id unico para cada carro, campos de horario de entrada e saida
//analisar a placa e prever de qual estado é o veiculo, temos três opções:
//Paraná, Rio grande do sul e Santa Catarina
//se o carro for de um estado diferente dos citados, ele será considerado como veiculo estrangeiro
//a placa deve ser analisada como letra, letra, letra, número, letra, número, número.
//depois de criar um objeto com as informações do carro, o carro será adicionado a um array de carros 
//e devera retornar para a pagina o body uma div representando o carro e mostrando suas informações
//o array de carros será salvo em um arquivo json
//o arquivo json será salvo em uma pasta chamada "veículosAtivos"
//Ao sair do sistema, o carro será removido do array de carros e do body e deverá ser
//contabilizado o tempo de permanencia do carro no estacionamento
//o tempo de permanencia será calculado a partir do horario de entrada e saida
//por fim o objeto do carro será removido do array de carros e salvo em um arquivo json
//o arquivo json será salvo em uma pasta chamada "veículosRemovidos"

const form = document.getElementById('registrarForm');
const placa = document.getElementById('placa');
const cor = document.getElementById('cor');
const historico = JSON.parse(localStorage.getItem('historicoSaida')) || [];
const veiculos = [];
const placas = {
    santaCatarina1: { inicio: 'LWR', fim: 'MMM' },
    santaCatarina2: { inicio: 'OKD', fim: 'OKH' },
    santaCatarina3: { inicio: 'QHA', fim: 'QJZ' },
    santaCatarina4: { inicio: 'QTK', fim: 'QTM' },
    santaCatarina5: { inicio: 'RAA', fim: 'RAJ' },
    santaCatarina6: { inicio: 'RDS', fim: 'REB' },
    santaCatarina7: { inicio: 'RKW', fim: 'RLP' },
    santaCatarina8: { inicio: 'RXK', fim: 'RYI' },
    parana1: { inicio: 'RHA', fim: 'RHZ' },
    parana2: { inicio: 'AAA', fim: 'BEZ' },
    rioGrandeDoSul: { inicio: 'IAQ', fim: 'JDO' },
}

//carregando localStorage
function renderizarVeiculo(veiculo) {
    const veiculoElement = document.createElement('div');
    veiculoElement.classList.add('veiculo');
    veiculoElement.innerHTML = `${veiculo.ticket} - ${veiculo.placa} - ${veiculo.horarioEntrada} - ${veiculo.estado}`;
    veiculoElement.style.backgroundColor = veiculo.cor;

    const botao = document.createElement('button');
    botao.textContent = 'Autorizar Saída';
    botao.addEventListener('click', () => autorizarSaida(veiculo.ticket));
    
    veiculoElement.appendChild(botao);
    document.getElementById('estacionamento').appendChild(veiculoElement);
}

window.addEventListener('DOMContentLoaded', () => {
    const dadosSalvos = JSON.parse(localStorage.getItem('veiculos')) || [];
    dadosSalvos.forEach(veiculo => {
        veiculos.push(veiculo);
        renderizarVeiculo(veiculo);
    });
    historico.forEach(veiculo => {
    adicionarAoHistorico(veiculo);
});
});

function verificarEstado(Letras) {
    if (Letras >= placas.santaCatarina1.inicio && Letras <= placas.santaCatarina1.fim) {
        return 'Santa Catarina';
    } else if (Letras >= placas.santaCatarina2.inicio && Letras <= placas.santaCatarina2.fim) {
        return 'Santa Catarina';
    } else if (Letras >= placas.santaCatarina3.inicio && Letras <= placas.santaCatarina3.fim) {
        return 'Santa Catarina';
    } else if (Letras >= placas.santaCatarina4.inicio && Letras <= placas.santaCatarina4.fim) {
        return 'Santa Catarina';
    } else if (Letras >= placas.santaCatarina5.inicio && Letras <= placas.santaCatarina5.fim) {
        return 'Santa Catarina';
    } else if (Letras >= placas.santaCatarina6.inicio && Letras <= placas.santaCatarina6.fim) {
        return 'Santa Catarina';
    } else if (Letras >= placas.santaCatarina7.inicio && Letras <= placas.santaCatarina7.fim) {
        return 'Santa Catarina';
    } else if (Letras >= placas.santaCatarina8.inicio && Letras <= placas.santaCatarina8.fim) {
        return 'Santa Catarina';
    } else if (Letras >= placas.parana1.inicio && Letras <= placas.parana1.fim) {
        return 'Paraná';
    } else if (Letras >= placas.parana2.inicio && Letras <= placas.parana2.fim) {
        return 'Paraná';
    } else if (Letras >= placas.rioGrandeDoSul.inicio && Letras <= placas.rioGrandeDoSul.fim) {
        return 'Rio Grande do Sul';
    } else {
        return 'Estrangeiro';
    }
}

function criarVeiculo() {
    const letras = placa.value.substring(0, 3).toUpperCase();
    return {
        ticket: Math.floor(Math.random() * 1000000),
        placa: placa.value.toUpperCase(),
        cor: cor.value,
        horarioEntrada: new Date().toLocaleTimeString(),
        autenticado: false,
        horarioSaida: '',
        tempoPermanencia: '',
        estado: verificarEstado(letras),
        valor: ''
    };
}

function registrarEntrada() {
    //criando o veiculo
    const veiculo = criarVeiculo();

    //adicionando o veiculo ao array de veiculos
    veiculos.push(veiculo);

    //criando o elemento veiculo
    renderizarVeiculo(veiculo);

    //salvando o veiculo no localStorage
    localStorage.setItem('veiculos', JSON.stringify(veiculos));

    //limpando os inputs e finalizando a função
    placa.value = '';
    cor.value = '';
    console.log(veiculos);
    alert('Carro registrado no sistema');
}

//criar janela
function calcularTempoPermanencia(veiculo) {
    const entrada = new Date(`1970-01-01T${veiculo.horarioEntrada}`);
    const saida = new Date(`1970-01-01T${veiculo.horarioSaida}`);
    const diff = (saida - entrada) / 60000; // em minutos
    return `${Math.floor(diff)} min`;
}

function calcularValor(veiculo) {
    // Exemplo: R$ 5,00 por hora
    const entrada = new Date(`1970-01-01T${veiculo.horarioEntrada}`);
    const saida = new Date(`1970-01-01T${veiculo.horarioSaida}`);
    const diffHoras = Math.ceil((saida - entrada) / (1000 * 60 * 60));
    return `R$ ${diffHoras * 5},00`;
}


function criarJanela(ticket) {
    const janela = document.createElement('div');
    janela.classList.add('janela-overlay'); // fundo escuro

    const conteudo = document.createElement('div');
    conteudo.classList.add('janela-conteudo'); // caixa no centro

    conteudo.innerHTML = `
        <h2>Autenticar Ticket</h2>
        <p>Tem certeza que deseja autenticar o ticket de saída?</p>
        <input type="text" id="ticket" placeholder="Ticket do veiculo" value="${ticket}">
        <button id="confirmar">Confirmar</button>
        <button id="cancelar">Cancelar</button>
    `;

    janela.appendChild(conteudo);

    const botaoConfirmar = conteudo.querySelector('#confirmar');
    const botaoCancelar = conteudo.querySelector('#cancelar');
    const ticketInput = conteudo.querySelector('#ticket');

    botaoConfirmar.addEventListener('click', () => {
    const ticketDigitado = ticketInput.value;
    const veiculoIndex = veiculos.findIndex(v => v.ticket === parseInt(ticketDigitado));
    const veiculo = veiculos[veiculoIndex];
    
    if (veiculo) {
        veiculo.autenticado = true;
        veiculo.horarioSaida = new Date().toLocaleTimeString();
        veiculo.tempoPermanencia = calcularTempoPermanencia(veiculo);
        veiculo.valor = calcularValor(veiculo);

        // Remover da visualização do estacionamento
        const estacionamento = document.getElementById('estacionamento');
        const veiculosDivs = estacionamento.querySelectorAll('.veiculo');
        veiculosDivs.forEach(div => {
            if (div.textContent.includes(veiculo.ticket.toString())) {
                div.remove();
            }
        });

        // Adicionar ao histórico
        adicionarAoHistorico(veiculo);

        // Remover do array
        veiculos.splice(veiculoIndex, 1);

        // Atualizar localStorage
        localStorage.setItem('veiculos', JSON.stringify(veiculos));

        janela.remove();
        alert('Ticket autenticado com sucesso!');
    } else {
        alert('Ticket não encontrado!');
    }
});

    botaoCancelar.addEventListener('click', () => {
        janela.remove();
    });

    document.body.appendChild(janela);
}


function autorizarSaida(ticket) {
    criarJanela(ticket);
}

function adicionarAoHistorico(veiculo) {
    // Adiciona ao array global
    historico.push(veiculo);

    // Atualiza localStorage
    localStorage.setItem('historicoSaida', JSON.stringify(historico));

    // Renderiza na tela
    const historicoContainer = document.getElementById('historicoSaida');
    const item = document.createElement('div');
    item.classList.add('historico-item');
    item.innerHTML = `
        <p><strong>Ticket:</strong> ${veiculo.ticket}</p>
        <p><strong>Placa:</strong> ${veiculo.placa}</p>
        <p><strong>Estado:</strong> ${veiculo.estado}</p>
        <p><strong>Horário de Entrada:</strong> ${veiculo.horarioEntrada}</p>
        <p><strong>Horário de Saída:</strong> ${veiculo.horarioSaida}</p>
        <p><strong>Tempo de Permanência:</strong> ${veiculo.tempoPermanencia}</p>
        <p><strong>Valor Pago:</strong> ${veiculo.valor}</p>
    `;
    item.style.border = '1px solid #ccc';
    item.style.padding = '10px';
    item.style.margin = '10px';
    item.style.backgroundColor = '#f4f4f4';

    historicoContainer.appendChild(item);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    registrarEntrada();
});

