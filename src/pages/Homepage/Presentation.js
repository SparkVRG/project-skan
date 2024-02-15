import './Presentation.css';
import { Link } from 'react-router-dom';
import presentationImage from './assets/presentation-image.png';

function Presentation({ isAuthorized }) {
    let elementRequestData = (
        <Link to='/search'>
            <button className='presentation-request-data'>Запросить данные</button>
        </Link>
    );

    return (
        <section className={isAuthorized ? 'presentation' : 'presentation presentation_without-button'}>
            <h1 className='presentation-title'>СЕРВИС ПО ПОИСКУ<br />ПУБЛИКАЦИЙ<br />О КОМПАНИИ<br />ПО ЕГО ИНН</h1>
            <p className='presentation-description'>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
            {isAuthorized && elementRequestData}
            <img className={isAuthorized ? 'presentation-image' : 'presentation-image presentation-image_without-button'} src={presentationImage} alt='Рисунок человека, использующего данный сервис' />
        </section>
    );
}

export default Presentation;