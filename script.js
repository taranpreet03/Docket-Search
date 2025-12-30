const API_URL = "https://jsonplaceholder.typicode.com/users/";

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const popup = document.getElementById("userPopup");
const popupContent = document.getElementById("popupContent");
const overlay = document.getElementById("overlay");

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
      <td style="text-align:center">
        <button class="view-btn" onclick="openPopup(${user.id})">View</button>
      </td>
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


//popup
function openPopup(id) {
  const user = allUsers.find(u => u.id === id);

  popupContent.innerHTML = `
    <h3>${user.name}</h3>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Website:</strong> ${user.website}</p>

    <h4>Address</h4>
    <p>
      ${user.address.street}, ${user.address.suite}<br>
      ${user.address.city} - ${user.address.zipcode}
    </p>

    <h4>Company</h4>
    <p>${user.company.name}</p>
  `;

  popup.classList.add("show");
  overlay.classList.add("show");
}

// Close popup
function closePopup() {
  popup.classList.remove("show");
  overlay.classList.remove("show");
}

loadUsers();
