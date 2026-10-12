// Seus elementos originais
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const message = document.getElementById("message");
const galleryContainer = document.getElementById("list-breeds");
const mainContent = document.querySelector(".main-content");
const reloadButton = document.querySelector(".reload");
const clearButton = document.getElementById("clear-button");

// Variáveis para guardar qual raça está selecionada no momento (para o botão recarregar)
let currentBreed = "";
let currentSubBreed = null;
// Variável global para guardar a lista completa que veio da API
let allBreeds = {};

// 1. Função para desenhar a galeria de 6 imagens na tela (RF03 e RF05)
const renderGallery = (urls, displayName) => {
  // Atualiza o nome da raça selecionada logo abaixo do título fixo
  const selectedBreedEl = document.getElementById("selected-breed");
  if (selectedBreedEl) {
    selectedBreedEl.innerText = `Raça exibida: ${displayName.toUpperCase()}`;
  }

  // Seleciona e limpa o container da galeria
  let galleryDiv = document.getElementById("image-gallery");
  if (!galleryDiv) {
    galleryDiv = document.createElement("div");
    galleryDiv.id = "image-gallery";
    mainContent.appendChild(galleryDiv);
  }

  galleryDiv.innerHTML = "";

  // Adiciona as 6 imagens na grade
  urls.forEach((url, index) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = `Foto de ${displayName} (${index + 1})`;

    img.onerror = () => {
      img.style.display = "none";
    };

    galleryDiv.appendChild(img);
  });
};

// 2. Função searchImage ajustada para buscar 6 imagens (/random/6)
const searchImage = async (breed, subBreed = null) => {
  const formattedBreed = breed.trim().toLowerCase();

  let url = `https://dog.ceo/api/breed/${formattedBreed}/images/random/6`;

  if (subBreed) {
    const formattedSub = subBreed.trim().toLowerCase();
    url = `https://dog.ceo/api/breed/${formattedBreed}/${formattedSub}/images/random/6`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok && response.status !== 404) {
    throw new Error("Erro na comunicação com a API");
  }

  return data;
};

// 3. Função auxiliar para carregar a galeria e tratar mensagens
const loadBreedGallery = async (breed, subBreed = null) => {
  currentBreed = breed;
  currentSubBreed = subBreed;

  message.innerText = "Buscando imagens...";
  message.style.color = "blue";

  try {
    const result = await searchImage(breed, subBreed);

    if (result.status !== "success" || !result.message.length) {
      message.innerText = "Nenhuma imagem encontrada para esta raça";
      message.style.color = "red";
    } else {
      const displayName = subBreed ? `${subBreed} ${breed}` : breed;
      renderGallery(result.message, displayName);
      message.innerText = ""; // Limpa a mensagem
    }
  } catch (error) {
    message.innerText = "Falha de conexão";
    message.style.color = "red";
    console.error("Detalhes do erro:", error);
  }
};

// 4. Função que desenha os cards de raças na sidebar e atualiza o contador
const renderSidebar = (breedsObject) => {
  const container = document.getElementById("list-breeds");
  container.innerHTML = ""; // Limpa o container antes de desenhar

  const breedsList = Object.entries(breedsObject);

  // Atualiza o contador de raças disponíveis na tela
  const totalBreedsEl = document.getElementById("total-breeds");
  if (totalBreedsEl) {
    totalBreedsEl.innerText = `${breedsList.length} raças disponíveis.`;
  }

  if (breedsList.length === 0) {
    container.innerHTML =
      "<p style='padding: 8px; color: #666;'>Nenhuma raça encontrada.</p>";
    return;
  }

  breedsList.forEach(([breed, subBreeds]) => {
    // Card da Raça Principal
    const card = document.createElement("div");
    card.className = "breed-card";

    // Botão / Título da Raça
    const breedBtn = document.createElement("button");
    breedBtn.className = "breed-btn";
    breedBtn.type = "button";

    const breedNameCapitalized = breed.charAt(0).toUpperCase() + breed.slice(1);

    if (subBreeds.length > 0) {
      breedBtn.innerHTML = `<span><strong>${breedNameCapitalized}</strong></span> <span class="badge">${subBreeds.length} sub-raça${subBreeds.length > 1 ? "s" : ""}</span>`;
    } else {
      breedBtn.innerHTML = `<span><strong>${breedNameCapitalized}</strong></span>`;
    }

    breedBtn.addEventListener("click", () => {
      loadBreedGallery(breed);
    });

    card.appendChild(breedBtn);

    // Se houver sub-raças, renderiza os chips de sub-raça
    if (subBreeds.length > 0) {
      const subContainer = document.createElement("div");
      subContainer.className = "subbreeds-container";

      const subLabel = document.createElement("p");
      subLabel.innerText = "Sub-raças:";
      subContainer.appendChild(subLabel);

      const buttonsWrapper = document.createElement("div");
      buttonsWrapper.className = "sub-buttons";

      subBreeds.forEach((sub) => {
        const subBtn = document.createElement("button");
        subBtn.className = "sub-btn";
        subBtn.type = "button";
        subBtn.innerText = sub;

        subBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          loadBreedGallery(breed, sub);
        });

        buttonsWrapper.appendChild(subBtn);
      });

      subContainer.appendChild(buttonsWrapper);
      card.appendChild(subContainer);
    }

    container.appendChild(card);
  });
};

// Carrega a lista inicial da API
const loadsidebarlist = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    allBreeds = data.message; // Salva o objeto completo na variável global
    renderSidebar(allBreeds); // Desenha a lista inicial
  } catch (error) {
    message.innerText = "Erro ao carregar lista de raças";
    message.style.color = "red";
  }
};

loadsidebarlist();

// 5. Evento de clique no botão "Buscar"
searchButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const inputValue = searchInput.value;

  if (!inputValue.trim()) {
    message.innerText = "Por favor, digite o nome de uma raça";
    message.style.color = "orange";
    return;
  }

  searchButton.disabled = true;
  await loadBreedGallery(inputValue);
  searchButton.disabled = false;
});

// 6. Evento do botão "Recarregar" (RF04)
if (reloadButton) {
  reloadButton.addEventListener("click", () => {
    if (currentBreed) {
      loadBreedGallery(currentBreed, currentSubBreed);
    } else {
      message.innerText = "Selecione uma raça primeiro para recarregar";
      message.style.color = "orange";
    }
  });
}

// 7. Filtro de pesquisa na barra lateral enquanto digita (RF02)
const filterBreeds = () => {
  const term = searchInput.value.trim().toLowerCase();

  if (!term) {
    renderSidebar(allBreeds);
    message.innerText = "";
    return;
  }

  const filteredBreeds = {};

  Object.entries(allBreeds).forEach(([breed, subBreeds]) => {
    const breedMatches = breed.toLowerCase().includes(term);
    const subBreedMatches = subBreeds.some((sub) =>
      sub.toLowerCase().includes(term)
    );

    if (breedMatches || subBreedMatches) {
      filteredBreeds[breed] = subBreeds;
    }
  });

  renderSidebar(filteredBreeds);
};

// Ativa a filtragem em tempo real
searchInput.addEventListener("input", filterBreeds);

// 8. Evento do botão "Limpar"
if (clearButton) {
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    message.innerText = "";
    renderSidebar(allBreeds);
  });
}