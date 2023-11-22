import { Link } from '@remix-run/react';
import styles from './SideBar.css';

export default function SideBar(){
  return(
    <div className="sidebar">
      <ul className='sidebar-ul'>
        <li className='sidebar-li'><a className='sidebar-a compose' href="#">Compose Message</a></li>
        {/* <Link to="/inbox">Inbox</Link> */}
        <li className='sidebar-li'><a className='sidebar-a' href="/inbox">Inbox</a></li>
        <li className='sidebar-li'><a className='sidebar-a' href="#">Sent Items</a></li>
        <li className='sidebar-li'><a  className='sidebar-a' href="#">Contacts</a></li>
        <li className='sidebar-li'><a className='sidebar-a' href="#">Reports</a></li>
      </ul>
    </div>
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}