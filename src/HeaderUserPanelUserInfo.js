import './HeaderUserPanelUserInfo.css';

function HeaderUserPanelUserInfo({ userData, exitButtonHandler }) {
    return (
        <div className='user-info'>
            <div className='user-info-leftside'>
                <div className='user-info-name'>{userData.name}</div>
                <div className='user-info-logout'>
                    <button className='user-info-logout-button' onClick={exitButtonHandler}>Выйти</button>
                </div>
            </div>
            <div className='user-info-rightside'>
                <img className='user-info-avatar' src={userData.avatar} alt='Аватар пользователя' />
            </div>
        </div>
    );
}

export default HeaderUserPanelUserInfo;