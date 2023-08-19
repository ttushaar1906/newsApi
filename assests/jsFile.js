const api_keys = "df73aa699f3f4efd91b77793e6cfebd4";
const url = 'https://newsapi.org/v2/everything?q='

window.addEventListener('load',()=> fetchNews('india'));

async function fetchNews (query){
   const res = await fetch(`${url}${query}&apikey=${api_keys}`)
   const data = await res.json();
   console.log(data)
}