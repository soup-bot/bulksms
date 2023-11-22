import { Link } from '@remix-run/react';
import styles from './SideBar.css';

export default function SideBar(){
  return(
    <div className="sidebar">
      <ul className='sidebar-ul'>
       <Link to='/' className='sidebar-a compose'><li className='sidebar-li'>Compose Message</li></Link>
       <Link to='/inbox' className='sidebar-a'><li className='sidebar-li'>Inbox</li></Link>
       <Link to='/sentitems' className='sidebar-a'><li className='sidebar-li'>Sent Items</li></Link>
       <Link to='/contacts' className='sidebar-a'><li className='sidebar-li'>Contacts</li></Link>
       <Link to='/reports' className='sidebar-a'><li className='sidebar-li'>Reports</li></Link>
      </ul>
    </div>
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}