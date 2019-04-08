import sys
import json
sys.path.append("C:/Users/maria/Anaconda3/Lib/site-packages")

readfile = open("C:/Users/maria/OneDrive/WUSTL/2018-19/CSE_457/Final Project/CSE457/docs/data/profiles_wrangled.csv", 'r')
writefile = open("C:/Users/maria/OneDrive/WUSTL/2018-19/CSE_457/Final Project/CSE457/docs/data/profiles_wrangled.json", 'w')

import pandas as pd
import numpy as np
d = pd.read_csv(readfile, index_col=0)
dnp = d.to_numpy()

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

d = d.to_json(orient="records")
json.dump(d, writefile)json.dump(d, writefile)json.dump(d, writefile)json.dump(d, writefile)