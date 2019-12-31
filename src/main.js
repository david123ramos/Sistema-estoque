//função que dispara o modal de cadastro para inserir um novo estoque
function showTab(idOfModal){
    document.getElementById("main").setAttribute("hidden", "");
    document.getElementById(idOfModal).removeAttribute("hidden");
}

//array que guarda os estoques na memória
estoques = [];
var auxEstoques = localStorage.getItem("estoques");

auxEstoques ? (estoques = JSON.parse(auxEstoques)) : null;

const formRegisterNewStorage = document.getElementById("formRegisterNewStorage");
//simulando a reatividade que será adicionada pelo Vue
//labels que recebem o valor dos  inputs 
var labelsForm = formRegisterNewStorage.querySelectorAll("label");
var inputForms = formRegisterNewStorage.querySelectorAll("input");

inputForms.forEach(function(input,i){
    input.addEventListener("keyup", function(){
        labelsForm[i].innerText = this.value;
    });
});

//TODO: facilitar a manuntenção do código deixando o array de inputs mais genericos
formRegisterNewStorage.addEventListener("submit", function(e){
    e.preventDefault();
    var newEstoque = {
        name: inputForms[0].value,
        local: inputForms[1].value,
    }
    estoques.push(newEstoque);
    localStorage.setItem("estoques", JSON.stringify(estoques));
    //limpa o modal
    this.reset();
    labelsForm.forEach(function(label){label.innerText = ""});
    
    document.getElementById("registerStorage").click();
    let alrt = document.getElementById("storageOk")
    alrt.removeAttribute("hidden");
    setTimeout(function(){
        alrt.setAttribute("hidden", "");
    }, 3000);
});


//função para mostrar todos os estoques disponíveis
function showStorages(){
    var modal = document.getElementById("showStorages");
    modal.removeAttribute("hidden");
    var listStorage = modal.querySelector("ul");
    listStorage.innerHTML ="";
    let estoquesCadastrados = JSON.parse(localStorage.getItem("estoques"));

    estoquesCadastrados.forEach(function(es, i){
       
        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.appendChild(document.createTextNode(es.nome || es.name));
        let div = document.createElement("div");
        div.setAttribute("class", "smallLetters");
        div.setAttribute("title", "localização do estoque");

        div.appendChild(document.createTextNode(es.local));
        li.appendChild(div);

        listStorage.appendChild(li);
    });

}