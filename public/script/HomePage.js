fetch("././src/database/data.json")
.then((response) => response.json())
.then((data) => {
  console.log(data)
  let output = ``;
    data.map((citys) => {
      document.querySelector("#capa").innerHTML = capaDeEntrada(citys)
      output += preencheCards(citys)
  })
  document.querySelector(".cards").innerHTML = output
})
.catch((error) => console.error(error));

const capaDeEntrada = (arquivo) => {
  let result = ``
    result += `
    <div class="shadow p-3 mb-5 rounded" id="desktop">
      <div class="container px-4 text-center">
        <div class="row gx-5 align-items-center">
          <div class="col-md-6">
            <div class="p-3">
              <article>
                <h1 class="text-success">${arquivo.name}</h1>
                <p>${arquivo.description}</p>
                <button onclick="redirectPage(${arquivo.id})" type="button" class="btn btn-success">Conhecer</button>
              </article>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3">
              <img src="${arquivo.image}" alt="${arquivo.name}" width=100% class="rounded"></img>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shadow p-3 mb-5 rounded" id="mobile">
      <div class="container px-4 text-center">
        <div class="row gx-5 align-items-center">
          <div class="col-md-6">
            <div class="p-3">
              <img src="${arquivo.image}" alt="${arquivo.name}" width=100% class="rounded"></img>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3">
              <article>
                <h1 class="text-success">${arquivo.name}</h1>
                <p>${arquivo.description}</p>
                <button onclick="redirectPage(${arquivo.id})" type="button" class="btn btn-success">Conhecer</button>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  return result
}

const preencheCards = (arquivo) => {
  let cards = ``
  if (arquivo.trending == true) {
    cards += `
      <div class="col-md-4">
        <div class="p-3">
          <div class="card" style="width: 100%;">
            <img src="${arquivo.image}" class="card-img-top" alt="${arquivo.name}"></img>
              <div class="card-body">
                <h5 class="card-title">${arquivo.name}</h5>
                <p class="card-text text-align-center">${arquivo.description}</p>
                <a href="#" class="btn btn-success" onclick="redirectPage(${arquivo.id})">Conhecer</a>
              </div>
          </div>
        </div>
      </div>
  `
  }
  return cards
}

const redirectPage = (id) => {
  // Joga o usuario para a pagina e levar o id como parametro
  window.location.href = `./src/pages/Detalhes.html?id=${id}`
}