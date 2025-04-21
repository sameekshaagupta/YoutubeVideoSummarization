const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const YouTubeTranscript = require('youtube-transcript');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post('/summarize', async (req, res) => {
  const { videoUrl } = req.body;

  try {
    const videoId = new URL(videoUrl).searchParams.get("v");
    if (!videoId) return res.status(400).json({ error: "Invalid YouTube URL" });

    const transcriptData = await YouTubeTranscript.YoutubeTranscript.fetchTranscript(videoId);
    const fullTranscript = transcriptData.map(item => item.text).join(" ");

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: `Summarize the following text:\n\n${fullTranscript}` }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    

    const summary = geminiResponse.data.candidates[0].content.parts[0].text;
    res.json({ summary });

  } catch (error) {
    console.error('Error response:', error.response?.data || error.message);
    res.status(500).json({
      error: "Error generating summary",
      details: error.response?.data || error.message,
    });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));