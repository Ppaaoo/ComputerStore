const loanButton = document.getElementById("getLoan");
const workButton = document.getElementById("work");
const repayLoanButton = document.getElementById("repayLoan");
//repayLoanButton.style.visibility = 'hidden';

const balanceLabel = document.getElementById("balanceLabel");

let balance = 25
let formatted = formatBalance(balance);
document.getElementById("balanceLabel").innerHTML = formatted;

function formatBalance(amount) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount);
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
        document.getElementById("balanceLabel").innerHTML = formattedBalance;
    }
})