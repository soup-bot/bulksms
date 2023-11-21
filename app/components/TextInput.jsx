import { json, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import React, { useState } from 'react';
import xlsx from 'xlsx';

export default function DynamicButtonz({ data }) {
  const [text, setText] = useState('');
  const [headers, setHeaders] = useState(null); // Added state for headers
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = xlsx.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // Assuming that the headers are in the first row
      const headers = [];
      const range = xlsx.utils.decode_range(sheet['!ref']);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const headerCellAddress = xlsx.utils.encode_cell({ r: range.s.r, c: C });
        const headerCellValue = sheet[headerCellAddress].v;
        headers.push(headerCellValue);
      }

      console.log('CLIENT SIDE:', headers);
      setHeaders(headers); // Set headers state
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const handleButtonClick = (value, event) => {
    event.preventDefault();
    setText((prevText) => `${prevText} @${value} `);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to the server
  };

  return (
    <div>
      <div>
      <Form method="post" encType="multipart/form-data">
  <label htmlFor="excelFile">Upload Excel File:</label>
  <input type="file" name="excelFile" id="excelFile" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />

  <div>
    <div>
  {headers ? (
        <>
        <h4>Placeholders:</h4>
          {Object.values(headers).map((value, index) => (
            <button key={index} onMouseDown={(e) => handleButtonClick(value, e)}>
              {value}
            </button>
          ))}
        </>
      ) : (
        <div>No data available</div>
      )}
      </div>
    <textarea
      name="text"
      value={text}
      onChange={handleTextChange}
      rows={5}
      className="full_height_Width"
    />
    <button type="submit">Submit</button>
    <p>Character Count: {text.length}</p>
  </div>
</Form>

      </div>

     
    </div>
  );
}
