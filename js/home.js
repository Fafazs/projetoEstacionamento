//função Home.js
const form = document.getElementById('registrarForm');
const placa = document.getElementById('placa');
const cor = document.getElementById('cor');
const estacionamento = document.getElementById('estacionamento');
const tipoVeiculo = document.getElementById('veiculos');
const historico = JSON.parse(localStorage.getItem('historicoSaida')) || [];
const veiculos = [];
const placas = {
    santaCatarina: [
        { inicio: 'LWR', fim: 'MMM' },
        { inicio: 'OKD', fim: 'OKH' },
        { inicio: 'QHA', fim: 'QJZ' },
        { inicio: 'QTK', fim: 'QTM' },
        { inicio: 'RAA', fim: 'RAJ' },
        { inicio: 'RDS', fim: 'REB' },
        { inicio: 'RKW', fim: 'RLP' },
        { inicio: 'RXK', fim: 'RYI' },
    ],
    parana: [
        { inicio: 'RHA', fim: 'RHZ' },
        { inicio: 'AAA', fim: 'BEZ' },
    ],
    rioGrandeDoSul: [
        { inicio: 'IAQ', fim: 'JDO' },
    ]
}

window.addEventListener('DOMContentLoaded', () => {
    const dadosSalvos = JSON.parse(localStorage.getItem('veiculos')) || [];

    // Carrega os veículos salvos no array principal
    dadosSalvos.forEach(veiculo => {
        veiculos.push(veiculo);
    });

    // Renderiza toda a matriz do estacionamento com os veículos carregados
    renderizarEstacionamento();

    // Renderiza o histórico salvo
    renderizarHistorico(historico)
});

function criarIcone(tipo) {
    const img = document.createElement('img');
    img.classList.add('icone');

    if (tipo === 'carro') {
        img.src = '../data/carro.png';
    } else if (tipo === 'moto') {
        img.src = '../data/motocicleta.png';
    } else if (tipo === 'caminhao') {
        img.src = '../data/caminhao.png';
    } else {
        img.alt = 'Ícone não encontrado';
    }

    return img;
}

function renderizarEstacionamento() {
    estacionamento.innerHTML = ''; // limpa o conteúdo antes de renderizar
    const h2 = document.createElement('h2');
    h2.textContent = 'Estacionamento';
    h2.style.textAlign = 'center';
    estacionamento.appendChild(h2);
    let indexVeiculo = 0;

    for (let i = 0; i < 5; i++) {
        const linha = document.createElement('div');
        linha.classList.add('linha');
        linha.setAttribute('id', `linha${i}`);

        for (let j = 0; j < 5; j++) {
            const vaga = document.createElement('div');
            vaga.classList.add('vaga');
            vaga.setAttribute('id', `vaga${i}${j}`);

            // Se ainda há veículos para renderizar
            const veiculo = veiculos[indexVeiculo];
            if (veiculo) {
                veiculo.vagaID = `vaga${i}${j}`;
                renderizarVeiculo(vaga, veiculo);
                indexVeiculo++;
            }

            linha.appendChild(vaga);
        }

        estacionamento.appendChild(linha);
    }
}

function verVeiculo(veiculo) {
    const objeto = document.createElement('div');
    objeto.classList.add('janela-overlay'); // fundo escuro
    objeto.style.display = 'flex';
    objeto.style.flexDirection = 'column';
    objeto.style.gap = '10px';

    const conteudos = document.createElement('div');
    conteudos.classList.add('janela-conteudo');

    // caixa no centro

    conteudos.innerHTML = `
        Ticket: ${veiculo.ticket}<br>
        Placa: ${veiculo.placa}<br>
        Tipo: ${veiculo.tipo}<br>
        Estado: ${veiculo.estado}<br>
        hora de entrada: ${veiculo.horarioEntrada}<br>
        <br>
        ${veiculo.vagaID.toUpperCase()}
    `;

    // botão de confirmar
    const botaoConfirmar = document.createElement('button');
    botaoConfirmar.textContent = 'Autorizar Saída';
    botaoConfirmar.addEventListener('click', () => criarJanela(veiculo.ticket));

    // botão de cancelar
    const botaoCancelar = document.createElement('button');
    botaoCancelar.textContent = 'Cancelar';
    botaoCancelar.addEventListener('click', () => {
        objeto.style.display = 'none';
    });

    objeto.appendChild(conteudos);
    objeto.appendChild(botaoConfirmar);
    objeto.appendChild(botaoCancelar);
    estacionamento.appendChild(objeto);

    if (veiculo.autenticado == true) {
        botaoConfirmar.style.display = 'none';
    }

}

