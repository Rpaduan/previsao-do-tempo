/*
Lógica de Programação
- Algoritmo(Receita de bolo - passo a passo)

Fluxo básico
[x] Descobrir quando o botão foi clicado
[x] Pegar o nome da cidade no input
[x] Enviar a cidade para o servidor
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



async function cliqueiNoBotao() { //async precisa ter para usar o await
    let cidade = document.querySelector(".input-cidade").value
    let caixa = document.querySelector(".caixa-media")
    let chave = "fd81019b88f824c61751f21a103718ee"
    let endereco = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&pt_br`
    //Precisa avisar o JavaScript que você vai até o servidor
    //Traduzir a resposta do servidor / JSON
    //Json = JavaScript object notation
    let respostaServidor = await fetch(endereco) 
    //await = esperar a resposta do servidor - fetch = busca no servidor
    let dadosJson = await respostaServidor.json()
    console.log(dadosJson)
    //Math.floor = arredonda para baixo
    caixa.innerHTML = `
        <h2 class="cidade">${dadosJson.name}</h2>
        <p class="temp">${Math.floor(dadosJson.main.temp)} °C</p>
        <img class="icone" src="https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}.png">
        <p class="umidade">Umidade: ${dadosJson.main.humidity}</p>
        <button class="botao-ia">Sugestão de Roupa</button>
        <p class="resposta-ia">Resposta da IA</p>
    `
}
