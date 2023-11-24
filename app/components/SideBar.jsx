import { Link, NavLink } from '@remix-run/react';
import styles from './SideBar.css';
import * as React from 'react';



export default function SideBar(){


  return(
    <div className="sidebar">
      <ul className='sidebar-ul'>
       <NavLink to='/' className='sidebar-a compose'><li className='sidebar-li'>Compose Message</li></NavLink>
       <NavLink to='/inbox' className='sidebar-a'><li className='sidebar-li'>Inbox</li></NavLink>
       <NavLink to='/sentitems' className='sidebar-a'><li className='sidebar-li'>Sent Items</li></NavLink>
       <NavLink to='/contacts' className='sidebar-a'><li className='sidebar-li'>Contacts</li></NavLink>
       <NavLink to='/reports' className='sidebar-a'><li className='sidebar-li'>Reports</li></NavLink>
       
      </ul>
    </div>
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}