const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.static(__dirname));

// === PROXY ROUTE ===
app.get("/proxy", async (req, res) => {
  try {
    const target = req.query.url;
    if (!target) return res.status(400).send("No URL provided.");

    const response = await fetch(target, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
      }
    });

    const body = await response.text();

    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*"
    });

    res.send(body);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.toString());
  }
});

// === SERVE INDEX.HTML ===
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// === START SERVER ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server berjalan di port " + PORT);
});
