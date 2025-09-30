let stocks = [
  { symbol: "AAPL", price: 253.43, volume: 12_300_000, sector: "Tech" },
  { symbol: "MSFT", price: 514.60, volume: 17_430_000, sector: "Tech" },
  { symbol: "JPM", price: 315.69, volume: 1_592_345, sector: "Finance" },
  { symbol: "XOM", price: 114.22, volume: 19_188_195, sector: "Energy" }
];

function displayStocks(data) {
  let tbody = document.querySelector("#stockTable tbody");
  tbody.innerHTML = "";
  data.forEach(stock => {
    let row = `<tr>
      <td>${stock.symbol}</td>
      <td>${stock.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
      <td>${stock.volume.toLocaleString()}</td>
      <td>${stock.sector}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function calculateAverage() {
  let total = 0;
  stocks.forEach(s => total += s.price);
  let avg = total / stocks.length;
  document.getElementById("average").innerText =
    "Average Price: " + avg.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function filterBySector() {
  let sector = document.getElementById("sectorFilter").value;
  if (sector === "all") {
    displayStocks(stocks);
  } else {
    let filtered = stocks.filter(s => s.sector === sector);
    displayStocks(filtered);
  }
}

function findHighestVolume() {
  let highest = stocks[0];
  stocks.forEach(s => {
    if (s.volume > highest.volume) {
      highest = s;
    }
  });
  document.getElementById("highestVolume").innerText =
    "Highest Volume: " + highest.symbol + " (" + highest.volume.toLocaleString() + ")";
}

function groupByPrice() {
  let low = stocks.filter(s => s.price < 120);
  let medium = stocks.filter(s => s.price >= 120 && s.price <= 200);
  let high = stocks.filter(s => s.price > 200);

  document.getElementById("grouped").innerText =
    "Low (<120): " + low.map(s => `${s.symbol} (${s.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}, Vol: ${s.volume.toLocaleString()})`).join(", ") +
    " | Medium (120-200): " + medium.map(s => `${s.symbol} (${s.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}, Vol: ${s.volume.toLocaleString()})`).join(", ") +
    " | High (>200): " + high.map(s => `${s.symbol} (${s.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}, Vol: ${s.volume.toLocaleString()})`).join(", ");
}

async function fetchNewData() {
  document.getElementById("fetchResult").innerText = "Fetching new data...";
  await new Promise(resolve => setTimeout(resolve, 2000));

  let newStock = { symbol: "TSLA", price: 442.16, volume: 79_920_000, sector: "Tech" };
  stocks.push(newStock);

  displayStocks(stocks);
  document.getElementById("fetchResult").innerText =
    "New stock data added: " + newStock.symbol +
    " (" + newStock.price.toLocaleString("en-US", { style: "currency", currency: "USD" }) +
    ", Vol: " + newStock.volume.toLocaleString() + ")";
}

// Show the initial data
displayStocks(stocks);
