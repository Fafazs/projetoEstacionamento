
const veiculo = {
    placa: 'ABC1234',
    horarioEntrada: '10:00',
    horarioSaida: '14:40'
}

function calcularValor(veiculo){
    const entrada = new Date(`1970-01-01T${veiculo.horarioEntrada}`);
    const saida = new Date(`1970-01-01T${veiculo.horarioSaida}`);
    const diffMinutos = (saida - entrada) / (1000 * 60);
    const diffHoras = Math.ceil((saida - entrada) / (1000 * 60 * 60));

    let resultado;
    if (diffMinutos <= 15){
        resultado = 0;
    }else if (diffMinutos <= 180){
        resultado = 10;
    }else if (diffMinutos > 180){
        const aMais = diffMinutos - 180
        const meiaHora = Math.ceil(aMais/30);
        const valor = 10 + (meiaHora * 1.5);
        resultado = valor;
    }

    return `R$ ${resultado},00`;
}

console.log(calcularValor(veiculo));