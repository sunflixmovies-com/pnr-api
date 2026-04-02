const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

// ✅ CORS enable (important for GitHub frontend)
app.use(cors());

// ✅ Root check (optional)
app.get('/', (req, res) => {
  res.send("PNR API is running 🚆");
});

// ✅ PNR API route
app.get('/pnr-status', async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const pnr = req.query.pnr;

  if (!pnr) {
    return res.status(400).json({ error: "PNR required" });
  }

  try {
    const response = await fetch(
      `https://real-time-pnr-status-api-for-indian-railways.p.rapidapi.com/name/${pnr}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'a61c2cb28dmsh816a4962cd342cfp1a4f90jsn0183cae83615',
          'X-RapidAPI-Host': 'real-time-pnr-status-api-for-indian-railways.p.rapidapi.com'
        }
      }
    );

    const data = await response.json();

    // ✅ अगर API error दे तो handle करो
    if (!data) {
      return res.status(500).json({ error: "No data received" });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
});

// ✅ IMPORTANT: Render port fix
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
