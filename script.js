let mensagens = undefined;
let userName = undefined;
userLog()

function userLog(){
    userName = {
        name: prompt("Digite seu User name: ")
    };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userName)
    
    promise.then(chatUol)

    promise.catch(verificarError)
}

function chatUol(){
    console.log("deu bom #1")
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

    promise.then(carregarMensagens)
}

function carregarMensagens(resposta){
    console.log("Ordem de execução: 2 - carregarMensagens()");
    console.log(resposta);
    mensagens = resposta.data;
    renderizarMensagens()
}
function renderizarMensagens(){
    const ulMensagens = document.querySelector(".mensagens");
    
    for (let i=0; i<mensagens.length; i++){
        if(mensagens[i].type === 'message' && mensagens[i].to === 'Todos'){
            ulMensagens.innerHTML+= `<li class="messageTodos">(${mensagens[i].time}) <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}</li>`
            
        }else if(mensagens[i].type === 'status'){
            ulMensagens.innerHTML+= `<li class="status">(${mensagens[i].time}) <strong>${mensagens[i].from}</strong> ${mensagens[i].text}</li>`
            
         }else if(mensagens[i].type === 'private_message'){
            ulMensagens.innerHTML+= `<li class="direct">(${mensagens[i].time}) <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}</li>`
        }
    }
}

function enviarMensagem() {
    const userMensagem = document.querySelector("input").value
    const novaMensagem = {
        from: userName,
        to: "Todos",
        text: userMensagem,
        type: "message",
        time: mensagens.time
    }
    console.log(novaMensagem);

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem)

    promise.then(chatUol);

    promise.catch(verificarError)
}
function verificarError(error){
    console.log("deu ruim #1", error.response.status)
    if (error.response.status === 400){
        userLog()
      }
}
