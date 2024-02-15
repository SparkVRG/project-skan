import './HeaderUserPanel.css';
import HeaderUserPanelAuthorization from './HeaderUserPanelAuthorization';
import HeaderUserPanelUserInfo from './HeaderUserPanelUserInfo';

function HeaderUserPanel({ isAuthorized, userData, exitButtonHandler }) {
    return (
        <div className='user-panel'>
            {isAuthorized ? <HeaderUserPanelUserInfo userData={userData} exitButtonHandler={exitButtonHandler} /> : <HeaderUserPanelAuthorization />}
        </div>
    );
}

export default HeaderUserPanel;