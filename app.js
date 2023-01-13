//BankElements
const loanButton = document.getElementById("getLoan");
const workButton = document.getElementById("work");
const repayLoanButton = document.getElementById("repayLoan");
//LaptopElements
const laptopEl = document.getElementById("laptops");
const laptopPrice = document.getElementById("price");
const featuresEL = document.getElementById("features");
const stockEl = document.getElementById("stock");
//repayLoanButton.style.visibility = 'hidden';

const balanceLabel = document.getElementById("balanceLabel");

//Bank
let balance = 25
let formatted = formatBalance(balance);
document.getElementById("balanceLabel").innerText = formatted;

function formatBalance(amount) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'SEK'}).format(amount);
}

loanButton.addEventListener('click', () => {
    let loan = window.prompt("Add amount to loan");
    if (isNaN(parseInt(loan))) {
        alert("Please enter a numeric value");
    }
    if (parseInt(loan) > balance * 2) {
        alert("Loan not approved");
    }
    else {
        balance = balance + parseInt(loan);
        let formattedBalance = formatBalance(balance);
        document.getElementById("balanceLabel").innerText = formattedBalance;
    }
})

//Laptops
let laptopsArr = [];
let featuresArr = [];
let lastSpecLength = 0;

//fetching data from json file
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptopsArr = data)
    .then(laptopsArr => addLaptopsToList(laptopsArr));

const addLaptopsToList = laptopsArr => {
    laptopsArr.forEach(x => addLaptopToList(x));
    laptopPrice.innerText = laptopsArr[0].price;
}

const addLaptopToList = laptop => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopEl.appendChild(laptopElement);
}

const handleMenuChange = e => {
    removeChildElements();
    const selectedLaptop = laptopsArr[e.target.selectedIndex];
    laptopPrice.innerText = selectedLaptop.price;
    for(i = 0; i< selectedLaptop.specs.length; i++) {
        const featureItem = document.createElement("li");
        featureItem.innerText = `${selectedLaptop.specs[i]}`;
        featuresEL.appendChild(featureItem);
    }
    lastSpecLength = selectedLaptop.specs.length;
    stockEl.innerText = `In stock: ${parseInt(selectedLaptop.stock)}`;
}

//Function to clear list of features
function removeChildElements() {
    let child = featuresEL.lastChild;
    while(child) {
        featuresEL.removeChild(child);
        child = featuresEL.lastChild;
    }
}

laptopEl.addEventListener("change", handleMenuChange);
