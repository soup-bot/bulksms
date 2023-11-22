import { json, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import React, { useState } from 'react';
import xlsx from 'xlsx';
import styles from './TextInput.css';
import { TagsInput } from "react-tag-input-component";
import { Button } from '@mui/material';

export default function DynamicButtonz({ data }) {
  const [inputType, setInputType] = useState('numbers'); 
  const [text, setText] = useState('');
  const [headers, setHeaders] = useState(null); // Added state for headers
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selected, setSelected] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = async (e) => {
    setHeaders(null);
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = xlsx.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

     
      const headers = [];
      const range = xlsx.utils.decode_range(sheet['!ref']);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const headerCellAddress = xlsx.utils.encode_cell({ r: range.s.r, c: C });
        const headerCellValue = sheet[headerCellAddress].v;
        headers.push(headerCellValue);
      }

      console.log('CLIENT SIDE:', headers);
      setHeaders(headers); 
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const handleButtonClick = (value, event) => {
    event.preventDefault();
    setText((prevText) => `${prevText} @@${value} `);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to the server
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Check if the phone number has exactly 7 characters
    // and starts with either 7 or 9
    return /^[79]\d{6}$/.test(phoneNumber);
  };
  const beforeAddValidate = (tag, existingTags) => {
    // Check if the length is less than 10 and the phone number is valid
    return selected.length < 10 && validatePhoneNumber(tag);
  };

  const handleInputChange = (type) => {
    setInputType(type);
    setText('');
    setHeaders(null);
    setUploadedFile(null);
    setSelected([]); 
  };

  return (
    <div className='container'>
      <div className='wrapper'>
      <Form method="post" encType="multipart/form-data">

     <div className="custom-select">
            <select value={inputType} onChange={(e) => handleInputChange(e.target.value)}>
              <option value="numbers">Numbers</option>
              <option value="file">File</option>
            </select>
            </div>

          {inputType === 'numbers' ? (
            <div className="tags-container">
            <TagsInput
              value={selected}
              onChange={setSelected}
              placeHolder="Type phone numbers to message (up to 10)"
              beforeAddValidate={beforeAddValidate}
              onlyUnique={true}
            />
             {/* Hidden input to mirror the values of the TagsInput */}
          <input
            type="hidden"
            name="numbers"
            value={selected}
          />
            </div>
          ) : (
            <div className='fileup-container'>
              <input
                type="file"
                name="excelFile"
                id="excelFile"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileChange}
              />
              {/* Display file-related UI here */}
            </div>
          )}

  
  <div>
    <div>
  {headers ? (
        <>
  
        <h4 className='placeholder'>Placeholders:</h4>
          {Object.values(headers).map((value, index) => (
            <button className='button-4' key={index} type="button" onMouseDown={(e) => handleButtonClick(value, e)}>
              {value}
            </button>
          ))}
    
        </>
      ) : (
        <div>No data available</div>
      )}
      </div>
      <div className="text-area-container">
    <textarea
    placeholder='Type your message here..'
      name="text"
      value={text}
      onChange={handleTextChange}
      rows={5}
      className="full_height_Width"
    />
    
    <div className="btn-container">
    <p>{text.length} characters used</p>
   
  
  <button className='button-5' type="submit">Submit</button>
  </div>
  </div>
  </div>
</Form>

      </div>

     
    </div>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
