import kagglehub
import pandas as pd

path = kagglehub.dataset_download("mcdonalds/nutrition-facts") + "/menu.csv"
df = pd.read_csv(path, usecols=["Item", "Calories"])
menu = df.to_json(orient="records")

with open("./app/game/menu.json", "w", encoding="utf-8") as f:
    f.write(menu)
