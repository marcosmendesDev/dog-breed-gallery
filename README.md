*# Galeria de Raças de Cães 

**Disciplina:** Programação Web  
**Professor:** Eyder Rios  
**Projeto:** 1ª Avaliação - Trabalho de Implementação (Problema 08)  

## Integrantes
* [João Pedro Aguiar Teixeira]
* [Marcos Vincius Mendes De Carvalho]

## Descrição do Projeto
Aplicação web de pequeno porte desenvolvida para consulta de raças de cães e exibição de imagens relacionadas. O usuário pode visualizar as raças disponíveis na tela inicial, realizar buscas específicas e explorar uma galeria interativa de imagens. O sistema foi construído com foco em acessibilidade, responsividade e manipulação dinâmica de interface utilizando tecnologias web nativas.

## Principais Funcionalidades
* **Listagem de Raças (RF01):** Apresentação automática das raças e sub-raças disponíveis logo ao iniciar a aplicação.
* **Pesquisa Dinâmica (RF02):** Barra de pesquisa para localizar raças pelo nome, ignorando diferenças entre maiúsculas/minúsculas e permitindo limpar o filtro para voltar à lista original.
* **Galeria de Imagens (RF03):** Exibição de uma galeria com imagens da raça selecionada (mínimo de 6 imagens exibidas quando a API fornece a quantidade).
* **Atualização em Tempo Real (RF04):** Recurso para carregar novas fotos da mesma raça na galeria sem a necessidade de atualizar a página (requisições assíncronas).
* **Experiência do Usuário (RF05):** Tratamento completo de estados da interface: telas de carregamento (loading), feedbacks de "pesquisa sem resultados", tratamento de imagens quebradas/indisponíveis e uso de textos alternativos (`alt`) adequados.

## API Utilizada
Os dados e imagens são consumidos em tempo de execução através da **Dog CEO API**.
* **Documentação Oficial:** [https://dog.ceo/dog-api/](https://dog.ceo/dog-api/)

## Tecnologias
* **HTML5:** Estruturação com marcação semântica e acessível.
* **CSS / Tailwind CSS:** Estilização da interface focando em design responsivo para diferentes tamanhos de tela.
* **Typescript:** Lógica de interface, manipulação do DOM e uso da `Fetch API` para as operações assíncronas de rede.
* *(Nenhum framework JavaScript como React/Angular ou banco de dados externo será utilizado, atendendo às restrições do trabalho).*

## Instruções de Execução

Como o projeto é executado inteiramente no lado do cliente (Client-side) no navegador, não é necessária a instalação de ambientes complexos.

1. Clone este repositório para o seu computador:
   ```bash
   git clone https://github.com/pedroaguiarcd/dog-breed-gallery
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd [dog-breed-gallery]
   ```

3. Abra o arquivo `index.html` em qualquer navegador web moderno de sua preferência (Chrome, Firefox, Edge, Safari).
   * **Recomendação:** Se estiver utilizando o Visual Studio Code, recomendamos abrir o projeto usando a extensão **Live Server** para uma melhor experiência durante a visualização.
