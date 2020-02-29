// elementos do DOM
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// transações de gastos e ganhos
const dummyTransactions = [ // transações mocadas temporárias
    {id: 1, text: 'Flower', amount: -20},
    {id: 2, text: 'Salary', amount: 300},
    {id: 3, text: 'Book', amount: -10},
    {id: 4, text: 'Camera', amount: 150},
]

let transactions = dummyTransactions;

// adciona transação na aplicação
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("Please insert a title and amount for the expense")
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value // sinal de + foi inserido para trabsformar o valor em um Number, senão receberiamos um erro 'Uncaught TypeError'
        }
        
        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        text.value = '';
        amount.value = '';
    }
}

// gera ID aleatória
function generateID(){
    return Math.floor(Math.random() * 1000000000); // susbtituir esta lógica por um RANGE
}

// adiciona transações na lista do DOM
function addTransactionDOM(transaction){
    // pega sinal da transação
    const sign = transaction.amount < 0
    ? '-'
    : '+';

    const item = document.createElement('li');

    // adiciona classe baseada no valor da transação
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// atualiza saldos, receitas e despesas
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
    const income = amounts // calcula total de receitas
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
    const expense = (amounts // calcula total de despesas
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

    balance.innerHTML = `$${total}`;
    money_plus.innerHTML = `$${income}`;
    money_minus.innerHTML = `$${expense}`;
}

// remove transação pela ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    init();
}

// ativa estado inicial do app
function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);