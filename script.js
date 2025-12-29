const API_URL = "https://jsonplaceholder.typicode.com/users/";

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let allUsers = [];

// Load data 
async function loadUsers() {
  try {
    const response = await fetch(API_URL);
    allUsers = await response.json();
    displayUsers(allUsers);
  } catch (error) {
    console.error("Error fetching data", error);
  }
}
function displayUsers(users) {
  resultsDiv.innerHTML = "";

  if (users.length === 0) {
    resultsDiv.innerHTML = `
      <tr>
        <td colspan="5" class="empty">No results found</td>
      </tr>
    `;
    return;
  }

  users.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
    `;
    resultsDiv.appendChild(row);
  });
}
// Search filter
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (query === "") {
    displayUsers(allUsers);
    return;
  }

  let filteredUsers;

  // ID
  if (!isNaN(query)) {
    filteredUsers = allUsers.filter(user => user.id === Number(query));
  } 
  //Name
  else {
    filteredUsers = allUsers.filter(user =>
      user.name.toLowerCase().includes(query)
    );
  }
  displayUsers(filteredUsers);
});

loadUsers();
