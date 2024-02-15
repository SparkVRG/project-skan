import { useState } from 'react';
import './Header.css';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import HeaderCompaniesInfo from './HeaderCompaniesInfo';
import HeaderUserPanel from './HeaderUserPanel';

function Header({ isAuthorized, setIsAuthorized, userData, setUserData }) {
    let [navMobileOpened, setNavMobileOpened] = useState(false);

    function exitButtonHandler() {
        setUserData('');
        localStorage.clear();
        setIsAuthorized(false);
    }

    return (
        <div className='header' style={isAuthorized ? { gridTemplateColumns: '1fr 1fr 0.5fr 0.5fr' } : { gridTemplateColumns: '1fr 1fr 1fr' }}>
            <HeaderLogo navMobileOpened={navMobileOpened} setNavMobileOpened={setNavMobileOpened} />
            <HeaderNav navMobileOpened={navMobileOpened} setNavMobileOpened={setNavMobileOpened} isAuthorized={isAuthorized} userData={userData} exitButtonHandler={exitButtonHandler} />
            <HeaderCompaniesInfo isAuthorized={isAuthorized} userData={userData} />
            <HeaderUserPanel isAuthorized={isAuthorized} userData={userData} exitButtonHandler={exitButtonHandler} />
        </div>
    );
}

export default Header;