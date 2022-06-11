let width = window.innerWidth;
let height = window.innerHeight;
let newpos;
let newScale;
let direction;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
  draggable: true,
});

let mainLayer = new Konva.Layer();
stage.add(mainLayer);
let stationLayer = new Konva.Layer();
stage.add(stationLayer);

function drawStationCircle(stationID, x, y) {
  console.log(x, y);
  stations[stationID] = {
    circles: {
      outer: new Konva.Circle({
        x: x,
        y: y,
        radius: 15,
        fill: "black",
        name: "station" + stationID,
      }),
      inner: new Konva.Circle({
        x: x,
        y: y,
        radius: 10,
        fill: "white",
        name: "station" + stationID,
      }),
    },
  };
  stationLayer.add(stations[stationID].circles.outer);
  stationLayer.add(stations[stationID].circles.inner);
}

function insertStation(x, y) {
  var textNode = new Konva.Text({
    text: "Station Name",
    x: x + 12,
    y: y + 12,
    fontSize: 20,
  });
  console.log(pt.x, pt.y);
  mainLayer.add(textNode);

  var textPosition = textNode.getAbsolutePosition();

  // then lets find position of stage container on the page:
  var stageBox = stage.container().getBoundingClientRect();

  // so position of textarea will be the sum of positions above:
  var areaPosition = {
    x: textPosition.x,
    y: textPosition.y,
  };

  // create textarea and style it
  var textarea = document.createElement("textarea");
  document.body.appendChild(textarea);

  textarea.value = textNode.text();
  textarea.style.position = "absolute";
  textarea.style.top = areaPosition.y + "px";
  textarea.style.left = areaPosition.x + "px";
  textarea.style.width = textNode.width();

  textarea.focus();
  stationID = createStation(textarea.value, []);
  textarea.addEventListener("keydown", function (e) {
    // hide on enter
    if (e.keyCode === 13) {
      createStation(textarea.value);
      drawStationCircle(stationID, x, y);
      textNode.text(textarea.value);
      document.body.removeChild(textarea);
    }
  });
}

const mouseSensitivity = 1.21;
stage.on("wheel", (e) => {
  e.evt.preventDefault();

  var oldScale = stage.scaleX();
  var pointer = stage.getPointerPosition();

  var mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  direction = e.evt.deltaY > 0 ? -1 : 1;

  if (e.evt.ctrlKey) {
    direction = -direction;
  }

  newScale =
    direction > 0 ? oldScale * mouseSensitivity : oldScale / mouseSensitivity;

  stage.scale({
    x: newScale,
    y: newScale,
  });

  newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };
  stage.position(newPos);

  console.log(newScale);
  // document.getElementById("cursor").style.width = newScale * 10
  // document.getElementById("cursor").style.height = newScale * 10
});

function scroll(scale) {
  stage.scale({
    x: scale,
    y: scale,
  });

  stage.position({
    x: 0,
    y: 0,
  });
}

var slider = document.getElementById("slider");

slider.oninput = function () {
  scroll(this.value);
};

mainLayer.on("mousedown", (e) => {
  console.log(e.target.attrs);
  if (e.target.attrs.name.includes("station")) {
    st = e.target.attrs.name.substr(7);
    console.log(e.target.atts.name);
    stage.draggable(false);
  } else {
    stage.draggable(true);
  }
});

function toggleView(item) {
  item = document.getElementById(item);
  if (item.style.display == "block") {
    item.style.display = "none";
  } else {
    item.style.display = "block";
  }
}
