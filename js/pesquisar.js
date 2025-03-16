let animes = []; 

// buscar arquivo json
async function loadAnimes() { //pegar os dados
    try{//corresponder se der erro
        const response = await fetch('https://api-animes-u3m9.onrender.com/');
       if (!response.ok){
        throw new Error('Erro Http Status: ${response.status}');
       }
       const data = await response.json();
       animes = data.animes;
       console.log("Dados carregados", animes);
    } catch (error){
        console.error("Error ao carregar o json:", error);
        document.getElementById('animeList').innerHTML="<p>Erro ao carregar os dados</p>";
    }
}

// função para filtrgem de acordo com oq o usuário digita

function searchAnimes(){
    const query = document.getElementById('search-input').value.toLowerCase();
    const animeList = document.getElementById('animeList');
    animeList.innerHTML = "";  // limpar resultados anteriores

    if(query.length > 2){
        const filteredAnimes = animes.filter(anime => anime.nome.toLowerCase().includes(query));

        if (filteredAnimes.length > 0){
            filteredAnimes.forEach(anime => {
                const div = document.createElement("div");
                div.classList.add("anime-item");
                div.innerHTML =`<h3>${anime.nome}</h3>
                <img src="${anime.imagem}" alt="${anime.nome}">
                <p>${anime.descricao}</p>`;

                animeList.appendChild(div);
            });
        }else {
            animeList.innerHTML = "<p> Nenhum anime encontrado </p>";
        }
    }else{
        animeList.innerHTML = "<p>Digite no pelo menos 3 caracteres</p>";
    }
}
// busca dados quando a página carregar
window.onload = async() => { await loadAnimes();

};

// evento para ativar a busca obs: ponto importante!!! 
document.getElementById('search-button').addEventListener('click', searchAnimes);
document.getElementById('search-input').addEventListener('input', searchAnimes);