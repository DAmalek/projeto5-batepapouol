let mensagens = undefined;


userLog()

function userLog(){
    const userName = {
        name: prompt("Digite seu User name: ")
    };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userName)
    
    promise.then(chatUol)

    promise.catch(verificarUser)
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
        ulMensagens.innerHTML+= `<li>${mensagens[i].time} ${mensagens[i].from} para ${mensagens[i].to}: ${mensagens[i].text}</li>`
    }


}


function verificarUser(error){
    console.log("deu ruim #1", error.response.status)
    if (error.response.status === 400){
        userLog()
    }

}