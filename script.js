const docketInput = document.getElementById("docketInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", searchDocket);

function searchDocket() {
  const docketNumber = docketInput.value.trim();

  // Validation
  if (docketNumber === "") {
    resultDiv.innerHTML = "<p class='error'>Please enter a docket number.</p>";
    return;
  }

  // Loading state
  resultDiv.innerHTML = "<p>Loading...</p>";

  // Example API (replace with real endpoint)
  fetch(`https://dummyjson.com/products}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Docket not found");
      }
      return response.json();
    })
    .then(data => {
      displayResult(data);
    })
    .catch(error => {
      resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
    });
}

function displayResult(data) {
  resultDiv.innerHTML = `
    <div class="success">
      <p><strong>Docket No:</strong> ${data.docketNumber}</p>
      <p><strong>Status:</strong> ${data.status}</p>
      <p><strong>Origin:</strong> ${data.origin}</p>
      <p><strong>Destination:</strong> ${data.destination}</p>
    </div>
  `;
}
