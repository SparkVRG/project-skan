import './SearchResultsDocuments.css';
import { useState } from 'react';
import searchResultsPageItemImage from './assets/search-results-page-item-image.png';

function SearchResultsDocuments({ formatDate, sendData, accessToken }) {
    let [documentsData, setDocumentsData] = useState('');
    let [documentsIDs, setDocumentsIDs] = useState('');
    let [documentsItems, setDocumentsItems] = useState('');
    let [maxIndex, setMaxIndex] = useState(4);
    let [lastItemIsShown, setLastItemIsShown] = useState(false);

    if (documentsData === '') {
        getDocumentsData();
    }

    if (documentsData && documentsIDs === '') {
        let result;
        result = documentsData.map(item => {
            return item.encodedId;
        });

        setDocumentsIDs({ ids: result });
    }

    if (documentsIDs && documentsItems === '') {
        getDocumentsItems();
    }

    let elementDocumentsItem;

    if (documentsItems) {
        elementDocumentsItem = documentsItems.map((item, index) => {
            let text = item.ok.content.markup.replace(/(<([^>]+)>)/gi, '');
            text = text.replaceAll(/&lt;.*&gt;/g, '');
            text = text.trim();

            if (text.length > 300) {
                text = text.slice(0, 300) + '...';
            }

            if (index > maxIndex) {
                // eslint-disable-next-line
                return;
            }

            if (index === documentsItems.length - 1 && !lastItemIsShown) {
                setLastItemIsShown(true);
            }

            let elementTagTechNews = (
                <div className='search-results-page-documents-item-label'>Технические новости</div>
            );

            let elementTagAnnouncement = (
                <div className='search-results-page-documents-item-label'>Анонсы и события</div>
            );

            let elementTagDigest = (
                <div className='search-results-page-documents-item-label'>Сводки новостей</div>
            );

            return (
                <div key={index} className='search-results-page-documents-item'>
                    <div className='search-results-page-documents-item-info'>
                        <time dateTime={item.ok.issueDate.split('T')[0]} className='search-results-page-documents-item-time'>{formatDate(item.ok.issueDate.split('T')[0])}</time>
                        <span className='search-results-page-documents-item-source'>{item.ok.url ? <a className='search-results-page-documents-item-source-link' href={item.ok.url} target='_blank' rel='noreferrer'>{item.ok.source.name}</a> : item.ok.source.name}</span>
                    </div>
                    <h3 className='search-results-page-documents-item-title'>{item.ok.title.text}</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {item.ok.attributes.isTechNews && elementTagTechNews}
                        {item.ok.attributes.isAnnouncement && elementTagAnnouncement}
                        {item.ok.attributes.isDigest && elementTagDigest}
                    </div>
                    <div className='search-results-page-documents-item-image' style={{ backgroundImage: `url(${searchResultsPageItemImage})` }}></div>
                    <p className='search-results-page-documents-item-text'>{text}</p>
                    <button className='search-results-page-documents-item-go-to-source-button' onClick={() => { if (item.ok.url) { window.open(item.ok.url) } }} disabled={item.ok.url ? false : true}>Читать в источнике</button>
                    <div className='search-results-page-documents-item-words'>{item.ok.attributes.wordCount} слов(а)</div>
                </div>
            );
        });
    }

    function getDocumentsData() {
        let URL = 'https://gateway.scan-interfax.ru/api/v1/objectsearch';

        let options = {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };

        fetch(URL, options)
            .then(response => response.json())
            .then(data => {
                setDocumentsData(data.items)
            });
    }

    function getDocumentsItems() {
        let URL = 'https://gateway.scan-interfax.ru/api/v1/documents';

        let options = {
            method: 'POST',
            body: JSON.stringify(documentsIDs),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };

        fetch(URL, options)
            .then(response => response.json())
            .then(data => {
                let result = [];

                data.forEach(item => {
                    if (!item.fail) {
                        result.push(item);
                    }
                });

                setDocumentsItems(result);
            });
    }

    return (
        <section className='search-results-page-documents' style={!documentsItems ? { display: 'none' } : { display: 'block' }}>
            <h2 className='search-results-page-documents-title'>СПИСОК ДОКУМЕНТОВ</h2>
            <div className='search-results-page-documents-list'>
                {elementDocumentsItem}
            </div>
            <button className='search-results-page-show-more-button' onClick={() => setMaxIndex(maxIndex + 5)} style={lastItemIsShown ? { display: 'none' } : { display: 'block' }}>Показать больше</button>
        </section>
    );
}

export default SearchResultsDocuments;