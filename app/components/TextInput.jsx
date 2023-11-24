import { json, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import React, { useState } from 'react';
import xlsx from 'xlsx';
import styles from './TextInput.css';
import { TagsInput } from "react-tag-input-component";
import Tooltip from '@mui/material/Tooltip';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DynamicButtonz({ data }) {
  const [inputType, setInputType] = useState('numbers'); 
  const [snackbarText, setSnackbarText] = useState(''); 
  const [numMessages, setNumMessages] = useState(0);
  const [text, setText] = useState('');
  const [headers, setHeaders] = useState(null); 
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = React.useState(false);

// Function to calculate the number of messages based on GSM-7 or UCS-2 encoding

const calculateMessages = (text) => {
  const gsm7Chars = new Set(' @£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
  const ucs2Chars = new Set(text);

  const isGsm7 = [...ucs2Chars].every(char => gsm7Chars.has(char));
  const charCount = text.length;

  if (isGsm7) {
    // Calculate messages for GSM-7
    setNumMessages(Math.ceil((charCount * 1.0) / (160 - 7)));
  } else {
    // Calculate messages for UCS-2
    setNumMessages(Math.ceil((charCount * 1.0) / (70-3)));
  }
};




 //Snackbar closing handling
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  //Textarea input handling
  const handleTextChange = (e) => {
    setText(e.target.value);
  calculateMessages(e.target.value);
  };
 

  //Excel file input handling/processing (extract headers from file and place into object)
  const handleFileChange = async (e) => {
    setHeaders(null);
    const file = e.target.files[0];
    setUploadedFile(file);
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

  //When clicking placeholder, insert with @@
  const handleButtonClick = (value, event) => {
    event.preventDefault();
    setText((prevText) => `${prevText} @@${value} `);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  };


  //PHONE NUMBER VALIDATION
  const validatePhoneNumber = (phoneNumber) => {
    // Check if the phone number has exactly 7 characters
    // and starts with either 7 or 9
    return /^[79]\d{6}$/.test(phoneNumber);
  };

  const beforeAddValidate = (tag, existingTags) => {
    // Check if the length is less than 10 and the phone number is valid
    const isValidPhoneNumber = selected.length < 10 && validatePhoneNumber(tag);
  
    // Set the error message for Snackbar
    if (isValidPhoneNumber)
    {
      return isValidPhoneNumber;
    }
    else{
      setSnackbarText('Invalid phone number. Please enter a valid 7-digit number starting with 7 or 9.')
      setOpen(true);
    } 
  };
// --------------------------------------

//If user switches from file input to number or vice versa, reset the inputs
  const handleInputChange = (type) => {
    setInputType(type);
    setText('');
    setHeaders(null);
    setUploadedFile(null);
    setSelected([]); 
  };




  //RETURN-----------------------------
  return (
    <div className='container'>
      <div className='wrapper'>

{/* Switching input type between numbers and excel file */}
<div className="switcher">
<button className='switch-btn' disabled={inputType==='numbers'} onClick={() => handleInputChange('numbers')}>Input up to 10 numbers</button>
<h4 className='switch-txt'>or</h4>
<Tooltip title="Upload an .xlsx, .xls, or .csv file" disableInteractive>
<button className='switch-btn' disabled={inputType==='file'} onClick={() => handleInputChange('file')}>Add recipients from a file</button>
</Tooltip>
</div>


      <Form method="post" encType="multipart/form-data">
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
      {/* IF HEADERS PRESENT, THEN MAP -> BUTTONS AND DISPLAY */}
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
        // ELSE SHOW THAT NO DATA IS AVAILABLE
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
      className={`full_height_Width ${numMessages > 10 ? 'error' : ''}`}
    />
    
    <div className="btn-container">
    <p>{text.length} characters used</p>
    <p className={`${numMessages > 10 ? 'errortxt' : ''}`}>{numMessages}/10 messages</p>
   
  {/* only enable form submission button if both inputs (file+text or numbers+text is available) */}
  <button disabled={!((text && selected.length>0)||(text && uploadedFile))||(numMessages>10)} className='button-5' type="submit">Submit</button>
  </div>
  </div>
  </div>
  
</Form>

{/* SNACKBAR FOR ERROR DISPLAY */}
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

