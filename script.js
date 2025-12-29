const API_URL = "https://jsonplaceholder.typicode.com/todos"; 


const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

// Fetch data from API
async function fetchTodos() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}
