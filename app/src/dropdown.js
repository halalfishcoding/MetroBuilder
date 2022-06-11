let contextX;
let contextY;

let dropDownFunctions = {
  newLine: () => {
    newLine();
  },
  newStation: () => {
    insertStation(contextX, contextY);
  },
  help: () => {},
  edit: () => {},
  viewDetails: () => {},
  delete: () => {},
};

// Credit to GeorgianStan for the drop down menu

const contextMenu = document.getElementById("context-menu");
const scope = document.querySelector("body");
const menuscope = document.querySelector("context-menu");

function hide(element) {
  document.getElementById(element).style.display = "none";
}

function show(element) {
  document.getElementById(element).style.display = "block";
}

let isOpen = false;
const normalizePozition = (mouseX, mouseY) => {
  let { left: scopeOffsetX, top: scopeOffsetY } = scope.getBoundingClientRect();

  scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
  scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

  const scopeX = mouseX - scopeOffsetX;
  const scopeY = mouseY - scopeOffsetY;

  const outOfBoundsOnX = scopeX + contextMenu.clientWidth > scope.clientWidth;

  const outOfBoundsOnY = scopeY + contextMenu.clientHeight > scope.clientHeight;

  let normalizedX = mouseX;
  let normalizedY = mouseY;

  if (outOfBoundsOnX) {
    normalizedX = scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
  }

  if (outOfBoundsOnY) {
    normalizedY = scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
  }

  return {
    normalizedX,
    normalizedY,
  };
};

scope.addEventListener("contextmenu", (event) => {
  if (!isOpen) {
    event.preventDefault();

    const { normalizedX, normalizedY } = normalizePozition(pt.x, pt.y);

    contextMenu.classList.remove("visible");

    contextMenu.style.top = `${normalizedY}px`;
    contextMenu.style.left = `${normalizedX}px`;

    setTimeout(() => {
      contextMenu.classList.add("visible");
      document.getElementById("body").style.cursor = "block";
      contextX = pt.x;
      contextY = pt.y;
      isOpen = true;
    });
  } else {
    contextMenu.classList.remove("visible");
    isOpen = false;
  }
});

scope.addEventListener("click", (e) => {
  if (e.target.offsetParent != contextMenu) {
    e.preventDefault();
    contextMenu.classList.remove("visible");
    isOpen = false;
  } else {
    let id = document.elementFromPoint(e.clientX, e.clientY).id;
    if (Object.keys(dropDownFunctions).includes(id)) {
      contextMenu.classList.remove("visible");
      isOpen = false;
      dropDownFunctions[id]();
    }
  }
});
