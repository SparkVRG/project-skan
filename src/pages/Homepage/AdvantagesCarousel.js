import './AdvantagesCarousel.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import advantagesCarouselArrowLeft from './assets/advantages-carousel-arrow-left.svg';
import advantagesCarouselArrowRight from './assets/advantages-carousel-arrow-right.svg';

function AdvantagesCarousel({ advantages }) {
    function CarouselArrow({ className, onClick, arrow }) {
        let styles = {
            backgroundImage: `url(${arrow})`,
            width: '18px',
            height: '33px'
        };

        return (
            <div className={className} style={styles} onClick={onClick}></div>
        );
    }

    let sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <CarouselArrow arrow={advantagesCarouselArrowLeft} />,
        nextArrow: <CarouselArrow arrow={advantagesCarouselArrowRight} />,
        responsive: [
            {
                breakpoint: 1075,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 715,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    let elementAdvantages = advantages.map(item => {
        return (
            <div key={item.id} className='advantages-carousel-item-wrapper'>
                <div className='advantages-carousel-item'>
                    <img className='advantages-carousel-item-icon' src={item.icon} alt='Иконка преимущества' />
                    <p className='advantages-carousel-item-description'>{item.description}</p>
                </div>
            </div>
        );
    });

    return (
        <div className='advantages-carousel'>
            <div className='advantages-carousel-container'>
                <Slider {...sliderSettings}>
                    {elementAdvantages}
                </Slider>
            </div>
        </div>
    );
}

export default AdvantagesCarousel;