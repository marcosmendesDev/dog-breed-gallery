const pesquisa = document.getElementById("pesquisa");
const botao = document.getElementById("botao");
const image = document.getElementById("img");
const mensagem = document.getElementById("mensagem");


const searchImage = async (breed, subBreed = null) => {
  const breedFormatada = breed.trim().toLowerCase();
  
  let url = `https://dog.ceo/api/breed/${breedFormatada}/images/random`;
  
  if (subBreed) {
    const subFormatada = subBreed.trim().toLowerCase();
    url = `https://dog.ceo/api/breed/${breedFormatada}/${subFormatada}/images/random`;
  }

  const response = await fetch(url);
  const data = await response.json();
  
  if (!response.ok && response.status !== 404) {
    throw new Error("Erro na comunicação com a API");
  }
  
  return data;
};



const loadsidebarlist = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/list/all")
  const data = await response.json();

  const listbreeds = Object.entries(data.message)
  const ul = document.getElementById("list-breeds");

  listbreeds.forEach(([breed,subBreed]) => {
    const li = document.createElement("li");

    if (subBreed.length > 0 ) {
      li.innerText = `${breed} (${subBreed.length} sub-raças)`
    } else {
      li.innerText = breed
    }

    li.style.cursor = "pointer"

    li.addEventListener("click",async () =>{
      const result = await searchImage(breed);

      if (result.status === "success") {
        image.src = result.message;
        image.style.display = "block"
      }
    });
    ul.appendChild(li);
  });
};

loadsidebarlist();


botao.addEventListener("click", async (event) => {
  event.preventDefault();

  // usa o .value para pegar o texto do input
  const valorEntrada = pesquisa.value;

  // Entrada invalida
  if (!valorEntrada.trim()) {
    mensagem.innerText = "Por favor, digite o nome de uma raça";
    mensagem.style.color = "yellow";
    return;
  }

  // carregamento
  mensagem.innerText = "Buscando imagem...";
  mensagem.style.color = "blue";
  image.style.display = "none";
  botao.disabled = true;




  try {
    const result = await searchImage(valorEntrada);

    // ausencia de resultados
    if (result.status !== "success") {
      mensagem.innerText = "Nenhuma imagem encontrada para esta raça";
      mensagem.style.color = "red";
    } else {
      // sucesso
      image.src = result.message;
      image.style.display = "block";
      mensagem.innerText = ""; //limpa a mensagem
    }
  } catch (erro) {
    // erro de comunicação ou processamento
    mensagem.innerText = "Falha de conexão";
    mensagem.style.color = "red";
    console.error("Detalhes do erro:", erro);
  } finally {
    botao.disabled = false;
  }
});
