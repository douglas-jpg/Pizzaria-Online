const cardArea = document.querySelector("#cardArea");
const loadElement = document.querySelector("#loadElement");
const select = document.querySelector("#ordemPizzas");
const formSearch = document.querySelector("#formSearch");
const inputSearch = document.querySelector("#searchInput");

const apiUrl = `http://localhost:5000/pizza`;

let ordem = "";
let nome = "";

const createCardPizza = function (pizza) {
    const ingredientes = pizza.ingredientes.join(", ");
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
    const cardElement = document
        .createRange()
        .createContextualFragment(cardPizza);
    cardArea.appendChild(cardElement);
};

async function fetchData() {
    const response = await fetch(`${apiUrl}?_sort=${ordem}&nome=${nome}`);
    return response.json();
}

async function renderPizzas() {
    try {
        const data = await fetchData();

        loadElement.classList.add("d-none");
        cardArea.classList.remove("d-none");

        if (data.length !== 0) {
            data.forEach((pizza) => {
                createCardPizza(pizza);
            });
        } else {
            cardArea.innerHTML = `<h3 class="text-danger text-center">Pizza não encontrada</h3>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// melhorar pesquisa por por input
formSearch.addEventListener("submit", async (e) => {
    e.preventDefault();

    nome = inputSearch.value.trim();
    URL = `http://localhost:5000/pizza?_sort=${ordem}&nome=${nome}`;

    try {
        cardArea.innerHTML = "";
        await renderPizzas();
    } catch (error) {
        console.error("Error rendering pizzas:", error);
    }
});

select.addEventListener("change", async () => {
    ordem = select.value;
    URL = `http://localhost:5000/pizza?_sort=${ordem}&nome=${nome}`;

    try {
        cardArea.innerHTML = "";
        await renderPizzas();
    } catch (error) {
        console.error("Error rendering pizzas:", error);
    }
});

renderPizzas();
