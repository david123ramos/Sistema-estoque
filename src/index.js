const formRegister = document.getElementById("register");
const formLogin = document.getElementById("login");

/**O array é uma forma temporária de guardar as empresas cadastradas na memória */
var empresas = [];
//usuários cadastrados
localStorage.getItem("empresasCadastradas") ? (empresas = JSON.parse(localStorage.getItem("empresasCadastradas"))) : null;

function showLogin(link){
    formRegister.setAttribute("hidden","");
    formLogin.removeAttribute("hidden");
    link.setAttribute("hidden" ,"");
    document.getElementById("register-link").removeAttribute("hidden")
}
function showRegister(el){
    document.getElementById("register").removeAttribute("hidden");
    document.getElementById("login").setAttribute("hidden","");
    el.setAttribute("hidden", "");
    document.getElementById("login-link").removeAttribute("hidden");
}

//escuta a submisão do form de login
formLogin.addEventListener("submit", function(e){
    e.preventDefault();
    let user = this.querySelector("input#user-login")
    let pass = this.querySelector("input#password-login");
    //verificando se os campos não estão vazios
    if(user.value.trim() != "" && pass.value.trim() != ""){
        seachUser(null , user.value.trim(), pass.value.trim()) ? window.location.href ="main.html" : noUsers();
    }else{
        user.value ="";
        pass.value = "";
    }
});
//escuta a submissão do form de cadastro
formRegister.addEventListener("submit", function(){
    /**TICK :  SENHAS NÃO SE GUARDAM EM DBs. (paliativo a seguir) */

    //verifica se o usuário já está cadastrado
    if(seachUser(this.querySelector("input#cnpj_reg").value, null ,this.querySelector("input#pass_reg").value )){
        //mostra o alert
        let uar = document.getElementById("userAlreadyRegistred");
        uar.removeAttribute("hidden");
        formRegister.reset();
        setTimeout(() => {
            uar.setAttribute("hidden", "");
        }, 4000);
    }else{
        var user  = {
            user_reg: "",
            email_reg: "",
            cnpj_reg: "",
            pass_reg: ""
        }
        this.querySelectorAll("input").forEach(function(el){
            //.trim() evita que seja possível cadastrar usuarios vazios
            if(el.id !== "btn-cadastro" && el.value.trim() != ""){
                user[el.id] = el.value.trim();
            }
        });
    
        //salva o usuário no array de empresas e redireciona o novo usuário a tela principal
        empresas.push(user);
        localStorage.setItem("empresasCadastradas", JSON.stringify(empresas));
        var sucesso = document.getElementById("userRegistred");
        sucesso.removeAttribute("hidden");
        
        setTimeout(() => {
            sucesso.setAttribute("hidden","");
            window.location.href ="main.html"
        }, 2000);

    }

});

//erro de senha ou e
function noUsers(){
    let al= document.getElementById("noUsers")
    al.removeAttribute("hidden");
    setTimeout(() => {
        al.setAttribute("hidden", "");
    }, 4000);
}

//função que verifica se o usuário já está cadastrado ou não no sistema

function seachUser(cnpj, email = null ,password){
    var done;
    //se email não for null preciso fazer a pesquisa pelo email (login)
    if(email != null){
        empresas.forEach(function(u){
            if(u.email_reg = email && u.pass_reg == password)
                done = true;
        });
    }else{
        empresas.forEach(function(el){
            if(el.cnpj_reg === cnpj && el.pass_reg == password)
                done = true;
        });
    }
    return done;
}