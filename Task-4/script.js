// Get DOM elements
const form = document.getElementById("entry-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const entriesList = document.getElementById("entries-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const netBalanceEl = document.getElementById("net-balance");
const filters = document.querySelectorAll("input[name='filter']");

// Load entries from localStorage
let entries = JSON.parse(localStorage.getItem("entries")) || [];

// Save to localStorage
function saveEntries() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

// Calculate totals
function updateTotals() {
  let income = entries
    .filter(e => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  let expense = entries
    .filter(e => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  totalIncomeEl.textContent = income.toFixed(2);
  totalExpenseEl.textContent = expense.toFixed(2);
  netBalanceEl.textContent = (income - expense).toFixed(2);
}

// Render entries
function renderEntries() {
  entriesList.innerHTML = "";
  let filterValue = document.querySelector("input[name='filter']:checked").value;

  let filteredEntries = entries.filter(entry =>
    filterValue === "all" ? true : entry.type === filterValue
  );

  filteredEntries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = `entry ${entry.type}`;
    li.innerHTML = `
      <span>${entry.description} - ${entry.amount}</span>
      <div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Edit functionality
    li.querySelector(".edit").addEventListener("click", () => {
      descriptionInput.value = entry.description;
      amountInput.value = entry.amount;
      typeInput.value = entry.type;

      // Remove old entry before updating
      entries.splice(index, 1);
      saveEntries();
      renderEntries();
      updateTotals();
    });

    // Delete functionality
    li.querySelector(".delete").addEventListener("click", () => {
      entries.splice(index, 1);
      saveEntries();
      renderEntries();
      updateTotals();
    });

    entriesList.appendChild(li);
  });

  updateTotals();
}

// Add new entry
form.addEventListener("submit", e => {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (description && !isNaN(amount)) {
    entries.push({ description, amount, type });
    saveEntries();
    renderEntries();
    form.reset();
  }
});

// Filter change
filters.forEach(filter => {
  filter.addEventListener("change", renderEntries);
});

// Initial render
renderEntries();