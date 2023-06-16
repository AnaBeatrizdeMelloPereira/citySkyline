fetch("../../src/database/data.json")
  .then((response) => response.json())
  .then((data) => {
    const filtroInput = document.getElementById("search-input");
    const listaFiltrada = document.getElementById("lista-filtrada");

    // Função para filtrar o JSON com base no valor de entrada
    const filtrarJSON = () => {
      const filtro = filtroInput.value.toLowerCase();

      // Limpar a lista filtrada
      listaFiltrada.innerHTML = "";

      if (!filtro) {
        return; // Se o campo de entrada estiver vazio, retorna sem adicionar elementos à lista
      }

      // Filtrar os dados do JSON
      const resultadosFiltrados = data.filter(
        (item) => item.name && item.name.toLowerCase().includes(filtro)
      );

      console.log(resultadosFiltrados);

      // Exibir os resultados filtrados na lista
      resultadosFiltrados.forEach((item) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${item.name} - Rating: ${item.rating}`;

        // Adicionar evento de clique para redirecionar para a URL do produto
        li.addEventListener("click", () => {
          const searchParams = new URLSearchParams();
          searchParams.set("q", item.name);
          searchParams.set("page", "1");

          const url = `Cidades.html?${searchParams.toString()}#`;
          window.location.href = url;
        });

        listaFiltrada.appendChild(li);
      });
    };

    // Atualizar a lista filtrada sempre que o valor do input mudar
    filtroInput.addEventListener("input", filtrarJSON);
  });
