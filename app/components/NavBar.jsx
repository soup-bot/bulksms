import styles from './NavBar.css';
import user from "../assets/user-solid.svg";
import question from "../assets/question-solid.svg";
import gear from "../assets/gear-solid.svg";
import logo from "../assets/logo.svg";

export default function NavBar() {
  return(
      <nav>
          {/* <h4 className='title'>Bulk SMS demo</h4> */}
          <img className='logo' src={logo} alt="" />
          <ul className='nav-li'>
            <li><img className='nav-icons question' src={question} alt="" /> </li>
            <li><img className='nav-icons gear' src={gear} alt="" /> </li>
            <li><img className='nav-icons user' src={user} alt="" /> </li>
          </ul>
      </nav>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

