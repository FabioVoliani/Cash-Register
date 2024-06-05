let price = 19.5;
let cid = [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 1],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];

const cash = document.getElementById("cash");
const displayChangeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const checkCashRegister = () => {
  let changeDue = Number(cash.value) - price;
  let totalCid = cid.reduce((sum, element) => sum + element[1], 0).toFixed(2);
  let reversedCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: "OPEN", change: [] };
  
  if (changeDue < 0) {
    alert("Customer does not have enough money to purchase the item")
  };

  if (changeDue == 0) {
    return displayChangeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`
  };
  
  if (totalCid < changeDue) {
    return displayChangeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`
  };

  for (let i = 0; i <= reversedCid.length; i++) {
    console.log(changeDue)
    if (changeDue > denominations[i] && changeDue > 0) {
      let count = 0;
      let total = reversedCid[i][1];
      while (total > 0 && changeDue >= denominations[i]) {
        total -= denominations[i];
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2))
        totalCid = parseFloat((totalCid -= denominations[i]).toFixed(2))
        count++;
      }
      if (count > 0) {
        result.change.push([reversedCid[i][0], (count * denominations[i]).toFixed(2)]);
      }
    }
  }

  if  (changeDue > 0) {
    return displayChangeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`
  }

  if (totalCid == changeDue) {
    result.status = "CLOSED";
    let stringResult = `Status: ${result.status}`
    for (let i = 0; i < result.change.length; i++) {
      stringResult += ` ${result.change[i][0]}: $${result.change[i][1]}`
    }
    displayChangeDue.innerHTML = stringResult;
  }

  if (totalCid > changeDue) {
    let stringResult = `Status: ${result.status}`
    for (let i = 0; i < result.change.length; i++) {
      stringResult += ` ${result.change[i][0]}: $${result.change[i][1]}`
    }
    displayChangeDue.innerHTML = stringResult;
  }
};

  

const checkResults = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
}

purchaseBtn.addEventListener("click", checkResults);
