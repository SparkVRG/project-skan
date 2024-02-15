import './HeaderLogo.css';
import { Link } from 'react-router-dom';
import logo from './assets/logo.svg';
import logoWhite from './assets/logo-white.svg';

function HeaderLogo({ navMobileOpened, setNavMobileOpened }) {
    return (
        <div className='logo'>
            <Link to='/' onClick={() => setNavMobileOpened(false)}>
                <img className='logo-image' src={navMobileOpened ? logoWhite : logo} alt='Логотип СКАН' />
            </Link>
        </div>
    );
}

export default HeaderLogo;