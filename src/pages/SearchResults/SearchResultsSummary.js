import './SearchResultsSummary.css';
import SearchResultsSummaryCarousel from './SearchResultsSummaryCarousel';

function SearchResultsSummary({ summaryData, notFound }) {
    let element = (
        <section className='search-results-page-summary'>
            <h2 className='search-results-page-summary-title'>ОБЩАЯ СВОДКА</h2>
            <p className='search-results-page-summary-results-count'>{notFound ? 'По заданным параметрам данных нет' : 'Найдено 4221 вариантов'}</p>
            <SearchResultsSummaryCarousel summaryData={summaryData} />
        </section>
    );

    return (
        <>
            {summaryData && element}
        </>
    );
}

export default SearchResultsSummary;