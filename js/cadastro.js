const formCadastro = document.querySelector("#formCadastrado");
const firstNameUser = document.querySelector("#nome");
const lastNameUser = document.querySelector("#sobrenome");
const phoneUser = document.querySelector("#telefone");
const cpfUser = document.querySelector("#cpf");
const dateUser = document.querySelector("#nascimento");
const emailUser = document.querySelector("#email");
const passwordUser = document.querySelector("#senha");
const confirmPassowordUser = document.querySelector("#repetirSenha");

const apiuRL = 

const checkPasswords = function (password1, password2) {
    if (password1 === password2) {
        return true;
    }
    return false;
};

formCadastro.addEventListener("submit", (e) => {
    e.preventDefault();
});
