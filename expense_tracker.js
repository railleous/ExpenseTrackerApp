let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

document.addEventListener('DOMContentLoaded', function() {
    expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    renderExpenseTable();
});

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const newExpense = { id: Date.now(), category, amount, date };
    expenses.push(newExpense);
    updateLocalStorage();

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    renderExpenseTable();
    resetInputFields();
});

function renderExpenseTable() {
    expensesTableBody.innerHTML = '';

    for (const expense of expenses) {
        const newRow = expensesTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const editCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;

        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function() {
            editExpense(expense.id);
        });

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            deleteExpense(expense.id);
        });

        editCell.appendChild(editBtn);
        deleteCell.appendChild(deleteBtn);
    }
}

function editExpense(id) {
    const expenseToEdit = expenses.find(expense => expense.id === id);

    categorySelect.value = expenseToEdit.category;
    amountInput.value = expenseToEdit.amount;
    dateInput.value = expenseToEdit.date;

    deleteExpense(id);
}

function deleteExpense(id) {
    const index = expenses.findIndex(expense => expense.id === id);
    const deletedAmount = expenses[index].amount;

    totalAmount -= deletedAmount;
    totalAmountCell.textContent = totalAmount;

    expenses.splice(index, 1);
    updateLocalStorage();
    renderExpenseTable();
}

function resetInputFields() {
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
}

function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}