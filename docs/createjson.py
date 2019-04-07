import sys
import json
sys.path.append("C:/Users/maria/Anaconda3/Lib/site-packages")

readfile = open("C:/Users/maria/OneDrive/WUSTL/2018-19/CSE_457/Final Project/CSE457/docs/data/profiles_wrangled.csv", 'r')
writefile = open("C:/Users/maria/OneDrive/WUSTL/2018-19/CSE_457/Final Project/CSE457/docs/data/profiles_wrangled.json", 'w')

import pandas as pd
import numpy as np
d = pd.read_csv(readfile, index_col=0)
dnp = d.to_numpy()
# d["ethnicityGroup"] = np.nan

def function(datapoint):
    arr = []
    if (datapoint.white):
        arr.append("white")
    if (datapoint.black):
        arr.append("black") 
    if (datapoint.middle_eastern):
        arr.append("middle eastern") 
    if (datapoint.native_american):
        arr.append("native american") 
    if (datapoint.pacific_islander):
        arr.append("pacific islander") 
    if (datapoint.indian):
        arr.append("indian") 
    if (datapoint.hispanic):
        arr.append("hispanic") 
    if (datapoint.asian):
        arr.append("asian")
    if (len(arr) > 1):
        return "multi-racial"
    elif (len(arr) == 1):
        return arr[0]
    else:
        return ""

d["ethnicityGroup"] = d.apply(function, axis=1)
# for prof in profs:
#     print(prof)
# profs.dropna(how='all', axis='columns')
# profs.rename("Unnamed: 0.1":"a", axis="columns", inplace=True)
# profs.drop("a")
# profs.drop(profs.columns[profs.columns.str.contains('Unnamed',case = False)],axis = 1)


# d["age"] = (int)d["age"]
# d.asian = d.asian == "TRUE"
# d.black = d.black == "TRUE"
# d.endagebucket10 = (int)d.endagebucket10
# d.haspets = d.haspets == "TRUE"
# d.height = (int)d.height
# d.hispanic = d.hispanic == "TRUE"
# d.indian = d.indian == "TRUE"
# d.middle_eastern = d.middle_eastern == "TRUE"
# d.native_american = d.native_american == "TRUE"
# d.other = d.other == "TRUE"
# d.pacific_islander = d.pacific_islander == "TRUE"
# d.startagebucket10 = (int)d.startagebucket10
# d.white = d.white == "TRUE"
# d.ethnicityArr = parseEthnicities(d)
# d.ethnicityGroup = ethnicityGrouper(d)

    # // for (var key in d) 
        
    # //     //console.log(d[key])
    # //     if (dataCats[key] == null) 
    # //         dataCats[key] = []
    # //     
    # //     if (!dataCats[key].includes(d[key])) 
    # //         dataCats[key].append(d[key])
    # //     

    # // 
d = d.to_json(orient="records")
# for prof in d:
#     if(prof != "Unnamed: 0.1"):
#         obj = {}
#         obj["attr"] = prof
#         obj["values"] = d[prof].to_numpy
#         data["profiles"].append(obj)
json.dump(d, writefile)