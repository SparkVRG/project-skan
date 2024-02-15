import './Rates.css';
import ratesItemIcon1 from './assets/rates-item-icon-1.svg';
import ratesItemIcon2 from './assets/rates-item-icon-2.svg';
import ratesItemIcon3 from './assets/rates-item-icon-3.svg';
import ratesItemPossibilitiesListIcon from './assets/rates-item-possibilities-list-icon.svg';

function Rates({ isAuthorized, userData }) {
    let rates = [
        {
            id: 1,
            name: 'beginner',
            description: 'Для небольшого исследования',
            icon: ratesItemIcon1,
            price: 799,
            oldPrice: 1200,
            priceWithInstallments: 150,
            possitilities: [
                'Безлимитная история запросов',
                'Безопасная сделка',
                'Поддержка 24/7'
            ],
            color: '#ffb64f'
        },
        {
            id: 2,
            name: 'pro',
            description: 'Для HR и фрилансеров',
            icon: ratesItemIcon2,
            price: 1299,
            oldPrice: 2600,
            priceWithInstallments: 279,
            possitilities: [
                'Все пункты тарифа Beginner',
                'Экспорт истории',
                'Рекомендации по приоритетам'
            ],
            color: '#7ce3e1'
        },
        {
            id: 3,
            name: 'business',
            description: 'Для корпоративных клиентов',
            icon: ratesItemIcon3,
            price: 2379,
            oldPrice: 3700,
            possitilities: [
                'Все пункты тарифа Pro',
                'Безлимитное количество запросов',
                'Приоритетная поддержка'
            ],
            color: '#000000'
        },
    ];

    let currentRate = isAuthorized ? userData.currentRate : null;

    let elementRates = rates.map(item => {
        let className = `rates-item rates-item_${item.name}`;
        let rateName = item.name[0].toUpperCase() + item.name.slice(1);

        let elementPossibilities = item.possitilities.map((item, index) => {
            return (
                <li key={index} className='rates-item-possibilities-item'>
                    <img className='rates-item-possibilities-item-icon' src={ratesItemPossibilitiesListIcon} alt='Галочка' />
                    {item}
                </li>
            );
        });

        let elementButton = (
            <button className='rates-item-button'>Подробнее</button>
        );

        let elementButtonForCurrentRate = (
            <button className='rates-item-button rates-item-button_for-current-rate'>Перейти в личный кабинет</button>
        );

        return (
            <div key={item.id} className={className} style={item.name === currentRate ? { outline: `2px solid ${item.color}` } : { outline: 'none' }}>
                <div className='rates-item-top'>
                    <h3 className='rates-item-title'>{rateName}</h3>
                    <p className='rates-item-description'>{item.description}</p>
                    <img className='rates-item-icon' src={item.icon} alt={`Иконка тарифа`} />
                </div>
                <div className='rates-item-bottom'>
                    {item.name === currentRate && <div className='rates-item-badge-current'>Текущий тариф</div>}
                    <div className='rates-item-price'>
                        {item.price} &#8381;<span className='rates-item-old-price'>{item.oldPrice} &#8381;</span><br />
                        {item.priceWithInstallments && <span className='rates-item-price-with-installments'>или {item.priceWithInstallments} &#8381;/мес. при рассрочке на 24 мес.</span>}
                    </div>
                    <h4 className='rates-item-possibilities-title'>В тариф входит:</h4>
                    <ul className='rates-item-possibilities-list'>
                        {elementPossibilities}
                    </ul>
                    {item.name === currentRate ? elementButtonForCurrentRate : elementButton}
                </div>
            </div>
        );
    });

    return (
        <section className='rates'>
            <h2 className='rates-title'>НАШИ ТАРИФЫ</h2>
            <div className='rates-list'>
                {elementRates}
            </div>
        </section>
    );
}

export default Rates;