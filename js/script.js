const cardArea = document.querySelector("#cardArea");
const loadElement = document.querySelector("#loadElement");

const URL = "../data/pizzas.json";

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
                                <div class="card-header">R$ ${pizza.preco}</div>
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

    loadElement.classList.add("d-none");
    cardArea.classList.remove("d-none");

    console.log(data);
    data.map((pizza) => {
        createCardPizza(pizza);
    });
}

getAllPizzas();
