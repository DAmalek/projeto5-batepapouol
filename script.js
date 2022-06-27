let msgs = undefined;
let userName = undefined;

function userLog(){
    userName = {
        name: prompt("Digite seu User name: ")
    };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userName)
    
    promise.then(entrar)
    

    promise.catch(verificarError)
}

function chatUol(){
    //console.log("deu bom #1")
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(carregarMensagens)
    //erro
    
}
function carregarMensagens(resposta){
    //console.log("Ordem de execução: 2 - carregarMensagens()");
    msgs = resposta.data;
    //console.log(msgs);
    renderizarMensagens(msgs)
    //erro
    //setInterval(renderizarMensagens, 3100)
}

function renderizarMensagens(mensagens){
    const ulMensagens = document.querySelector(".mensagens");
    ulMensagens.innerHTML = ""
    for (let i=0; i<mensagens.length; i++){
        if(mensagens[i].type === 'message' && mensagens[i].to === 'Todos'){
            ulMensagens.innerHTML+= `<li class="messageTodos"><p>(${mensagens[i].time}) <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>: <span>${mensagens[i].text}</span></p></li>`
            
        }else if(mensagens[i].type === 'status'){
            ulMensagens.innerHTML+= `<li class="status"><p>(${mensagens[i].time}) <strong>${mensagens[i].from}</strong> ${mensagens[i].text}</p></li>`
            
         }else if(mensagens[i].type === 'private_message' && mensagens[i].from === userName.name){
            ulMensagens.innerHTML+= `<li class="direct"><p>(${mensagens[i].time}) <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>: <span>${mensagens[i].text}</span></p></li>`
        }
    }
    // ta estranho
    ulMensagens.lastElementChild.scrollIntoView();
}

function enviarMensagem() {
    const userMensagem = document.querySelector("textarea").value
    const novaMensagem = {
        from: userName.name,
        to: "Todos",
        text: userMensagem,
        type: "message",
        
    }
    console.log(novaMensagem);

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem)
    promessa.then(function(response){
        console.log("msg enviada com sucesso")
        console.log(response)
        chatUol()
    })
    
    promessa.catch(verificarError)
    document.querySelector("textarea").value = ""


}
function verificarError(error){
    console.log("deu ruim #1", error.response.status)
    if (error.response.status === 400){
        userLog()
      }
}

function sinaldeVida() {
    const nome = {
        name: userName.name
    }
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome);

}
function entrar(){
    setInterval(chatUol, 3000)
    setInterval(sinaldeVida, 5000)
}

userLog()
