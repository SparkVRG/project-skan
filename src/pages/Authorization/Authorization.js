import './Authorization.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import authorizationPageImage from './assets/authorization-page-image.png';
import authorizationPageFormImage from './assets/authorization-page-form-image.png';
import authorizationPageFormServicesIcon1 from './assets/authorization-page-form-services-icon-1.svg'
import authorizationPageFormServicesIcon2 from './assets/authorization-page-form-services-icon-2.svg'
import authorizationPageFormServicesIcon3 from './assets/authorization-page-form-services-icon-3.svg'
import avatar from './assets/avatar.png';

function Authorization({ setUserData, setIsAuthorized }) {
    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');
    let [authorizationError, setAuthorizationError] = useState(false);
    let [loginButtonIsActive, setLoginButtonIsActive] = useState(true);

    function authorizationButtonHandler(event) {
        event.preventDefault();

        setLoginButtonIsActive(false);

        let sendData = {
            login: login,
            password: password
        };

        let URL = 'https://gateway.scan-interfax.ru/api/v1/account/login';

        let options = {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        };

        fetch(URL, options)
            .then(response => response.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('expire', data.expire.toString());

                    let newUserData = {
                        name: 'Алексей А.',
                        avatar: avatar,
                        currentRate: 'beginner'
                    };

                    // В рамках учебного проекта имя, аватар и текущий тариф берутся не с сервера, а устанавливаются одинаковые для всех пользователей.
                    // Так сделано из-за того, что API не даёт возможности получить эти данные.
                    // В реальном проекте эти данные были бы запрошены так же, как и информация о компаниях - через функцию getCompaniesInfo в модуле App.js.

                    setUserData(newUserData);
                    setIsAuthorized(true);
                } else {
                    let element = (
                        <p className='authorization-page-form-error'>{data.message}</p>
                    );

                    setLoginButtonIsActive(true);
                    setAuthorizationError(element);
                }
            });
    }

    return (
        <main className='authorization-page'>
            <h1 className='authorization-page-title'>ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ<br className='authorization-page-title-br' /> НА ТАРИФ, НЕОБХОДИМО АВТОРИЗОВАТЬСЯ.</h1>
            <form className='authorization-page-form'>
                <div className='authorization-page-form-sections-panel'>
                    <button className='authorization-page-form-sections-button authorization-page-form-sections-button_login authorization-page-form-sections-button_active' onClick={event => event.preventDefault()}>Войти</button>
                    <button className='authorization-page-form-sections-button authorization-page-form-sections-button_register' onClick={event => event.preventDefault()}>Зарегистрироваться</button>
                </div>
                <label className='authorization-page-form-label' htmlFor='authorization-login-input'>Логин или номер телефона:</label><br />
                <input className='authorization-page-form-input' id='authorization-login-input' value={login} onChange={event => setLogin(event.target.value)} style={authorizationError ? { border: '1px solid #ff5959' } : { border: '1px solid #c7c7c7' }} />

                {/* В макете показано сделать проверку на корректность ввода номера телефона, однако логины в учебных аккаунтах не являются номерами телефонов, поэтому проверки нет */}

                <label className='authorization-page-form-label authorization-page-form-label_password' htmlFor='authorization-password-input'>Пароль:</label><br />
                <input className='authorization-page-form-input' id='authorization-password-input' type='password' value={password} onChange={event => setPassword(event.target.value)} style={authorizationError ? { border: '1px solid #ff5959' } : { border: '1px solid #c7c7c7' }} />
                {authorizationError && authorizationError}
                <button className='authorization-page-form-button' onClick={event => { authorizationButtonHandler(event) }} disabled={login === '' || password === '' || !loginButtonIsActive ? true : false}>{loginButtonIsActive ? 'Войти' : 'Выполняется вход...'}</button>
                <div className='authorization-page-form-restore-password-wrapper'>
                    <Link className='authorization-page-form-restore-password' to='/restore-password'>Восстановить пароль</Link>
                </div>
                <div className='authorization-page-form-services'>
                    <p className='authorization-page-form-services-title'>Войти через:</p>
                    <div className='authorization-page-form-services-buttons'>
                        <button className='authorization-page-form-services-button' onClick={event => event.preventDefault()}>
                            <img className='authorization-page-form-services-button-icon' src={authorizationPageFormServicesIcon1} alt='Иконка сервиса' />
                        </button>
                        <button className='authorization-page-form-services-button' onClick={event => event.preventDefault()}>
                            <img className='authorization-page-form-services-button-icon' src={authorizationPageFormServicesIcon2} alt='Иконка сервиса' />
                        </button>
                        <button className='authorization-page-form-services-button' onClick={event => event.preventDefault()}>
                            <img className='authorization-page-form-services-button-icon' src={authorizationPageFormServicesIcon3} alt='Иконка сервиса' />
                        </button>
                    </div>
                </div>
                <img className='authorization-page-form-image' src={authorizationPageFormImage} alt='Замок' />
            </form>
            <img className='authorization-page-image' src={authorizationPageImage} alt='Два человека несут ключ' />
        </main>
    );
}

export default Authorization;