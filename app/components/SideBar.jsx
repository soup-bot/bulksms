import styles from './SideBar.css';

export default function SideBar(){
  return(
    <div className="sidebar">

    </div>
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}