const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  try {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    ip = ip.split(",")[0].trim();

    console.log("IP:", ip);

    // TEST koneksi API
    const url = `http://ip-api.com/json/${ip}`;
    console.log("Request ke:", url);

    const response = await axios.get(url);

    console.log("FULL DATA:", response.data);

    console.log("Negara:", response.data.country);
    console.log("Kota:", response.data.city);
    console.log("ISP:", response.data.isp);
    console.log("------------------");

  } catch (err) {
    console.log("ERROR GEO:", err.message);
  }

  res.send("Website aktif");
});

app.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
});
