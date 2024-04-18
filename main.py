import httpx
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv()
API_KEY = os.getenv("API_KEY")

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/weather/{city}")
async def get_weather(city: str):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        
        if response.status_code == 200:
            weather_data = response.json()
            return weather_data
        else:
            return {"error": "City not found"}
