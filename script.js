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

//Display
function displayTodos(todos) {
  resultsDiv.innerHTML = "";

  if (todos.length === 0) {
    resultsDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  todos.forEach(todo => {
    const div = document.createElement("div");
    div.className = "todo-card";

    div.innerHTML = `
      <p><strong>ID:</strong> ${todo.id}</p>
      <p><strong>Title:</strong> ${todo.title}</p>
      <p class="${todo.completed ? 'completed' : 'pending'}">
        Status: ${todo.completed ? "Completed" : "Pending"}
      </p>
    `;

    resultsDiv.appendChild(div);
  });
}