function renderizarVeiculo(vaga, veiculo) {

    const veiculoElement = document.createElement('div');
    veiculoElement.classList.add('veiculo');
    veiculoElement.style.borderColor = veiculo.cor;

    const icone = criarIcone(veiculo.tipo);
    const texto = document.createElement('span');
    texto.innerHTML = `${veiculo.placa} <br> ${veiculo.vagaID.toUpperCase()}`;
    veiculoElement.onclick = () => verVeiculo(veiculo);

    veiculoElement.appendChild(icone);
    veiculoElement.appendChild(texto);
    vaga.appendChild(veiculoElement);
}

function verificarEstado(letras) {
    letras = letras.toUpperCase().trim();

    const estaNoIntervalo = (prefixo, inicio, fim) => {
        return prefixo >= inicio && prefixo <= fim;
    };

    const verificarPorEstado = (estadoPlacas) => {
        return estadoPlacas.some(({ inicio, fim }) => estaNoIntervalo(letras, inicio, fim));
    };

    if (verificarPorEstado(placas.santaCatarina)) return 'Santa Catarina';
    if (verificarPorEstado(placas.parana)) return 'Paraná';
    if (verificarPorEstado(placas.rioGrandeDoSul)) return 'Rio Grande do Sul';
    return 'Estrangeiro';
}

function gerarTicketUnico() {
    let ticket;
    do {
        ticket = Math.floor(Math.random() * 1000000);
    } while (veiculos.some(v => v.ticket === ticket));
    return ticket;
}

function criarVeiculo() {
    const letras = placa.value.substring(0, 3).toUpperCase();
    console.log(letras);
    return {
        ticket: gerarTicketUnico(),
        placa: placa.value.toUpperCase(),
        cor: cor.value,
        tipo: tipoVeiculo.value,
        horarioEntrada: formatarDataCompleta(new Date().toISOString()),
        autenticado: false,
        horarioSaida: '',
        tempoPermanencia: '',
        estado: verificarEstado(letras),
        valor: ''
    };
}

