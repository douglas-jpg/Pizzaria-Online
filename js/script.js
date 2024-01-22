const cardArea = document.querySelector("#cardArea");
const loadElement = document.querySelector("#loadElement");
const select = document.querySelector("#ordemPizzas");
const formSearch = document.querySelector("#formSearch");
const inputSearch = document.querySelector("#searchInput");

let ordem = "";
let nome = "";

let URL = `http://localhost:5000/pizza?_sort=${ordem}&nome=${nome}`;

const orderIngredients = function (pizza) {
    let ingredientes = "";

    pizza.ingredientes.map((ing, index) => {
        if (index == pizza.ingredientes.length - 1) {
            ingredientes += ing;
        } else {
            ingredientes += ing + ", ";
        }
    });

    return ingredientes;
};

const createCardPizza = function (pizza) {
    const ingredientes = orderIngredients(pizza);
    const cardPizza = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <div class="card text-center bg-light h-100">
                                <a href="" class="position-absolute end-0 p-2 text-danger">
                                    <i class="bi-suit-heart" style="font-size: 24px;"></i>
                                </a>
                                <a href="./src/produto.html">
                                    <img src=${pizza.imagem} alt="Pizza de ${pizza.nome}" class="card-img-top pizza mx-auto">
                                </a>
                                <div class="card-header">R$ ${pizza.preco},00</div>
                                <div class="card-body">
                                    <h5 class="card-title">${pizza.nome}</h5>
                                    <p class="card-text truncar-3l">${ingredientes}</p>
                                </div>
                                <div class="card-footer">
                                    <a href="src/carrinho.html" class="btn btn-danger mt-2 d-block">Adicionar ao carrinho</a>
                                    <small class="text-success">Disponivel</small>
                                </div>
                            </div>
                       </div>`;
    cardArea.innerHTML += cardPizza;
};


async function getAllPizzas() {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);

    loadElement.classList.add("d-none");
    cardArea.classList.remove("d-none");

    if (data.length != 0) {
        data.map((pizza) => {
            createCardPizza(pizza);
        });
    } else {
        cardArea.innerHTML = `<h3 class="text-danger text-center">Pizza não encontrada</h3>`;
    }
}

// melhorar pesquisa por por input
formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchTerm = inputSearch.value;
    searchTerm.length == 0
        ? (nome = "")
        : (nome = searchTerm[0].toUpperCase() + searchTerm.substring(1));

    URL = `http://localhost:5000/pizza?_sort=${ordem}&nome=${nome}`;
    cardArea.innerHTML = "";
    getAllPizzas();
});

select.addEventListener("change", () => {
    let ordem = select.value;
    URL = `http://localhost:5000/pizza?_sort=${ordem}&nome=${nome}`;
    cardArea.innerHTML = "";
    getAllPizzas();
});

getAllPizzas();
