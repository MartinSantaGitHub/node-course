import {
    readInput,
    inquirerMenu,
    pause,
    listPlaces,
} from "./helpers/inquirer.js";
import Searchs from "./models/searchs.js";
import dotenv from "dotenv";

const main = async () => {
    const searchs = new Searchs();
    let opt;

    dotenv.config();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const term = await readInput("City: ");
                const places = await searchs.getCities(term);
                const placeId = await listPlaces(places);

                if (placeId === 0) continue;

                const selectedPlace = places.find(
                    (place) => place.id === placeId
                );

                if (selectedPlace) {
                    searchs.addHistory(selectedPlace.name);

                    const { lat, lng } = selectedPlace;

                    const weather = await searchs.getWeatherByLatLng(lat, lng);

                    console.clear();
                    console.log("\nCity Info\n".green);
                    console.log("City:", selectedPlace.name);
                    console.log("Lat:", selectedPlace.lat);
                    console.log("Lng:", selectedPlace.lng);
                    console.log("Temperature:", weather.temperature);
                    console.log("Min:", weather.min);
                    console.log("Max:", weather.max);
                    console.log("Description:", weather.description);
                }

                break;
            case 2:
                searchs.history.forEach((place, i) => {
                    const idx = `${i + 1}.`.green;

                    console.log(`${idx} ${place}`);
                });

                break;
        }

        if (opt !== 0) await pause();
    } while (opt !== 0);
};

main();
