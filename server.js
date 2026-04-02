const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/pnr-status', async (req, res) => {
  const pnr = req.query.pnr;

  if (!pnr) {
    return res.json({ error: "PNR required" });
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
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
