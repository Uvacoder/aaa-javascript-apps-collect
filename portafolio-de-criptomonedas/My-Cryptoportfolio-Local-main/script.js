const portfolio = {
    "fiat": "EUR",
    "token":
      [
        {
          "cryptoTicker": "BTC",
          "cryptoName": "Bitcoin",
          "cryptoQty": "0.5",
          "cryptoInvestedSum": "4000"
        },
        {
          "cryptoTicker": "ADA",
          "cryptoName": "Cardano",
          "cryptoQty": "25000",
          "cryptoInvestedSum": "1000"
        },
        {
          "cryptoTicker": "ETH",
          "cryptoName": "Ethereum",
          "cryptoQty": "15",
          "cryptoInvestedSum": "1500"
        },
        {
          "cryptoTicker": "XMR",
          "cryptoName": "Monero",
          "cryptoQty": "50",
          "cryptoInvestedSum": "1000"
        }
      ]
  };

const fiats = [
  { code: "AUD", name: "Australian Dollar", symbol: "$" },
  { code: "BRL", name: "Brazilian real", symbol: "R$" },
  { code: "CAD", name: "Canadian dollar", symbol: "$" },
  { code: "CHF", name: "Swiss franc", symbol: "Fr." },
  { code: "CLP", name: "Chilean peso", symbol: "$" },
  { code: "CNY", name: "Chinese yuan", symbol: "¥" },
  { code: "CZK", name: "Czech koruna", symbol: "Kč" },
  { code: "DKK", name: "Danish krone", symbol: "kr" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "Pound sterling", symbol: "£" },
  { code: "HKD", name: "Hong Kong dollar", symbol: "$" },
  { code: "HUF", name: "Hungarian forint", symbol: "Ft" },
  { code: "IDR", name: "Indonesian rupiah", symbol: "Rp" },
  { code: "ILS", name: "Israeli new shekel", symbol: "₪" },
  { code: "INR", name: "Indian rupee", symbol: "₹" },
  { code: "JPY", name: "Japanese yen", symbol: "¥" },
  { code: "KRW", name: "South Korean won", symbol: "₩" },
  { code: "MXN", name: "Mexican peso", symbol: "$" },
  { code: "MYR", name: "Malaysian ringgit", symbol: "RM" },
  { code: "NOK", name: "Norwegian krone", symbol: "kr" },
  { code: "NZD", name: "New Zealand dollar", symbol: "$" },
  { code: "PHP", name: "Philippine peso", symbol: "₱" },
  { code: "PKR", name: "Pakistani rupee", symbol: "Rs" },
  { code: "PLN", name: "Polish złoty", symbol: "zł" },
  { code: "RUB", name: "Russian ruble", symbol: "₽" },
  { code: "SEK", name: "Swedish krona", symbol: "kr" },
  { code: "SGD", name: "Singapore dollar", symbol: "S$" },
  { code: "THB", name: "Thai baht", symbol: "฿" },
  { code: "TRY", name: "Turkish lira", symbol: "₺" },
  { code: "TWD", name: "New Taiwan dollar", symbol: "NT$" },
  { code: "USD", name: "United States dollar", symbol: "$" },
  { code: "ZAR", name: "South African rand", symbol: "R" }
];

// Download current coin prices from external API. Then call the displayPortfolio function
function downloadCoinPrices() {
    // Array "allTickers" is filled with all crypto tickers.
  let allTickers = portfolio.token.map(item => item.cryptoTicker);
    // console.log('allTicker: ' + allTickers);

    // Create API request URL
  let coinAPI = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + allTickers + "&tsyms=" + portfolio.fiat;
    //console.log('coinAPI: ' + coinAPI);

    // Hide fetch and undhide 2 lines below to show portfolio with locally saved demo prices
    // coinPrices = coinpricesExample;
    // displayPortfolio();

    ///*
  fetch(coinAPI)
    .then(handleErrors)
    .then(res => {
        // console.log(res.clone());//res.json() cannot be used twice in the callback. Thus res.clone() (see https://stackoverflow.com/q/46742251/5263954)
    return res.json();
    })
    .then(prices => {
        // console.log(prices);
    coinPrices = prices;
    displayPortfolio();
        // createChartData();
        // Once tables are fully rendered run the translate function to translate the app)
        // let index = languages.indexOf(userLang);
        // changeAppLanguage(index);
    })
    .catch(error => {
        console.error('There was an error while downloading coin prices:', error.message);
    });
    //*/
}

