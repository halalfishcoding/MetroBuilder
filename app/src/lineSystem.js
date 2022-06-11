function fetchStations(branches) {
  console.log(branches);
  stations = [];
  if (branches[0].length > 0) {
    branches.forEach((n) => {
      n.forEach((b) => {
        if (!stations.includes(b)) {
          stations.push(b);
        }
      });
      return stations;
    });
  } else {
    return stations;
  }
}

stations = {};
lines = {};

function createStation(name, connectingStations) {
  let stationID = Object.keys(stations).length + 1;
  stations[stationID] = {
    name: name,
    connectingStations: connectingStations,
  };
  return stationID;
}

function judgeStationType(stationID) {
  let connectingStations = stations[stationID].connectingStations;
  if (connectingStations.length == 1) return "terminal";
  else if (connectingStations.length == 2) return "inline";
  else if (connectingStations.length >= 3) return "fork";
  else return "genesis";
}

function convertIDToName(id) {
  return stations[id].name;
}

class line {
  constructor(name) {
    this.name = name;
    this.branches = [[]];
    this.rollingStock = "s8 stock";
    this.colour = "green";
    this.dateCreated = Date.now();
  }

  sortStations(branch) {
    let sorted = [];
    branch = this.branches[branch];
    let terminalStations;
    branch.forEach((b) => {
      terminalStations = [];

      b.forEach((s) => {
        if (stations[s].connectingStations == 1) {
          terminalStations.push(s);
        }
      });

      if (terminalStations.length == 2) {
        let prevStation = terminalStations[0];
        let currStation = stations[prevStation].connectingStations[0];
        sorted.push(prevStation);
        sorted.push(currStation);

        while (!terminalStations.includes(currStation)) {
          stations[currStation].connectingStations.forEach((s) => {
            if (s !== prevStation) {
              if (branch.includes(s)) {
                sorted.push(s);
                prevStation = currStation;
                currStation = s;
              }
            }
          });
        }

        return sorted;
      } else if (terminalStations.length == 1) {
        return [terminalStations[0]];
      } else {
        throw console.error("Invalid Data");
      }
    });
  }

  addStation(stationID, branch, connectingStations) {
    if (!this.branches[branch].includes(stationID))
      this.branches[branch].push(stationID);

    connectingStations.forEach((s) => {
      if (this.branches[branch].includes(s)) {
        if (!stations[s].connectingStations.includes(stationID)) {
          stations[s].connectingStations.push(stationID);
        }
        if (!stations[stationID].connectingStations.includes(s)) {
          stations[stationID].connectingStations.push(s);
        }
      }
    });
  }
}

function newLine() {
  Swal.fire({
    title: "Enter Line Name",
    input: "text",
    // backdrop: true,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Create",
    showLoaderOnConfirm: true,
    preConfirm: (name) => {
      return name;
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.value && !result.isDismissed) {
      if (result.value.toLowerCase().includes("line")) {
        result.value = result.value.toLowerCase().replace("line", "");
      }
      result.value =
        result.value.charAt(0).toUpperCase() + result.value.slice(1);
      result.value += " Line";
      Swal.fire("Success!", result.value + " created!", "success");
      lines[result.value] = new line(result.value);
      showCard(result.value);
      selectedLine = result.value;
    }
    console.log(result);
  });
}
