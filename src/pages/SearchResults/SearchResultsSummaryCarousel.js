import './SearchResultsSummaryCarousel.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import advantagesCarouselArrowLeft from './assets/advantages-carousel-arrow-left.svg';
import advantagesCarouselArrowRight from './assets/advantages-carousel-arrow-right.svg';
import loadingSpinner from './assets/loading-spinner.svg'

function SearchResultsSummaryCarousel({ summaryData }) {
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

    let startSlidesToShow = 3;

    if (summaryData !== '') {
        startSlidesToShow = summaryData.length < 8 ? summaryData.length : 8;
    }

    let sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: startSlidesToShow,
        slidesToScroll: 1,
        prevArrow: <CarouselArrow arrow={advantagesCarouselArrowLeft} />,
        nextArrow: <CarouselArrow arrow={advantagesCarouselArrowRight} />,
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: startSlidesToShow - 1 > 3 ? startSlidesToShow - 1 : 3
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: startSlidesToShow - 2 > 3 ? startSlidesToShow - 2 : 3
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: startSlidesToShow - 3 > 3 ? startSlidesToShow - 3 : 3
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: startSlidesToShow - 4 > 3 ? startSlidesToShow - 4 : 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: startSlidesToShow - 5 > 3 ? startSlidesToShow - 5 : 3
                }
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    let elementItems;

    if (summaryData) {
        elementItems = summaryData.map((item, index) => {
            return (
                <div key={index} className='search-results-page-summary-carousel-item-container'>
                    <div className='search-results-page-summary-carousel-item'>
                        <div className='search-results-page-summary-carousel-item-info'>{item.date}</div>
                        <div className='search-results-page-summary-carousel-item-info'>{item.documentsCount}</div>
                        <div className='search-results-page-summary-carousel-item-info'>{item.risksCount}</div>
                    </div>
                </div>
            );
        });
    }

    let elementCarousel = (
        <div className='search-results-page-summary-carousel'>
            <div className='search-results-page-summary-carousel-titles'>
                <h3 className='search-results-page-summary-carousel-titles-item'>Период</h3>
                <h3 className='search-results-page-summary-carousel-titles-item'>Всего</h3>
                <h3 className='search-results-page-summary-carousel-titles-item'>Риски</h3>
            </div>
            <div className='search-results-page-summary-carousel-container'>
                <Slider {...sliderSettings} style={summaryData ? { display: 'block' } : { display: 'none' }}>
                    {elementItems}
                </Slider>
                <div className='search-results-page-summary-carousel-loader' style={summaryData ? { display: 'none' } : { display: 'flex' }}>
                    <div className='search-results-page-summary-carousel-loader-info'>
                        <img className='search-results-page-summary-carousel-loader-image' src={loadingSpinner} alt='Спиннер загрузки' />
                        <p className='search-results-page-summary-carousel-loader-text'>Загружаем данные</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {summaryData.length > 0 && elementCarousel}
        </>
    );
}

export default SearchResultsSummaryCarousel;