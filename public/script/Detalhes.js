const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

console.log("id: " + id);

const fetchData = async () => {
  try {
    const response = await fetch("../../src/database/data.json");
    const data = await response.json();
    console.log(data);
    
    const filteredData = data.filter((city) => city.id == id);
    const output = filteredData.map((city) => preencheLista(city)).join("");
    document.querySelector("#lista").innerHTML = output;
  } catch (error) {
    console.error(error);
  }
};

const preencheLista = (arquivo) => {
  return `
    <div class="shadow p-3 mb-3 bg-white rounded" id="desktop">
      <div class="px-4">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="p-3">
              <img src="${arquivo.image}" alt="${arquivo.name}" width=100% class="rounded">
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3">
              <h5 class="text-secondary"> ${getRatingStars(arquivo.rating)} | Mais de ${arquivo.numberOfTrips} viagens! </h5>
              <h1 class="text-success">${arquivo.name}</h1>
              <p>${arquivo.description}</p>
              <h2>R$ ${arquivo.price},00</h2>
              <button onclick="redirectPage(${arquivo.id})" type="button" class="btn btn-success">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shadow p-3 mb-3 bg-white rounded" id="mobile">
      <div class="container px-5">
          <h4 class="text-secondary"> ${getRatingStars(arquivo.rating)}</h4>
      </div>
      <div class="container px-4 text-center">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="p-3">
              <img src="${arquivo.image}" alt="${arquivo.name}" width=100% class="rounded">
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3">
              <h1 class="text-success">${arquivo.name}</h1>
              <p>${arquivo.description}</p>
              <h2>R$ ${arquivo.price},00</h2>
              <button onclick="redirectPage(${arquivo.id})" type="button" class="btn btn-success">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shadow p-3 mb-3 rounded info" id="desktop">
      <div class="px-4">
        <div class="row justify-content-between">
          <div class="col-md-4 align-self-center">
            <div class="p-3">
              <p><i class="bi bi-geo-alt"></i>  ${arquivo.location}</p>
            </div>
            <div class="p-3">
              <p><i class="bi bi-telephone"></i>  ${arquivo.telephone}</p>
            </div>
            <div class="p-3">
              <p><i class="bi bi-chat-square-dots"></i> ${arquivo.email}</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3">
              <iframe src=${arquivo.map} width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shadow p-3 mb-3 rounded info" id="mobile">
      <div class="px-4">
        <div class="row justify-content-between">
          <div class="col-md-4 align-self-center">
            <div class="col-md-4">
              <div class="p-3">
                <iframe src=${arquivo.map} width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
            <div class="p-3">
              <p><i class="bi bi-geo-alt"></i>  ${arquivo.location}</p>
            </div>
            <div class="p-3">
              <p><i class="bi bi-telephone"></i>  ${arquivo.telephone}</p>
            </div>
            <div class="p-3">
              <p><i class="bi bi-chat-square-dots"></i> ${arquivo.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

const redirectPage = (id) => {
  // Joga o usuário para a página e leva o id como parâmetro
  window.location.href = `DetalhesCompra.html?id=${id}`;
};

function getRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = Math.round(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStar;

  let starsHTML = "";

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="bi bi-star-fill star-icon"></i>';
  }

  if (halfStar === 1) {
    starsHTML += '<i class="bi bi-star-half star-icon"></i>';
  }

  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="bi bi-star star-icon"></i>';
  }

  return starsHTML;
}

fetchData();
