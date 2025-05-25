const form = document.getElementById('registrarForm');
const placa = document.getElementById('placa');
const descricao = document.getElementById('descricao');
const MxN = [];

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

function registrar(){
    
    alert('Carro registrado no sistema');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    registrar();
});

