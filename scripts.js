/*
Lógica de Programação
- Algoritmo(Receita de bolo - passo a passo)

Fluxo básico
[x] Descobrir quando o botão foi clicado
[x] Pegar o nome da cidade no input
[] Enviar a cidade para o servidor
[] Pegar a resposta e colocar na tela

Flúxo de voz
[] Descobrir quando o botão foi clicado
[] Começar a ouvir e pegar a transcrição 
[] Enviar a transcrição para o sevidor 
[] Pegar a resposta e colocar na tela

Fluxo IA
[] Pegar os dados da cidade
[] Enviar dados para a IA
[] Colocar os dados na tela

document = html

*/

function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value

    console.log(cidade)
}
