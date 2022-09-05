import axios from "axios";
import fs from "fs";

export default class Searchs {
    history = [];
    #dbPath = "./db/database.json";

    constructor() {
        this.#readDB();
    }

    get #paramsMapbox() {
        return {
            limit: "5",
            access_token: process.env.MAPBOX_KEY,
            language: "es",
        };
    }

    get #paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: "metric",
            lang: "it",
        };
    }

    #saveDB() {
        const payload = {
            history: this.history,
        };

        fs.writeFileSync(this.#dbPath, JSON.stringify(payload));
    }

    #readDB() {
        if (fs.existsSync(this.#dbPath)) {
            const jsonFile = fs.readFileSync(this.#dbPath, {
                encoding: "utf-8",
            });
            const payload = JSON.parse(jsonFile);

            this.history = payload.history;
        }
    }

    async getCities(place = "") {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.#paramsMapbox,
            });
            const response = await instance.get();

            return response.data.features.map((place) => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));
        } catch (error) {
            return [];
        }
    }

    async getWeatherByLatLng(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.#paramsOpenWeather, lat, lon },
            });
            const response = await instance.get();
            const { data } = response;

            return {
                description: data?.weather[0]?.description ?? "No data",
                min: data?.main?.temp_min ?? "No data",
                max: data?.main?.temp_max ?? "No data",
                temperature: data?.main?.temp ?? "No data",
            };
        } catch (error) {
            console.error(error);
        }
    }

    addHistory(place = "") {
        if (this.history.includes(place)) {
            return;
        }

        this.history.unshift(place);

        if (this.history.length > 5) {
            this.history.pop();
        }

        this.#saveDB();
    }
}
