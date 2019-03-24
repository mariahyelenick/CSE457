import sys
sys.path.append("C:/Users/maria/Anaconda3/Lib/site-packages")

import numpy as np
import pandas as pd

data = pd.read_csv("profiles.csv")
data = data[np.logical_and(data.age >= 18, data.age <= 90)]
# print(len(data))
data = data[pd.notnull(data.body_type)]
data = data[pd.notnull(data.diet)]
data = data[pd.notnull(data.drinks)]
data = data[pd.notnull(data.drugs)]
data = data[pd.notnull(data.education)]
data = data[pd.notnull(data.ethnicity)]
data = data[pd.notnull(data.height)]
data = data[pd.notnull(data.smokes)]
data = data[pd.notnull(data.speaks)]
data = data[pd.notnull(data.status)]

data['startagebucket'] = data.age - (data.age%5)
data['endagebucket'] = data.age - (data.age%5) + 5

data['white'] = data.ethnicity.str.contains("white")
data['asian'] = data.ethnicity.str.contains("asian")
data['black'] = data.ethnicity.str.contains("black")
data['other'] = data.ethnicity.str.contains("other")
data['hispanic'] = data.ethnicity.str.contains("hispanic")
data['pacific_islander'] = data.ethnicity.str.contains("pacific islander")
data['native_american'] = data.ethnicity.str.contains("native american")
data['middle_eastern'] = data.ethnicity.str.contains("middle eastern")
data['indian'] = data.ethnicity.str.contains("indian")

data['haspets'] = data.pets.str.contains("has")

data.to_csv("profiles_wrangled.csv")

#replace all <br /> with " "
#replace all <a (.*?)> with ""
#rplace all </a> with ""
#replace all <a(.+?\n.+?)> with ""
#replace all <a(.+?\n.+?\n.+?)> with ""
#replace all <strong> and </strong> with ""
#repalce all <em> and </em> with ""
#repalce all <u> and </u> with ""
#repalce all <i> and </i> with ""
#repalce all <del> and </del> with ""
#repalce all <b> and </b> with ""
#repalce all <p> and </p> with ""
#repalce all <s> and </s> with ""
#repalce all <ul> and </ul> with ""
#repalce all <li> and </li> with ""
#repalce all <ol> and </ol> with ""
#repalce all <sub> and </sub> with ""
#repalce all <span> and </span> with ""
#replace all <b(.*?)> with ""
#replace all &nbsp; with " "








