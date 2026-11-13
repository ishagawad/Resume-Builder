import React, { useState } from "react";

function LiveText() {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <h2>Live Text Preview</h2>

      <textarea
        placeholder="Type something here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="preview">
        <h3>Preview</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default LiveText;