function formatarDataCompleta(isoString) {
    const data = new Date(isoString);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // mês começa em 0
    const ano = data.getFullYear();

    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

function registrarEntrada() {
    //criando o veiculo
    const veiculo = criarVeiculo();

    //adicionando o veiculo ao array de veiculos
    veiculos.push(veiculo);

    //criando o elemento veiculo
    renderizarEstacionamento();

    //salvando o veiculo no localStorage
    localStorage.setItem('veiculos', JSON.stringify(veiculos));

    //limpando os inputs e finalizando a função
    placa.value = '';
    cor.value = '';
    tipoVeiculo.value = '';
    console.log(veiculos);
    alert('Carro registrado no sistema');
}

function calcularTempoPermanencia(veiculo) {
    const entrada = Date.parse(veiculo.horarioEntrada);
    const saida = Date.parse(veiculo.horarioSaida);

    if (isNaN(entrada) || isNaN(saida)) {
        return 'Horário inválido';
    }

    const diffMin = Math.floor((saida - entrada) / 60000); // diferença em minutos

    if (diffMin < 0) {
        return 'Saída antes da entrada';
    }

    const horas = Math.floor(diffMin / 60);
    const minutos = diffMin % 60;

    return veiculo.tempoPermanencia = { 
        horas: horas,
        minutos: minutos,
        diffMin: diffMin
    };
}

function calcularValor(veiculo) {
    const tempoPermanencia = veiculo.tempoPermanencia.diffMin;

    let resultado;
    if (tempoPermanencia <= 15) {
        resultado = 0;
    } else if (tempoPermanencia <= 180) {
        resultado = 10;
    } else if (tempoPermanencia > 180) {
        const aMais = tempoPermanencia - 180
        const meiaHora = Math.ceil(aMais / 30);
        const valor = 10 + (meiaHora * 1.5);
        resultado = valor;
    }

    return `R$ ${resultado},00`;
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
            veiculo.horarioSaida = formatarDataCompleta(new Date().toISOString());
            veiculo.tempoPermanencia = calcularTempoPermanencia(veiculo);
            veiculo.valor = calcularValor(veiculo);


            // Adicionar ao histórico
            historico.push(veiculo);
            localStorage.setItem('historicoSaida', JSON.stringify(historico));
            renderizarHistorico(historico);

            // Remover do array e do estacionamento
            veiculos.splice(veiculoIndex, 1);
            renderizarEstacionamento();

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

function adicionarAoHistorico(veiculo, historicoContainer) {
    const item = document.createElement('div');
    item.classList.add('historico-item');

    const cabecalho = document.createElement('div');
    cabecalho.classList.add('historico-cabecalho');

    const icone = criarIcone(veiculo.tipo);

    const placaTitulo = document.createElement('span');
    placaTitulo.textContent = veiculo.placa;
    placaTitulo.classList.add('placa-titulo');

    const detalhes = document.createElement('div');
    detalhes.classList.add('historico-detalhes');
    detalhes.innerHTML = `
        <p><strong>Ticket:</strong> ${veiculo.ticket}</p>
        <p><strong>Tipo:</strong> ${veiculo.tipo}</p>
        <p><strong>Estado:</strong> ${veiculo.estado}</p>
        <p><strong>Horário de Entrada:</strong> ${veiculo.horarioEntrada}</p>
        <p><strong>Horário de Saída:</strong> ${veiculo.horarioSaida}</p>
        <p><strong>Tempo de Permanência:</strong> ${veiculo.tempoPermanencia.horas} horas - ${veiculo.tempoPermanencia.minutos} min</p>
        <p><strong>Valor Pago:</strong> ${veiculo.valor}</p>
    `;

    cabecalho.appendChild(icone);
    cabecalho.appendChild(placaTitulo);
    item.appendChild(cabecalho);
    item.appendChild(detalhes);

    cabecalho.addEventListener('click', () => {
        detalhes.classList.toggle('ativo');
    });

    historicoContainer.appendChild(item);
}

function renderizarHistorico(historico) {
    const historicoContainer = document.getElementById('historicoSaida');
    historicoContainer.innerHTML = '';

    historico.forEach(veiculo => {
        adicionarAoHistorico(veiculo, historicoContainer);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    registrarEntrada();
});

// Adicionar os veículos mockados ao localStorage

if (!localStorage.getItem('veiculos')) {
  const veiculosMock = [
    {
        ticket: gerarTicketUnico(),
        placa: 'SAR6A21',
        cor: '#000000',
        tipo: 'moto',
        horarioEntrada: formatarDataCompleta(new Date(Date.now() - 10 * 60 * 1000).toISOString()), // 10 min atrás
        autenticado: false,
        horarioSaida: '',
        tempoPermanencia: '',
        estado: verificarEstado('AAA'),
        valor: ''
    },
    {
        ticket: gerarTicketUnico(),
        placa: 'RYI9L00',
        cor: '#FF0000',
        tipo: 'moto',
        horarioEntrada: formatarDataCompleta(new Date(Date.now() - 30 * 60 * 1000).toISOString()), // 30 min atrás
        autenticado: false,
        horarioSaida: '',
        tempoPermanencia: '',
        estado: verificarEstado('BBB'),
        valor: ''
    },
    {
        ticket: gerarTicketUnico(),
        placa: 'MMM7Z88',
        cor: 'preto',
        tipo: 'carro',
        horarioEntrada: formatarDataCompleta(new Date(Date.now() - 90 * 60 * 1000).toISOString()), // 1h30 atrás
        autenticado: false,
        horarioSaida: '',
        tempoPermanencia: '',
        estado: verificarEstado('CCC'),
        valor: ''
    },
    {
        ticket: gerarTicketUnico(),
        placa: 'IBZ2F88',
        cor: '#006400',
        tipo: 'caminhao',
        horarioEntrada: formatarDataCompleta(new Date(Date.now() - 180 * 60 * 1000).toISOString()), // 3h atrás
        autenticado: false,
        horarioSaida: '',
        tempoPermanencia: '',
        estado: verificarEstado('DDD'),
        valor: ''
    },
    {
        ticket: gerarTicketUnico(),
        placa: 'RHZ0Q12',
        cor: "#999999",
        tipo: 'carro',
        horarioEntrada: formatarDataCompleta(new Date(Date.now() - 300 * 60 * 1000).toISOString()), // 5h atrás
        autenticado: false,
        horarioSaida: '',
        tempoPermanencia: '',
        estado: verificarEstado('EEE'),
        valor: ''
    }
  ];

  localStorage.setItem('veiculos', JSON.stringify(veiculosMock));
  localStorage.setItem('historicoSaida', JSON.stringify([]));
}