// Handle errors from fetch operation
function handleErrors(response) {
  // console.log(response);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// Display portfolio on page
function displayPortfolio() {
  let myContainer = document.getElementById("display-portfolio");

  // GET-Anfrage an cryptocompare API
  let thisHTML = "";
  thisHTML += "<table id='portfolio-table'>";
  thisHTML += "<thead>";
  thisHTML += "<tr>";
  thisHTML += "<th id='coin-name' onclick='sortTable(0)' title='Name of Cryptocurrency/Token. Click here to sort alphabetically'>Name <div class='arrows-name'><div title='Descending'></div><div class='triangle-up' title='Ascending'></div></div></th>";
  thisHTML += "<th id='last-price' onclick='sortTable(1)' title='Last price. Click here to sort.'>Last <div class='arrows-name'><div class='triangle-down' title='Descending'></div><div class='triangle-up' title='Ascending'></div></div></th>";
  thisHTML += "<th id='change-perc' onclick='sortTable(2)' title='Change in percent in the last 24h. Click here to sort.'>Change <div class='arrows-name'><div class='triangle-down' title='Descending'></div><div class='triangle-up' title='Ascending'></div></div></th>";
  thisHTML += "<th id='gain-loss-24h' onclick='sortTable(3)' title='Gain/loss in the last 24h. Click here to sort.'>G/L Today <div class='arrows-name'><div class='triangle-down' title='Descending'></div><div class='triangle-up' title='Ascending'></div></div></th>";
  thisHTML += "<th id='gain-loss' onclick='sortTable(4)' title='Overall gain/loss. Click here to sort.'>Gain / Loss <div class='arrows-name'><div class='triangle-down' title='Descending'></div><div class='triangle-up' title='Ascending'></div></div></th>";
  thisHTML += "</tr>";
  thisHTML += "</thead>";

  let i = 0;
  let overallGainLoss = 0;
  let overallGainLossToday = 0;
  let cryptoStyle = "class='cryptoUp'";
  let fiatSymbol = fiats.find(i => i.code === portfolio.fiat).symbol;

  thisHTML += "<tbody>";
  thisHTML += "<tr>";

  for (i = 0; i < Object.keys(coinPrices['RAW']).length; i++) {
    let cryptoTicker = portfolio.token[i].cryptoTicker;
    let fullName = portfolio.token[i].cryptoName;
    let cryptoQty = portfolio.token[i].cryptoQty;
    let cryptoInvestedSum = portfolio.token[i].cryptoInvestedSum;
    let lastPrice = coinPrices['RAW'][cryptoTicker][portfolio.fiat]['PRICE'];
    let changePct24H = coinPrices['RAW'][cryptoTicker][portfolio.fiat]['CHANGEPCT24HOUR'];
    let change24H = coinPrices['RAW'][cryptoTicker][portfolio.fiat]['CHANGE24HOUR'];
    // let fiatSymbol = coinPrices['DISPLAY'][cryptoTicker][portfolio.fiat]['TOSYMBOL'];

    let cryptoGainLoss = 0;
    let cryptoGainLossToday = 0;
    let cryptoBuyingPrice = 0;

    //Some values on CryptoCompare return "null". That would break ".toFixed" below:
    if (changePct24H != null) {
      changePct24H = changePct24H.toFixed(1).concat(" %"); //Example: 2.36: toFixed: Only one digit after the comma (2.4). Concat: Add percentage sign (2.4%).
    }

    if (cryptoQty != 0) {
      cryptoBuyingPrice = cryptoInvestedSum / cryptoQty;
      cryptoGainLoss = cryptoQty * (lastPrice - cryptoBuyingPrice);
      cryptoGainLossToday = cryptoQty * change24H;
      overallGainLoss += cryptoGainLoss;
      overallGainLossToday += cryptoGainLossToday;
    }

    //Code below makes sure that there are not too many digits after the comma. parseFloat is necessary, because lastPrice is apparently considered a string and toFixed only works with numbers.
    if (lastPrice < 0.1) {
      lastPrice = parseFloat(lastPrice).toFixed(3);
    } else if (lastPrice < 10) {
      lastPrice = parseFloat(lastPrice).toFixed(2);
    } else {
      lastPrice = parseFloat(lastPrice).toFixed(0);
    }

    thisHTML += "<td><a href='https://coinmarketcap.com/currencies/" + fullName.toLowerCase() + "' target=_blank>" + fullName + "</a></td>";
    thisHTML += "<td>" + lastPrice + " " + fiatSymbol + "</td>";

    //Change color of changePct24H and cryptoGainLossToday number according to value (-, 0, + -> red, black, green)
    cryptoStyle = redOrGreen(change24H);

    thisHTML += "<td " + cryptoStyle + ">" + changePct24H + "</td>";
    thisHTML += "<td " + cryptoStyle + ">" + cryptoGainLossToday.toFixed(0) + " " + fiatSymbol + "</td>";

    thisHTML += "<td " + redOrGreen(cryptoGainLoss) + ">" + cryptoGainLoss.toFixed(0) + " " + fiatSymbol + "</td>";
    thisHTML += "</tr>";
  }

    thisHTML += "</tbody>";
    thisHTML += "<tfoot>";
    thisHTML += "<tr>";
    thisHTML += "<td>Total</td>";
    thisHTML += "<td></td>";
    thisHTML += "<td></td>";

    thisHTML += "<td " + redOrGreen(overallGainLossToday) + ">" + add1000Separators(overallGainLossToday.toFixed(0)) + " " + fiatSymbol + "</td>";

    thisHTML += "<td " + redOrGreen(overallGainLoss) + ">" + add1000Separators(overallGainLoss.toFixed(0)) + " " + fiatSymbol + "</td>";
    thisHTML += "</tr>";
    thisHTML += "</tfoot>";
    thisHTML += "</table>";

    myContainer.innerHTML = thisHTML;
}

// Sort DISPLAY PORTFOLIO table by clicking on the table headers
function sortTable(n) {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0, xGreaterThanY;
  table = document.getElementById("portfolio-table");
  switching = true;
  let arrowDown = document.getElementsByClassName("arrows-name")[n].firstElementChild;
  let arrowUp = document.getElementsByClassName("arrows-name")[n].lastElementChild;

  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
  //start by saying: no switching is done:
  switching = false;
  rows = table.rows;
  /*Loop through all table rows (except the
  first, which contains table headers and the
  last - table footers):*/
  for (i = 1; i < (rows.length - 2); i++) {
  //start by saying there should be no switching:
  shouldSwitch = false;
  xGreaterThanY = false;
  /*Get the two elements you want to compare,
  one from current row and one from the next:
  n=0: Compare strings
  n>0: Compare numbers*/
  if (n === 0) { //Compare strings
    x = rows[i].getElementsByTagName("TD")[n].innerText.toLowerCase();
    y = rows[i + 1].getElementsByTagName("TD")[n].innerText.toLowerCase();
    if (x > y) xGreaterThanY = true;
  } else { //Compare numbers
    x = rows[i].getElementsByTagName("TD")[n].innerText.replace(/[^-0-9.]/g, '');//Regex: Remove everything except numbers, "-" and ".",e.g. "-35.6 %" --> "-35.6"
    y = rows[i + 1].getElementsByTagName("TD")[n].innerText.replace(/[^-0-9.]/g, '');
    if (Number(x) > Number(y)) xGreaterThanY = true;
  }
  /*check if the two rows should switch place,
  based on the direction, asc or desc:*/
  if (dir == "asc") {
  //xGreaterThanY = true: switch rows!
  if (xGreaterThanY) {
      shouldSwitch = true;
      break;
  }
  } else if (dir == "desc") {
  //if xGreaterThanY = false AND the 2 numbers are not equal: switch rows! 2nd condition important because if numbers are equal there would be an infinite loop
  if (!xGreaterThanY && Number(x) !== Number(y)) {
      shouldSwitch = true;
      break;
  }
  }
  }
  if (shouldSwitch) {
  /*If a switch has been marked, make the switch
  and mark that a switch has been done:*/
    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    switching = true;
      //Each time a switch is done, increase this count by 1:
    switchcount++;
  } else {
  /*If no switching has been done AND the direction is "asc",
  set the direction to "desc" and run the while loop again.*/
  if (switchcount == 0 && dir == "asc") {
    dir = "desc";
    switching = true;
  }
  }
  }
  //Set the display of arrows according to "asc" or "desc"
  showAllArrows(); //Show all arrows in the header, which might have been hidden during previous sort operation
    if (dir == "asc") arrowDown.classList.remove("triangle-down"); //Change display to UP arrow only.
    else if (dir == "desc") arrowUp.classList.remove("triangle-up"); //Change display to DOWN arrow only.
  }

  //Show all sort arrows
