import './HeaderNav.css';
import { Link } from 'react-router-dom';
import loadingSpinner from './assets/loading-spinner.svg';

function HeaderNav({ navMobileOpened, setNavMobileOpened, isAuthorized, userData, exitButtonHandler }) {
    let elementCompaniesInfoMobile = (
        <div className='companies-info-mobile'>
            <div className='companies-info-mobile-container'>
                <div className='companies-info-mobile-top' style={!userData.hasOwnProperty('companiesLimit') ? { display: 'none' } : { display: 'block' }}>
                    <div className='companies-info-mobile-description'>Использовано компаний</div>
                    <div className='companies-info-mobile-quantity'>{userData.companiesUsed}</div>
                </div>
                <div className='companies-info-mobile-bottom' style={!userData.hasOwnProperty('companiesLimit') ? { display: 'none' } : { display: 'block' }}>
                    <div className='companies-info-mobile-description'>Лимит по компаниям</div>
                    <div className='companies-info-mobile-quantity companies-info-mobile-quantity_limit'>{userData.companiesLimit}</div>
                </div>
                <div className='companies-info-mobile-loading-spinner' style={!userData.hasOwnProperty('companiesLimit') ? { display: 'block' } : { display: 'none' }}>
                    <img className='companies-info-mobile-loading-spinner-image' src={loadingSpinner} alt='Иконка загрузки' />
                </div>
            </div>
        </div>
    );

    let elementAuthorizationMobile = (
        <div className='authorization-mobile'>
            <Link to='/register'>
                <button className='authorization-mobile-reg' onClick={() => setNavMobileOpened(false)}>Зарегистрироваться</button>
            </Link>
            <Link to='/authorization'>
                <button className='authorization-mobile-login' onClick={() => setNavMobileOpened(false)}>Войти</button>
            </Link>
        </div>
    );

    let elementLogoutMobile = (
        <div className='logout-mobile'>
            <button className='logout-mobile-button' onClick={() => { setNavMobileOpened(false); exitButtonHandler() }}>Выйти</button>
        </div>
    );

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            setNavMobileOpened(false);
        }
    });

    return (
        <>
            <nav className='nav'>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Главная</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/rates'>Тарифы</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/faq'>FAQ</Link>
                    </li>
                </ul>
            </nav>
            {isAuthorized ? elementCompaniesInfoMobile : <div className='stub'></div>}
            <nav className='nav-mobile'>
                <button className={navMobileOpened ? 'nav-mobile-toggle nav-mobile-toggle_opened' : 'nav-mobile-toggle'} onClick={() => setNavMobileOpened(!navMobileOpened)}>
                    <span className='nav-mobile-toggle-line nav-mobile-toggle-line_top'></span>
                    <span className='nav-mobile-toggle-line nav-mobile-toggle-line_middle'></span>
                    <span className='nav-mobile-toggle-line nav-mobile-toggle-line_bottom'></span>
                </button>
                <div className='nav-mobile-screen' style={navMobileOpened ? { display: 'block', left: '0', opacity: '1' } : { display: 'block', left: '100%', opacity: '0' }}>
                    <ul className='nav-mobile-list'>
                        <li className='nav-mobile-item'>
                            <Link className='nav-mobile-link' to='/' onClick={() => setNavMobileOpened(false)}>Главная</Link>
                        </li>
                        <li className='nav-mobile-item'>
                            <Link className='nav-mobile-link' to='/rates' onClick={() => setNavMobileOpened(false)}>Тарифы</Link>
                        </li>
                        <li className='nav-mobile-item'>
                            <Link className='nav-mobile-link' to='/faq' onClick={() => setNavMobileOpened(false)}>FAQ</Link>
                        </li>
                    </ul>
                    {isAuthorized ? elementLogoutMobile : elementAuthorizationMobile}
                </div>
            </nav>
        </>
    );
}

export default HeaderNav;