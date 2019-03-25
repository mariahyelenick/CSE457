import sys
sys.path.append("C:/Users/maria/Anaconda3/Lib/site-packages")

import numpy as np
import pandas as pd

data = pd.read_csv("profiles_wrangled.csv")

data['actual_religion'] = data['religion']
if(len(data['actual_religion'].str.split()) >= 0):
    data['actual_religion'] = data['actual_religion'].str.split().str.get(0)
#do zodiac signs stuff
data['zodiac'] = data['sign']
if(len(data['zodiac'].str.split()) >= 0):
    data['zodiac'] = data['zodiac'].str.split().str.get(0)
data['zodiac_thoughts'] = ""
# for i in data['sign'].iteritems():
#     if(pd.notna(i[1])):
#         if(i[1].find("but it doesn't matter") != -1):
#             data['zodiac_thoughts', i[0]] = "doesnt_matter"
#         elif(i[1].find("and it's fun to think about") != -1):
#             data['zodiac_thoughts', i[0]] = "fun"
#         elif(i[1].find("and it matters a lot") != -1):
#             data['zodiac_thoughts', i[0]] = "matters_a_lot"

data.zodiac_thoughts[data['sign'].str.contains("but it doesn't matter", na=False)] = "doesnt_matter"
data.zodiac_thoughts[data['sign'].str.contains("and it's fun to think about", na=False)] = "fun"
data.zodiac_thoughts[data['sign'].str.contains("and it matters a lot", na=False)] = "matters_a_lot"


data.to_csv("profiles_wrangled.csv")
