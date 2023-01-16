//BankElements
const loanButton = document.getElementById("getLoanButton");
const repayLoanButton = document.getElementById("repayLoanButton");
const balanceLabel = document.getElementById("balanceLabel");

//WorkElements
const workButton = document.getElementById("workButton");
const bankButton = document.getElementById("bankButton");
const payEl = document.getElementById("pay");

//LaptopElements
const laptopEl = document.getElementById("laptops");
const laptopPrice = document.getElementById("price");
const featuresEL = document.getElementById("features");
const stockEl = document.getElementById("stock");
const imageEl = document.getElementById("laptopImage");

//Bank
let balance = 25
//Default balance to screen
let formatted = formatBalance(balance);
balanceLabel.innerText = formatted;

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
        balanceLabel.innerText = formattedBalance;
    }
})

//Work
let workPay = 0;
let workTotal = 0;
//Default pay to screen
let formattedPay = formatBalance(0);
payEl.innerText = formattedPay;

const getWorkMoney = () => {
    workTotal = workPay += 100;
    let formattedWorkTotal = formatBalance(workTotal);
    payEl.innerText = formattedWorkTotal;
}

const bankMoney = () => {
    balance += workTotal;
    let formattedBalance = formatBalance(balance);
    balanceLabel.innerText = formattedBalance;
}

workButton.addEventListener('click', getWorkMoney);
bankButton.addEventListener('click', bankMoney);

//Laptops
let laptopsArr = [];
let featuresArr = [];
let imageURL = "https://hickory-quilled-actress.glitch.me/assets/images/";

//Adding default features to screen. Probably not the best way of doing this, look into this later
featuresArr[0] = `Has a screen`;
featuresArr[1] = `Keyboard works, mostly`;
featuresArr[2] = `32MB Ram (Not upgradeable)`;
featuresArr[3] = `6GB Hard Disk`;
featuresArr[4] = `Comes with Floppy Disk Reader (Free) - Requires cable`;
featuresArr[5] = `Good excersice to carry`;

for(i = 0; i< featuresArr.length; i++) {
    const featureItem = document.createElement("li");
    featureItem.innerText = featuresArr[i];
    featuresEL.appendChild(featureItem);
}

//Fetching data from json file
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptopsArr = data)
    .then(laptopsArr => addLaptopsToList(laptopsArr));

const addLaptopsToList = laptopsArr => {
    laptopsArr.forEach(x => addLaptopToList(x));
    laptopPrice.innerText = formatBalance(laptopsArr[0].price);
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
    laptopPrice.innerText = formatBalance(selectedLaptop.price);
    for(i = 0; i< selectedLaptop.specs.length; i++) {
        const featureItem = document.createElement("li");
        featureItem.innerText = `${selectedLaptop.specs[i]}`;
        featuresEL.appendChild(featureItem);
    }
    stockEl.innerText = `In stock: ${parseInt(selectedLaptop.stock)}`;
    imageEl.src = `${imageURL}${e.target.selectedIndex + 1}.png`;
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
