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
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn">x</button>
    `;

    list.appendChild(item);
}

// ativa estado inicial do app
function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
}

init();