function showAllArrows() {
  let allArrows = document.getElementsByClassName("arrows-name");
  for (let i = 0; i < allArrows.length; i++) {
    let arrowDown = document.getElementsByClassName("arrows-name")[i].firstElementChild;
    let arrowUp = document.getElementsByClassName("arrows-name")[i].lastElementChild;
    arrowDown.classList.add("triangle-down");
    arrowUp.classList.add("triangle-up");
  }
}

  // If value fell: red, value rose: green
function redOrGreen(value) {
  let cryptoStyle;
  if (value == 0) {
    cryptoStyle = "";
  } else if (value < 0) {
    cryptoStyle = "class='cryptoDown'";
  } else {
    cryptoStyle = "class='cryptoUp'";
  }
    return cryptoStyle;
}

//Add a dot as thousand separator
function add1000Separators(nStr) {
  //Example: nStr = 1427900000.45
  nStr += ''; //Convert input to string
  const x = nStr.split('.');//Split string at . into arrays [ '1427900000', '45' ]
  let x1 = x[0]; // 1427900000
  const x2 = x.length > 1 ? ',' + x[1] : ''; //,45
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2'); // 1427900.000 --> 1427.900.000 --> 1.427.900.000
  }
    return x1 + x2; // 1.427.900.000,45
}

downloadCoinPrices();