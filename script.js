const pesquisa = document.getElementById("pesquisa");
const botao = document.getElementById("botao");
const image = document.getElementById("img");
const mensagem = document.getElementById("mensagem");

const fetchApi = async (raca) => {
  // formata para minuscula e maiuscula e remove espaçoes
  const racaFormatada = raca.trim().toLowerCase();
  // faz a requisição
  const resposta = await fetch(
    `https://dog.ceo/api/breed/${racaFormatada}/images/random`,
  );
  // // converte a resposta bruta em objeto json
  const data = await resposta.json();

  if (!resposta.ok && resposta.status !== 404) {
    throw new Error("Erro na comunicação com a API");
  }
  return data;
};

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
  botao.Disabled = true;

  try {
    const resultado = await fetchApi(valorEntrada);

    // ausencia de resultados
    if (resultado.status !== "success") {
      mensagem.innerText = "Nenhuma imagem encontrada para esta raça";
      mensagem.style.color = "red";
    } else {
      // sucesso
      image.src = resultado.message;
      image.style.display = "block";
      mensagem.innerText = ""; //limpa a mensagem
    }
  } catch (erro) {
    // erro de comunicação ou processamento
    mensagem.innerText = "Falha de conexão";
    mensagem.style.color = "red";
    console.error("Detalhes do erro:", erro);
  } finally {
    botao.Disabled = false;
  }
});
