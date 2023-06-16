const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

console.log("id: " + id);

const fetchData = async () => {
  try {
    const response = await fetch("../../src/database/data.json");
    const data = await response.json();
    console.log(data);
    const filteredData = data.filter((city) => city.id == id);
    const output = filteredData.map((city) => carregaNome(city));
    const reviewOutput = filteredData.map((city) => carregaComentarios(city));
    const reviewOutput2 = filteredData.map((city) => carregaComentariosMobile(city));
    document.querySelector("#Nome").innerHTML = output;
    document.querySelector("#Reviews-desktop").innerHTML = reviewOutput;
    document.querySelector("#Reviews-mobile").innerHTML = reviewOutput2;
  } catch (error) {
    console.error(error);
  }
};

const carregaComentarios = (city) => {
  const reviews = city.reviews.map((review) => carregaComentario(review)).join('');
  return `${reviews}`;
};

const carregaComentariosMobile = (city) => {
  const reviews = city.reviews.map((review) => carregaComentarioMobile(review)).join('');
  return `${reviews}`;
};

const carregaNome = arquivo => {
  return `${arquivo.name}`
}

const carregaComentario = arquivo => {
  return `
    <div class="col-2 p-1">
      <img src="${arquivo.image}" class="img-fluid mr-3 align-self-center" alt="Imagem de Perfil">
    </div>
    <div class="col-10 d-flex flex-column justify-content-center">
     <h6>${arquivo.name} - ${arquivo.age} anos | ${getRatingStars(arquivo.rating)}</h6>
     <p>${arquivo.description}</p>
    </div>
`
}

const carregaComentarioMobile = arquivo => {
  return `
    <div class="col-2 p-1">
      <img src="${arquivo.image}" class="img-fluid mr-3 align-self-center rounded-circle" alt="Imagem de Perfil">
    </div>
    <div class="col-10 d-flex flex-column justify-content-center">
     <h6 class="p-1">${arquivo.name} - ${arquivo.age} anos</h6>
     <h6 class="p-1">${getRatingStars(arquivo.rating)}</h6>
     <p>${arquivo.description}</p>
    </div>
`
}

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