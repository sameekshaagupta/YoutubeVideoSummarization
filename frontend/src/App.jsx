import React, { useState, useEffect } from 'react';
import Summarizer from './components/Summarizer';  // This is the component you're importing
import axios from 'axios';
import { formatSummary } from './utils/formatSummary';

function App() {
  const [summaryContent, setSummaryContent] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');  // Input for YouTube URL
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to call backend API
  const fetchSummary = async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://youtubevideosummarization.onrender.com/summarize', { url });
      setSummaryContent(response.data.summary); // Assuming backend returns { summary: "video summary text" }
      setError(null);  // Clear any previous errors
    } catch (err) {
      setError('Error fetching summary');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (youtubeUrl) {
      fetchSummary(youtubeUrl);  // Fetch summary when form is submitted
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>YouTube Video Summarizer</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          style={{ padding: '10px', marginRight: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
          Summarize
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Render the Summary */}
      {summaryContent && <SummaryComponent content={summaryContent} />}
    </div>
  );
}

// Renamed this component to avoid conflict
function SummaryComponent({ content }) {
  const formattedHtml = formatSummary(content);

  return (
    <div
      className="p-4 bg-white rounded-md prose"
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}

export default App;
