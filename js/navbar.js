const perfilNav = document.querySelector("#perfilNav");
const sairNav = document.querySelector("#sairNav");
const cadastroNav = document.querySelector("#cadastroNav");
const loginNav = document.querySelector("#loginNav");
const badge = document.querySelector("#badge");
const popsair = document.querySelector("#popSair");
const btnFicar = document.querySelector("#btnFicar");
const btnSair = document.querySelector("#btnSair");

const apiURLUsers = "http://localhost:5000/clientes";

const getUser = JSON.parse(localStorage.getItem("activeUser"));

// atualizar a qtd de itens no carrinho
const updateBadge = function (qtdItems) {
    const smallElement = document.createElement("small");
    smallElement.textContent = qtdItems;
    badge.innerHTML = "";
    badge.appendChild(smallElement);
    badge.title = `Tem ${qtdItems} produto(s) no seu carrinho`;
};

async function fetchData() {
    const response = await fetch(`${apiURLUsers}?id=${getUser.id}`);
    const data = await response.json();
    return data;
}

async function checkCart() {
    const data = await fetchData();
    itemsCart = data[0].carrinho.length;

    if (itemsCart != 0) {
        updateBadge(itemsCart);
    }
}

// atualizar o nome de usuario na navbar
const updateNav = function (isLoggedIn, user) {
    cadastroNav.classList.toggle("d-none", isLoggedIn);
    loginNav.classList.toggle("d-none", isLoggedIn);
    sairNav.classList.toggle("d-none", !isLoggedIn);
    perfilNav.classList.toggle("d-none", !isLoggedIn);

    if (isLoggedIn) {
        perfilNav.textContent = user.nome;
    }
};

const checkLoginStatus = function () {
    const isLoggedIn = getUser !== null;
    const user = isLoggedIn ? getUser : null;

    updateNav(isLoggedIn, user);
};

const logout = function () {
    localStorage.removeItem("activeUser");
    checkLoginStatus();
};

sairNav.addEventListener("click", (e) => {
    e.preventDefault();
    popsair.classList.remove("d-none");
});

btnFicar.addEventListener("click", () => {
    popsair.classList.add("d-none");
});

btnSair.addEventListener("click", () => logout());

checkLoginStatus();
checkCart();
