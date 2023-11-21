import { MetaFunction, json, redirect } from "@remix-run/node";
import { Link, Outlet, useActionData } from "@remix-run/react";
import React, { useState } from 'react';
import xlsx from 'xlsx';
import { createLanguageService } from "typescript";
import TextInput from "../components/TextInput";

export function meta() {
 
  return [
    {title: 'Dhiraagu Bulk SMS'},
    {description: 'Bulk SMS'},
  ];
}


export default function Index() {
  const data = useActionData();
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

 
  return (
<div>
  <h1>Index page</h1>
  <TextInput data = {data}></TextInput>
   
</div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

return redirect('/');
};






