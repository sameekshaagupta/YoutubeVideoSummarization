import React, { useState } from 'react';
import axios from 'axios';

function Summarizer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/summarize', {
        videoUrl,
      });
      setSummary(response.data.summary);
    } catch (error) {
      setSummary('Error summarizing video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Paste YouTube video URL here"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{ width: '60%', padding: '8px' }}
      />
      <button onClick={handleSummarize} style={{ marginLeft: 10, padding: '8px 12px' }}>
        Summarize
      </button>
      {loading && <p>Loading...</p>}
      {summary && (
        <div style={{ marginTop: 20 }}>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
