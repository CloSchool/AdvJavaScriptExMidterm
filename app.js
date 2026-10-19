const port = 3000;

const express = require("express");
const app = express();

const fs = require("fs/promises");
const path = require("path");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/AddWeather", async (req, res) => {
    try {
        const { txtCity, txtCurrentTemp, txtLat, txtLong } = req?.body ?? {};
        if (!txtCity || !txtCurrentTemp || !txtLat || !txtLong) throw new Error("Missing arguments");

        await fs.appendFile(path.join(__dirname, "weather.txt"), `${JSON.stringify({ cityName: txtCity, lat: txtLat, long: txtLong, currentTemp: txtCurrentTemp })}\n`);

        res.send(/* html */`
            <p>Weather data added successfully!</p>
            <a href="/">Add another</a>
        `);
    } catch (error) {
        console.error(error);

        res.send(/* html */`
            <p>Weather data failed to be added!</p>
            <a href="/">Try again</a>
        `);
    }
});

app.listen(port, () => console.log(`Running on port: ${port}`));