alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
stations = {}
lines = {}

def new_line():
    name = input("Please enter a name for this line: ")
    print("Creating genesis branch (branch A) on line "+name)
    lines[name] = [[]]

def new_branch():
    line = input("Please enter a line: ")
    lines[line].append([])

def add_station(station_name, branch, line, connecting_stations):
    if len(connecting_stations) == 0:
        station_type = "genesis"
    elif len(connecting_stations) == 1:
        station_type = "terminal"
    elif len(connecting_stations) == 2:
        station_type = "inline"
    elif len(connecting_stations) >=3:
        station_type = "fork"

    stations[station_name] = {
        "line": line,
        "branch":branch,
        "connecting_stations": connecting_stations,
        "station_type":station_type
    }

    # branches present in 
    branches_present_in = []
    if station_type == "genesis":
        lines[line][branch].append(station_name)
    else:
        for b in range(0, len(lines[line])):
            for n in lines[line][b]:
                if n in connecting_stations:
                    branches_present_in.append(b)


        for b in branches_present_in:
            if station_name not in lines[line][b]:
                lines[line][b].append(station_name)
        
        for st in connecting_stations:
            if station_name not in stations[st]["connecting_stations"]:
                stations[st]["connecting_stations"].append(station_name)
    

def edit_line():
    line = input("Which line would you like to edit> ")

    print("")
    for n in range(0,len(lines[line])):
        print("Branch " + alpha[n] + ":" + str(lines[line][n]))

    print("")
    branch = input("Select a branch> ")[0].lower()
    for n in range(0, len(alpha)):#

        if str(branch) == str(alpha[n]):
            br = n
            break

    while True:
        m = input("1: Add a station\n2: Edit a Station\n3: Exit \n>")
        if m == "1":
            name = input("Enter station name> ")
            connecting_stations = []
            while True:
                stat = input("Enter existing stations to connect (or nothing if this is the genesis station) \nE to Exit:> ")
                if stat:
                    if stat.lower() == "e":
                        break
                    if stat in stations:
                        connecting_stations.append(stat)
                else:
                    add_station(name, br, line, connecting_stations)
                    break    
                add_station(name, br, line, connecting_stations)
        
                    
                    


        elif m == "2":
            print("Edit a station")
        else:
            return

def locate_terminal_stations(branch):
    res = []
    for station in branch:
        if len(stations[station]["connecting_stations"]) == 1:
            res.append(station)
    
    return res


def print_map():
    print(lines)
    print(stations)
    
    for line in lines:
        print(line)
        for branch in lines[line]:
            to_print = []
            
            n = branch
            print(n)
            if len(n) > 1:
                terminal_stations = locate_terminal_stations(n)
                
                
                prev_station = terminal_stations[0]
                curr_station = stations[prev_station]["connecting_stations"][0]
                to_print.append(prev_station)
                to_print.append(curr_station)

                while True:
                    if curr_station in terminal_stations:

                        break
                    for n in stations[curr_station]["connecting_stations"]:
                        if n in branch:
                            if n != prev_station:
                                to_print.append(n)
                                prev_station = curr_station
                                curr_station = n
                                break
                
                print(to_print)

            else:
                print("GENESIS STATION: " + n[0])




def main():
    while True:
        n = input("\n1: New Line \n2: New Line Branch \n3: Edit Line \n4: Print Map\n\n>")
        if n == "1":
            new_line()
        elif n == "2":
            new_branch()
        elif n == "3":
            edit_line()
        elif n == "4":
            print_map()

if 'main' in __name__:
    main()
