import React from 'react';
import Summarizer from './components/Summarizer';
import { formatSummary } from "./utils/formatSummary";

function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>YouTube Video Summarizer</h1>
      <Summarizer content={Summary}/>
    </div>
  );
}
function Summary({ content }) {
  const formattedHtml = formatSummary(content);

  return (
    <div
      className="p-4 bg-white rounded-md prose"
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}


export default App;
