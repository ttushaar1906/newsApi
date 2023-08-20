const api_keys = "df73aa699f3f4efd91b77793e6cfebd4";
const url = 'https://newsapi.org/v2/everything?q='

window.addEventListener('load',()=> fetchNews('India'));

function reload() {
   window.location.reload();
}

async function fetchNews (query){
   const res = await fetch(`${url}${query}&apikey=${api_keys}`)
   const data = await res.json();
   console.log(data)
   bindData(data.articles);
}
function bindData(articles){
   const cardContainer = document.getElementById('card-container');
   const newsCardsTempalte = document.getElementById('template-card') 
   
   cardContainer.innerHTML='';
   
   articles.forEach((article) =>{
      if(!article.urlToImage)return;
      const cardClone = newsCardsTempalte.content.cloneNode(true)
      fillDataInClone(cardClone,article)
      cardContainer.appendChild(cardClone);
   });
}
function fillDataInClone(cardClone,article){
   const newImg = cardClone.querySelector('#news-img');
   const newTitle = cardClone.querySelector('#news-title');
   const newDesc = cardClone.querySelector('#news-desc');
   const newSource = cardClone.querySelector('#news-source');

   newImg.src = article.urlToImage;
   newTitle.innerHTML = article.title;
   newDesc.innerHTML = article.description;

   const date = new Date(article.publishedAt).toLocaleString("en-US",{
      timeZone:'Asia/Jakarta',
   });
   newSource.innerHTML = `${article.source.name}.${date}`;

   cardClone.firstElementChild.addEventListener('click',()=>{
      window.open(article.url,"_blank");
   })
}

const curSelectedNav= null;
function onnavItemclick(id){
   fetchNews(id);
   const navItem = document.getElementById(id);
   curSelectedNav?.classList.remove('active');
   curSelectedNav=navItem;
   curSelectedNav.classList.add('active')
}

const searchButton = document.getElementById('search-btn')
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
   const query =searchText.value;
   if(!query) return;
   fetchNews(query);
})