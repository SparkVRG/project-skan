import './SearchResults.css';
import { useState } from 'react';
import SearchResultsPresentation from './SearchResultsPresentation';
import SearchResultsSummary from './SearchResultsSummary';
import SearchResultsDocuments from './SearchResultsDocuments';

function SearchResults({ searchData, accessToken }) {
    let [summaryData, setSummaryData] = useState('');
    let [notFound, setNotFound] = useState(false);

    let sendData = {
        issueDateInterval: {
            startDate: `${searchData.startDate}T00:00:00+03:00`,
            endDate: `${searchData.endDate}T23:59:59+03:00`
        },
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: [
                    {
                        type: 'company',
                        sparkId: null,
                        entityId: null,
                        inn: searchData.INN,
                        maxFullness: searchData.isMaxFullness,
                        inBusinessNews: searchData.isBusinessNews
                    }
                ],
                onlyMainRole: searchData.isOnlyMainRole,
                tonality: searchData.tonality,
                onlyWithRiskFactors: searchData.isOnlyWithRiskFactors,
                riskFactors: {
                    and: [],
                    or: [],
                    not: []
                },
                themes: {
                    and: [],
                    or: [],
                    not: []
                }
            },
            themesFilter: {
                and: [],
                or: [],
                not: []
            }
        },
        searchArea: {
            includedSources: [],
            excludedSources: [],
            includedSourceGroups: [],
            excludedSourceGroups: []
        },
        attributeFilters: {
            excludeTechNews: !searchData.isTechNews,
            excludeAnnouncements: !searchData.isAnnouncement,
            excludeDigests: !searchData.isDigest
        },
        similarMode: 'duplicates',
        limit: searchData.documents,
        sortType: 'sourceInfluence',
        sortDirectionType: 'desc',
        intervalType: 'month',
        histogramTypes: [
            'totalDocuments',
            'riskFactors'
        ]
    };

    if (summaryData === '') {
        getData();
    }

    function getData() {
        let URL = 'https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms';

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
                let items = [];

                if (data.data.length !== 0) {
                    data.data.forEach(item => {
                        if (item.histogramType === 'totalDocuments') {
                            items = item.data.map(item => {
                                return {
                                    date: formatDate(item.date.split('T')[0]),
                                    documentsCount: item.value
                                };
                            });
                        } else if (item.histogramType === 'riskFactors') {
                            item.data.forEach((item, index) => {
                                items[index].risksCount = item.value;
                            });
                        }
                    });

                    items = items.reverse();
                } else {
                    setNotFound(true);
                }

                setSummaryData(items);
            });
    }

    function formatDate(date) {
        let formattedDate = `${date.split('-')[2]}.${date.split('-')[1]}.${date.split('-')[0]}`;

        return formattedDate;
    }

    return (
        <main className='search-results-page'>
            <SearchResultsPresentation />
            <SearchResultsSummary summaryData={summaryData} notFound={notFound} />
            {!notFound && <SearchResultsDocuments formatDate={formatDate} sendData={sendData} accessToken={accessToken} />}
        </main>
    );
}

export default SearchResults;