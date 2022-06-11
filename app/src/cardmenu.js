rollingStockImg = {
  "s8 stock": "sstock.jpg",
  "2009 stock": "2009stock.jpg",
  "1996 stock": "1996stock.jpg",
  "1992 stock": "1992stock.jpg",
  "1973 stock": "1973stock.webp",
  "1972 stock": "1972stock.jpg",
};

function showCard(lineName) {
  console.log("csafjasf");
  show("cardMenu");
  show("infoMenu");
  console.log(lines[lineName]);
  document.getElementById("stockImage").src =
    "/img/rollingstock/" + rollingStockImg[lines[lineName].rollingStock];
  document.getElementById("lineTitle").innerText = lineName;
  document.getElementById("titleContainer").style =
    "background-color: " +
    lines[lineName].colour +
    "; text-align:center;padding:5px;";
}

function cardEditMenu() {
  let line = selectedLine;
  // console.log(line)
  // lineName = line;
  // line = lines[line];
  show("editMenu");
  hide("infoMenu");
  colourSelect = document.getElementById("colourSelect");
  colour = lines[line].colour;

  for (var i, j = 0; (i = colourSelect.options[j]); j++) {
    if (i.value.toLowerCase() == colour) {
      colourSelect.selectedIndex = j;
      break;
    }
  }

  stockSelect = document.getElementById("stockSelect");
  rollingStock = lines[line].rollingStock;

  for (var i, j = 0; (i = stockSelect.options[j]); j++) {
    if (i.value.toLowerCase() == rollingStock) {
      stockSelect.selectedIndex = j;
      break;
    }
  }
}

function saveEdits() {
  let lineName = document.getElementById("lineTitle").innerText;
  console.log(lineName);
  lines[lineName].colour = document
    .getElementById("colourSelect")
    .value.toLowerCase();
  lines[lineName].rollingStock = document
    .getElementById("stockSelect")
    .value.toLowerCase();
  goBack();
}

function goBack() {
  let lineName = document.getElementById("lineTitle").innerText;
  hide("editMenu");
  showCard(lineName);
}
