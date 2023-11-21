import React, { useState } from 'react';

export default function DynamicButtonz({ data }) {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleButtonClick = (value, event) => {
    event.preventDefault();
    setText((prevText) => `${prevText} @${value} `);
  };

  if (!data || Object.keys(data).length === 0) {
    return (
      <div>
        <div>No data available</div>
        <div>
          <textarea
            value={text}
            onChange={handleTextChange}
            rows={5}
            className="full_height_Width"
          />
          <p>Character Count: {text.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {Object.values(data).map((value, index) => (
        <button key={index} onMouseDown={(e) => handleButtonClick(value, e)}>
          {value}
        </button>
      ))}

      <div>
        <textarea
          value={text}
          onChange={handleTextChange}
          rows={5}
          className="full_height_Width"
        />
        <p>Character Count: {text.length}</p>
      </div>
    </div>
  );
}
