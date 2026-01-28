const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Skycastle panel config
const SKYSTALLE_HOST = "http://144.21.34.231:7026";
const SKYSTALLE_API_KEY = "ptlc_Yn28ESSkHElQFzNeBO57oOoibHGfPEeu9k3jkR4EnJ8";

// POST /download
app.post("/download", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    console.log("Sending request to Skycastle:", `${SKYSTALLE_HOST}/download`);
    console.log("Payload:", { url });

    try {
        const response = await axios.post(`${SKYSTALLE_HOST}/download`, { url }, {
            headers: {
                "Authorization": `Bearer ${SKYSTALLE_API_KEY}`,
                "Content-Type": "application/json"
            },
            timeout: 15000 // 15 sec timeout
        });

        res.json(response.data);

    } catch (err) {
        console.error("Skycastle request failed:", err.message);
        res.status(500).json({ error: "Error contacting Skycastle panel", details: err.message });
    }
});

// GET / route for test
app.get("/", (req, res) => {
    res.send("Backend live! Use POST /download to test.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
