const formCadastro = document.querySelector("#formCadastrado");
const firstNameUser = document.querySelector("#nome");
const lastNameUser = document.querySelector("#sobrenome");
const phoneUser = document.querySelector("#telefone");
const cpfUser = document.querySelector("#cpf");
const dateUser = document.querySelector("#nascimento");
const emailUser = document.querySelector("#email");
const passwordUser = document.querySelector("#senha");

const apiURLUsers = "http://localhost:5000/clientes";

const saveUser = function ({ id, nome }) {
    const user = {
        id: id,
        nome: nome,
    };

    localStorage.setItem("activeUser", JSON.stringify(user));
};

async function registerUser(user) {
    await fetch(apiURLUsers, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

async function getLastIdUsers() {
    const response = await fetch(apiURLUsers);
    const data = await response.json();
    return data[data.length - 1].id || 0;
}

formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const idUser = (await getLastIdUsers()) + 1;

    const user = {
        id: idUser,
        nome: `${firstNameUser.value} ${lastNameUser.value}`,
        adm: false,
        email: emailUser.value,
        senha: passwordUser.value,
        cpf: cpfUser.value,
        dataNascimento: dateUser.value,
        telefone: phoneUser.value,
        endereco: [],
        favoritos: [],
        carrinho: [],
    };

    saveUser(user);

    await registerUser(user);
});
