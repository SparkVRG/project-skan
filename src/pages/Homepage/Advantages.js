import './Advantages.css';
import AdvantagesCarousel from './AdvantagesCarousel';
import advantagesImage from './assets/advantages-image.png';
import advantagesItemIcon1 from './assets/advantages-item-icon-1.svg';
import advantagesItemIcon2 from './assets/advantages-item-icon-2.svg';
import advantagesItemIcon3 from './assets/advantages-item-icon-3.svg';

function Advantages() {
    let advantages = [
        {
            id: 1,
            icon: advantagesItemIcon1,
            description: 'Высокая и оперативная скорость обработки заявки'
        },
        {
            id: 2,
            icon: advantagesItemIcon2,
            description: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
        },
        {
            id: 3,
            icon: advantagesItemIcon3,
            description: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
        },
        {
            id: 4,
            icon: advantagesItemIcon1,
            description: 'Высокая и оперативная скорость обработки заявки'
        },
        {
            id: 5,
            icon: advantagesItemIcon2,
            description: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
        },
        {
            id: 6,
            icon: advantagesItemIcon3,
            description: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
        }
    ];

    return (
        <section className='advantages'>
            <h2 className='advantages-title'>ПОЧЕМУ <br className='advantages-title-br' />ИМЕННО МЫ</h2>
            <AdvantagesCarousel advantages={advantages} />
            <div className='advantages-image' style={{ backgroundImage: `url(${advantagesImage})` }}></div>
        </section>
    );
}

export default Advantages;