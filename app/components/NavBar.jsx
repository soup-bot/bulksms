import styles from './NavBar.css';

export default function NavBar() {
  return(
      <nav>
          <h4 className='title'>Dhiraagu Bulk SMS demo</h4>
      </nav>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}