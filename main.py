from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import re

# Load vectorizer and model
vectorizer = joblib.load("vectorizer.joblib")
model = joblib.load("logistic_model.joblib")
df = pd.read_csv("drugsComTrain_raw.csv")

app = FastAPI()

class ReviewInput(BaseModel):
    text: str

class ConditionInput(BaseModel):
    condition: str

def clean(text):
    text = re.sub(r'<.*?>', '', str(text))
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text.lower()

@app.post("/predict")
def predict_sentiment(input: ReviewInput):
    text = clean(input.text)
    vec = vectorizer.transform([text])
    prediction = model.predict(vec)[0]
    return {"sentiment": "positive" if prediction == 1 else "negative"}

@app.post("/recommend")
def recommend_drugs(input: ConditionInput):
    subset = df[df["condition"].str.contains(input.condition, case=False, na=False)]
    positive_reviews = subset[subset["rating"] >= 7]
    top_drugs = positive_reviews["drugName"].value_counts().head(5).to_dict()
    return {"recommendations": top_drugs}