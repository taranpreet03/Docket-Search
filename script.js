const API_URL = "https://jsonplaceholder.typicode.com/todos";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let allTodos = [];

// Load data 
async function loadTodos() {
  const response = await fetch(API_URL);
  allTodos = await response.json();
  displayTodos(allTodos); 
}

function displayTodos(todos) {
  resultsDiv.innerHTML = "";

  if (todos.length === 0) {
    resultsDiv.innerHTML = `
      <tr>
        <td colspan="4" class="empty">No results found</td>
      </tr>
    `;
    return;
  }

  //Fetch
  todos.forEach(todo => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.id}</td>
      <td>${todo.userId}</td>
      <td>${todo.title}</td>
      <td class="${todo.completed ? "completed" : "pending"}">
        ${todo.completed ? "Completed" : "Pending"}
      </td>
    `;

    resultsDiv.appendChild(row);
  });
}

// Search filter
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (query === "") {
    displayTodos([]);
    return;
  }
  
  let filtered = [];
  if (!isNaN(query)) {
    filtered = allTodos.filter(todo =>
      todo.id === Number(query)
    );
  } 
  else {
    filtered = allTodos.filter(todo =>
      todo.title.toLowerCase().includes(query)
    );
  }

  displayTodos(filtered);
});


loadTodos();
