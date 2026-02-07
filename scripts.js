/*
Lógica de Programação
- Algoritmo(Receita de bolo - passo a passo)

Fluxo básico
[x] Descobrir quando o botão foi clicado
[x] Pegar o nome da cidade no input
[x] Enviar a cidade para o servidor
[x] Pegar a resposta e colocar na tela

Flúxo de voz
[x] Descobrir quando o botão foi clicado
[x] Começar a ouvir e pegar a transcrição 
[x] Enviar a transcrição para o sevidor 
[x] Pegar a resposta e colocar na tela

Fluxo IA
[x] Pegar os dados da cidade
[x] Enviar dados para a IA
[x] Colocar os dados na tela

document = html

*/


let chaveIA = "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"

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
        caixa.innerHTML = //Math.floor = arredonda para baixo 
        `
        <h2 class="cidade">${dadosJson.name}</h2>
        <p class="temp">${Math.floor(dadosJson.main.temp)} °C</p>   
        <img class="icone" src="https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}.png">
        <p class="umidade">Umidade: ${dadosJson.main.humidity}%</p>
        <button class="botao-ia" onclick="pedirSugestaoRoupa()">Sugestão de Roupa</button>
        <p class="resposta-ia"></p>
    `
}

function detectaVoz() {
    let reconhecimento = new window.webkitSpeechRecognition()
    reconhecimento.lang = "pt-BR"
    reconhecimento.start()
    reconhecimento.onresult = function(evento) {
       let textoTranscrito = evento.results[0][0].transcript
       document.querySelector(".input-cidade").value = textoTranscrito
       cliqueiNoBotao()
    }
}

async function pedirSugestaoRoupa() {
    let temperatura = document.querySelector(".temp").textContent //conteudo do texto
    let umidade = document.querySelector(".umidade").textContent
    let cidade = document.querySelector(".cidade").textContent

    let resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "appliocation/json",
            "Authorization": "Bearer " + chaveIA // bearer token
        },
        body: JSON.stringify({
            model: "meta-llama/llama-4-maverick-17b-128e-instruct",
            messages: [
                {
                    "role": "user",
                    "content": `Me dê uma sugestão de qual roupa usar hoje. 
                    Estou na cidade de: ${cidade}, a temperatura atual é: ${temperatura}
                    e a umidade está em: ${umidade}
                    Me dê sugestões em 2 frases curtas
                    `
                }
            ]
        })

    })

    let dados = await resposta.json()
    document.querySelector(".resposta-ia").innerHTML = dados.choices[0].message.content
    console.log(dados)

    /*
    METODOS HTTP
    - GET: Pegar dados do servidor -- Padrão
    - POST: Enviar dados para o servidor / Receber resposta
    - PUT: Atualizar dados no servidor
    - DELETE: Deletar dados no servidor
    */

}
