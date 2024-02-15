import './Homepage.css';
import Presentation from './Presentation';
import Advantages from './Advantages';
import Rates from './Rates';

function Main({ isAuthorized, userData }) {
    return (
        <main className='homepage'>
            <Presentation isAuthorized={isAuthorized} />
            <Advantages />
            <Rates isAuthorized={isAuthorized} userData={userData} />
        </main>
    );
}

export default Main;