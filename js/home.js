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
const MxN = [];
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

function registrarEntrada() {
    //verificando placa

    const primeirasLetras = placa.value.substring(0, 3).toUpperCase();
    let estado = verificarEstado(primeirasLetras);

    //criando o objeto carro

    const carro = {
        ticket: Math.floor(Math.random() * 1000000),
        placa: placa.value,
        cor: cor.value,
        horarioEntrada: new Date().toLocaleTimeString(),
        horarioSaida: '',
        tempoPermanencia: " ",
        estado: estado,
        valor: ''
    };

    //adicionando o carro ao array de carros
    MxN.push(carro);

    //criando o elemento carro
    const carroElement = document.createElement('div');
    carroElement.classList.add('carro');
    carroElement.innerHTML = carro.ticket + " - " + carro.placa + " - " + carro.horarioEntrada + " - " + carro.estado;
    carroElement.style.backgroundColor = carro.cor;
    const botao = document.createElement('button')
    botao.innerHTML = 'Sair';
    carroElement.appendChild(botao);
    document.getElementById('estacionamento').appendChild(carroElement);

    //salvando o carro no arquivo json


    //limpando os inputs e finalizando a função
    placa.value = '';
    cor.value = '';
    console.log(MxN);
    alert('Carro registrado no sistema');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    registrarEntrada();
});

