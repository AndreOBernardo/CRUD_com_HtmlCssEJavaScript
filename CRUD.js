
window.addEventListener('load', start)

// Declarando variáveis globais

var globalNames = ['um', 'dois', 'três', 'quatro', 'cinco'];
var nomes = document.querySelector("#nomes");
var ul = document.createElement('ul');
var input = document.getElementById('input');
var form = document.getElementById('formulario');
var isEditing = false;
var posicao;

// Criando as funções que seram chamada logo abaixo

function start() {
    prevenirComportamentoDefault(form);                      
    aplicarFoco(input);
    capturarValoresDigitados(input);
    exibirVetor();
}

//  event.preventDefault = previne para o não carregamento da página após a inserção dos dados na input

function prevenirComportamentoDefault(objeto) {
    objeto.addEventListener('submit', function (event) {
        event.preventDefault();                              
    });
}

// Aplica o foco na input(a caixa fica apta a receber os dados de forma padrão sem clicar) 

function aplicarFoco(objeto) {
    objeto.focus();
}

// Captura os elementos inserindo ou editando

function capturarValoresDigitados(objeto) {
    objeto.addEventListener('keyup', function (event) { // keyup ocorre quando a tecla foi pressionada 
        if (event.key === 'Enter') {   // Quando o enter for pressionado entende que o dado está pronto pra ser inserido/editado    
var valorDigitado = event.target.value; // Obtendo conteudo digitado 

        // Se algum valor for digitado, então editar ou inserir
        if (valorDigitado) { // valorDigitado vazio não altera nada
             if (isEditing) { // caso haja dados...
        // Editando valores  
          globalNames.splice(posicao, 1, valorDigitado); //.splice permite inserir dados (na posição, 1(um elemento) valorDigitado(valor inserido))
            isEditing = false; // Desativando modo edição
    }   else {
        // Inserindo valores 
          globalNames.push(valorDigitado); // .push = Insere dados no array
      }
    }  
        exibirVetor(); // Atualiza a página e exibe o novo dado inserido
        }
    });
        
}

// Expõe os dados inseridos

function exibirVetor() {
    // Limpando o conteúdo da ul e inputa para receber outros valores
    ul.innerHTML = '';
    input.value = '';

    // Para cada função do vetor, executar a função percorrerVetor
    globalNames.forEach(percorrerVetor); // forEach percorre o valorDigitado
    nomes.appendChild(ul); // Adicionar ul na div nomes para ser exibida
}

//

function percorrerVetor(item) {
    var li = document.createElement('li'); // createElement irá criar um elemento HTML para ser, posteriormente, inserido em um documento HTML.
    // adiciona um novo valor dentro de uma chave existente dentro do objeto
    li.appendChild(criarBotao()); // Cria e adciona o botao X na li
    li.appendChild(criarSpan(item)); // Cria e adiciona uma span na li
    ul.appendChild(li); // Cria e adiciona uma li na ul
}

//

function criarBotao() { 
    var botao = document.createElement('button'); // criando elemento HTML button
    // Adcionando classe deleteButton
    botao.classList.add('deleteButton');
    botao.textContent = "x" // Adicionando conteúdo X ao botão

    // Retornando o botao criado ao ponto de chamada desta função
    return botao;
}

//

function criarSpan(valor) {
    var span = document.createElement('span'); // criando elemento HTML span
    span.textContent = valor; // span.textContent = span do tipo texto, = valor: Adicionando o valor dentro do span
    span.classList.add('clicavel');
    span.addEventListener('click', editarItem); // Ao clicar chama a função editarItem
    // Retornando valor dentro do span
    return span;
}

//

function editarItem() {
    // Capturando o valor do elemento clicado
    var valor = event.target.innerHTML;
    var index = globalNames.indexOf(valor); // Ientificando o índice
    input.value = globalNames[index];
    aplicarFoco(input); // Aplicando foco no input
    isEditing = true;
    posicao = index;
}

// Deletando elementos na lista quando clicados

ul.addEventListener('click', function(event) {
    // Realizar evento apenas quando clicar no botão
    if (event.target.localName === 'button') {  // Diferencia clicar no nome e no botão
    // Capturando o valor do elemento clicado
    var valor = event.srcElement.nextElementSibling.innerHTML;
    // Deletando elemento de globalNames
    var index = globalNames.indexOf(valor); // Identificando índice
    globalNames.splice(index, 1);

    var ancestral = event.target.parentElement;
    ancestral.remove(); // Removendo o elemento 
    exibirVetor(); // Atualizar site e exibir vetor com novo valor
    }
});

