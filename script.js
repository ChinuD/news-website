// let timeDisplay=document.getElementById("timeDisplay");
let timeDisplay = document.getElementById("time");
function displayTime() {
  let time = new Date();
  let hours = time.getHours();
  let h = hours < 10 ? "0" + hours : hours;
  let minutes = time.getMinutes();
  let m = minutes < 10 ? "0" + minutes : minutes;
  let seconds = time.getSeconds();
  let s = seconds < 10 ? "0" + seconds : seconds;
  timeDisplay.innerHTML = h + ":" + m + ":" + s;
}
setInterval(displayTime, 1000);

const apiUrl = "https://newsapi.org/v2/everything?q=";
const apiKey = "&apiKey=7bf34865cdf34542ba5d6e1c279aa86b";
let inputValue = document.getElementById("inputValue");

const newsContainer = document.getElementById("newsContain");

async function loadData(inputValue) {
  const response = await fetch(apiUrl + `q=${inputValue}` + apiKey);
  const data = await response.json();
  console.log(data);
  console.log(data.articles);
  let apiData = data.articles;
  
  const createNewsCard = (newsItem) => {
    if(!newsItem.urlToImage){
        return;
    }
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = ` <img src="${newsItem.urlToImage}" alt="${newsItem.title}"> <h3>${newsItem.title}</h3> <p>${newsItem.description}</p> `;
    newsContainer.appendChild(card);
    card.addEventListener('click', () => { window.location.href = newsItem.url}) 
  };
  apiData.forEach((newsItem) => createNewsCard(newsItem));

}
document.addEventListener('DOMContentLoaded', () => { loadData('latest news'); });

const searchBox = document.getElementById("searchBtn");
searchBox.addEventListener("click", (e) => {
  e.preventDefault();
  newsContainer.innerHTML = " "
  loadData(inputValue.value);
});

