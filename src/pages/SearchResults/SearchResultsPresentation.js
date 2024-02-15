import './SearchResultsPresentation.css';
import searchResultsPagePresentationImage from './assets/search-results-page-presentation-image.png';

function SearchResultsPresentation() {
    return (
        <section className='search-results-page-presentation'>
            <h1 className='search-results-page-title'>ИЩЕМ. СКОРО<br />БУДУТ РЕЗУЛЬТАТЫ</h1>
            <p className='search-results-page-description'>Поиск может занять некоторое время,<br />просим сохранять терпение.</p>
            <img className='search-results-page-presentation-image' src={searchResultsPagePresentationImage} alt='Картинка для страницы результатов поиска' />
        </section>
    );
}

export default SearchResultsPresentation;