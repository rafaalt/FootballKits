const apiUrl = 'https://api.football-data.org/v3/competitions/';
const apiKey = '5c19ee69f83f4b94b9736ef34d0edaa8';
let timesJson;
const times = document.getElementById("times");
const details = document.getElementById("details");
const container = document.getElementsByClassName("container")[0];

let isShowingDetails = false;

function adicionarTime(time, i){
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<div class="time">
    <img class="escudo" src="logo/br/${time.logo}" alt="${time.name}">
    <h1 class="name">${time.name}</h1>
    </div>`;
    newDiv.addEventListener("click", function(){
        mostrarDetalhes(i);
    });
    times.appendChild(newDiv);
}

function buscarJson(){
    fetch('brasileirao.json')
    .then(response => {
    if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
    })
    .then(jsonData => {
    timesJson = jsonData.teams
    let i = 0;
    jsonData.teams.forEach((time) => {
        adicionarTime(time, i);
        i++;
      });
    })
    .catch(error => {
    console.error('Erro:', error);
    });
}

function mostrarDetalhes(i){
    if(!isShowingDetails){
        container.classList.add('backdrop-blur');
        let y = window.innerHeight;
        let scrollY = window.scrollY;
        var centerY = (y - 600) / 2 + scrollY;
        details.style.top = `${centerY}px`;
        let setaEsquerda = `<img class="seta" onclick="movePrevious(${i})" src="assets/setaEsquerda.png" alt="Voltar">`;
        if (i == 0){
            setaEsquerda = `<img class="semseta" src="assets/setaEsquerda.png" alt="Voltar">`
        }
        let setaDireita = `<img class="seta" onclick="moveNext(${i})" src="assets/setaDireita.png" alt="Voltar">`;
        if (i == timesJson.length -1){
            setaDireita = `<img class="semseta" src="assets/setaDireita.png" alt="Voltar">`
        }
        details.innerHTML = `
        <p class="details-btn" onclick="esconderDetalhes()">X</p>
        <div class="top">
            <div class="dados">
                <h1>${timesJson[i].name}</h1>
            </div>
        </div>
        <div class="down">
            ${setaEsquerda}
            <div class="camisa">
                <img class="img" src="camisas/br/${timesJson[i].kits.year}/${timesJson[i].kits.home}" alt="" srcset="">
                <p class="tipo">Home</p>
            </div>
            <div class="camisa">
                <img class="img" src="camisas/br/${timesJson[i].kits.year}/${timesJson[i].kits.away}" alt="" srcset="">
                <p class="tipo">Away</p>
            </div>
            <div class="camisa">
                <img class="img" src="camisas/br/${timesJson[i].kits.year}/${timesJson[i].kits.third}" alt="" srcset="">
                <p class="tipo">Third</p>
            </div>
            ${setaDireita}
        </div>
        `;
        details.style.display = 'block';
        isShowingDetails = true;
    }
}

function esconderDetalhes(){
    details.style.display = 'none';
    container.classList.remove('backdrop-blur');
    isShowingDetails = false;
}

function movePrevious(id){
    isShowingDetails = false;
    mostrarDetalhes(id-1);
}

function moveNext(id){
    isShowingDetails = false;
    mostrarDetalhes(id+1);
}

buscarJson();