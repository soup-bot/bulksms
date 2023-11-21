import { MetaFunction, json, redirect } from "@remix-run/node";
import { Link, Outlet, useActionData } from "@remix-run/react";
import React, { useState } from 'react';
import TextInput from "../components/TextInput";
import { links as NavBarLinks } from '~/components/NavBar';
import { links as TextInputLinks } from '~/components/TextInput';
import SideBar, { links as SideBarLinks } from '~/components/SideBar';



export function meta() {
 
  return [
    {title: 'Dhiraagu Bulk SMS'},
    {description: 'Bulk SMS'},
  ];
}
export function links() {
  return [...NavBarLinks(),...TextInputLinks(),...SideBarLinks()];
}

export default function Index() {
  const data = useActionData();
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

 
  return (
    <div className="body">
<div>
  <SideBar></SideBar>
  <TextInput data = {data}></TextInput>
   
</div>
</div>
  );
}

export const action = async ({ request }) => {
  console.log('ACTION')
  const formData = await request.formData();
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

return redirect('/');
};






