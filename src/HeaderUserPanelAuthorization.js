import './HeaderUserPanelAuthorization.css';
import { Link } from 'react-router-dom';

function HeaderUserPanelAuthorization() {
    return (
        <div className='authorization'>
            <Link to='/register'>
                <button className='authorization-reg'>Зарегистрироваться</button>
            </Link>
            <div className='authorization-line'></div>
            <Link to='/authorization'>
                <button className='authorization-login'>Войти</button>
            </Link>
        </div>
    );
}

export default HeaderUserPanelAuthorization;