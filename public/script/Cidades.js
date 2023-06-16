const fetchData = async () => {
  try {
    const response = await fetch("../../src/database/data.json");
    const data = await response.json();
    console.log(data);

    // Parameters
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get("q");

    // Filtros
    let filteredData = data;
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      filteredData = data.filter(
        (city) =>
          searchRegex.test(city.name) || searchRegex.test(city.description)
      );
    }

    const currentPage = parseInt(searchParams.get("page")) || 1;
    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const citiesToShow = filteredData.slice(startIndex, endIndex);

    const output = citiesToShow
      .map((city, index) => {
        const isEven = index % 2 === 0;
        const orderClass = isEven ? "not-even" : "oder-md-2";
        const columnsStructure = isEven
          ? `
        <div class="col-md-6 ">
          <div class="p-3">
            <h1 class="text-success">${city.name}</h1>
            <p>${city.description}</p>
            <button onclick="redirectPage(${city.id})" type="button" class="btn btn-success">Conhecer</button>
          </div>
        </div>
        <div class="col-md-6 ">
          <div class="p-3">
            <img src="${city.image}" alt="${city.name}" width="100%" class="rounded">
          </div>
        </div>
      `
          : `
        <div class="col-md-6 ">
          <div class="p-3">
            <img src="${city.image}" alt="${city.name}" width="100%" class="rounded">
          </div>
        </div>
        <div class="col-md-6 ">
          <div class="p-3">
            <h1 class="text-success">${city.name}</h1>
            <p>${city.description}</p>
            <button onclick="redirectPage(${city.id})" type="button" class="btn btn-success">Conhecer</button>
          </div>
        </div>
      `;

        return `
      <div class="shadow p-3 mb-4 rounded ${orderClass}" id="desktop">
        <div class="container px-4 text-center">
          <div class="row align-items-center">
            ${columnsStructure}
          </div>
        </div>
      </div>

      <div class="shadow p-3 mb-4 rounded ${orderClass}" id="mobile">
      <div class="container px-4 text-center">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="p-2">
              <h1 class="text-success">${city.name}</h1>
            </div>
            <div class="p-3">
              <img src="${city.image}" alt="${city.name}" width=100% class="rounded">
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3">
              <p>${city.description}</p>
              <button onclick="redirectPage(${city.id})" type="button" class="btn btn-success">Conhecer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
      })
      .join("");
    document.querySelector("#lista").innerHTML = output;

    renderPagination(filteredData.length, currentPage, itemsPerPage);

    // Manter valor do input de pesquisa ao atualizar página
    const searchInput = document.querySelector("#search-input");
    searchInput.value = searchQuery || "";
  } catch (error) {
    console.error(error);
  }
};

const redirectPage = (id) => {
  // Joga o usuário para a página e leva o ID como parâmetro
  window.location.href = `Detalhes.html?id=${id}`;
};

const renderPagination = (totalItems, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 3; // Número máximo de páginas visíveis no meio da sequência

  let paginationOutput = "";

  // Ícone de seta para voltar
  paginationOutput += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link pagination-link" href="?page=${
        currentPage - 1
      }" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  `;

  if (totalPages <= maxVisiblePages) {
    // Mostrar todas as páginas se o número total de páginas for menor ou igual ao máximo de páginas visíveis
    for (let page = 1; page <= totalPages; page++) {
      const isActive = page === currentPage ? "active" : "";
      paginationOutput += `
        <li class="page-item ${isActive}">
          <a class="page-link pagination-link ${isActive}" href="?page=${page}">${page}</a>
        </li>
      `;
    }
  } else {
    // Mostrar as páginas de forma dinâmica com pontos de suspensão
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    if (startPage > 1) {
      paginationOutput += `
        <li class="page-item">
          <a class="page-link pagination-link" href="?page=1">1</a>
        </li>
        <li class="page-item disabled">
          <a class="page-link pagination-link" href="#" tabindex="-1" aria-disabled="true">...</a>
        </li>
      `;
    }

    for (let page = startPage; page <= endPage; page++) {
      const isActive = page === currentPage ? "active" : "";
      paginationOutput += `
        <li class="page-item ${isActive}">
          <a class="page-link pagination-link ${isActive}" href="?page=${page}">${page}</a>
        </li>
      `;
    }

    if (endPage < totalPages) {
      paginationOutput += `
        <li class="page-item disabled">
          <a class="page-link pagination-link" href="#" tabindex="-1" aria-disabled="true">...</a>
        </li>
        <li class="page-item">
          <a class="page-link pagination-link" href="?page=${totalPages}">${totalPages}</a>
        </li>
      `;
    }
  }

  // Ícone de seta para avançar
  paginationOutput += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link pagination-link" href="?page=${
        currentPage + 1
      }" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;

  document.querySelector("#pagination").innerHTML = paginationOutput;
};

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const searchQuery = searchInput.value.trim();
  const currentPage = 1;

  const searchParams = new URLSearchParams({
    q: searchQuery,
    page: currentPage,
  });

  window.location.search = searchParams.toString();
});

const init = async () => {
  await fetchData();
};

init();
