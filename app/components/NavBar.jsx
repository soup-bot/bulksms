import styles from './NavBar.css';

export default function NavBar() {
  return(
      <nav>
          <h4 className='title'>Bulk SMS demo</h4>
          <ul className='nav-li'>
          </ul>
      </nav>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

