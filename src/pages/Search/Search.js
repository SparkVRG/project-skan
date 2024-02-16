import './Search.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchPageImage1 from './assets/search-page-image-1.png';
import searchPageImage2 from './assets/search-page-image-2.png';
import searchPageImage3 from './assets/search-page-image-3.png';
import searchPageSelectArrow from './assets/search-page-select-arrow.svg'
import searchPageCheckbox from './assets/search-page-checkbox.svg';

function Search({ setSearchData }) {
    let navigate = useNavigate();

    let [INN, setINN] = useState('');
    let [tonality, setTonality] = useState('any');
    let [documents, setDocuments] = useState('');
    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');

    let elementErrorINN = (
        <p className='search-page-form-error'>Введите корректные данные</p>
    );

    let [INNError, setINNError] = useState(false);

    if (INN && INNError) {
        if (validateINN(INN)) {
            setINNError(false);
        }
    }

    let elementErrorDocuments = (
        <p className='search-page-form-error'>Введите значение от 1 до 1000</p>
    );

    let [documentsError, setDocumentsError] = useState(false);

    if (documents && documentsError) {
        if (documents > 0 && documents < 1001) {
            setDocumentsError(false);
        }
    }

    if (startDate && endDate) {
        if (Date.parse(endDate) < Date.parse(startDate)) {
            setEndDate('');
        }
    }

    if (startDate && (Date.parse(startDate) > Date.parse(new Date()))) {
        setStartDate('');
    }

    if (endDate && (Date.parse(endDate) > Date.parse(new Date()))) {
        setEndDate('');
    }

    let [isMaxFullness, setIsMaxFullness] = useState(true);
    let [isBusinessNews, setIsBusinessNews] = useState(true);
    let [isOnlyMainRole, setIsOnlyMainRole] = useState(true);
    let [isOnlyWithRiskFactors, setIsOnlyWithRiskFactors] = useState(false);
    let [isTechNews, setIsTechNews] = useState(false);
    let [isAnnouncement, setIsAnnouncement] = useState(true);
    let [isDigest, setIsDigest] = useState(false);

    function validateINN(value) {
        if (typeof value !== 'string' ||
            (value.length !== 10 && value.length !== 12) ||
            value.split('').some((symbol) => isNaN(Number(symbol)))
        ) return false;

        if (value.length === 10) {
            return Number(value[9]) === (value.split('').slice(0, -1)
                .reduce(
                    (summ, symbol, index) =>
                        [2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ,
                    0)
                % 11) % 10;

        } else if (value.length === 12) {
            let checkSumOne = (value.split('').slice(0, -2)
                .reduce(
                    (summ, symbol, index) =>
                        [7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ,
                    0)
                % 11) % 10;

            let checkSumTwo = (value.split('').slice(0, -1)
                .reduce(
                    (summ, symbol, index) =>
                        [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ,
                    0)
                % 11) % 10;

            return (checkSumOne === Number(value[10]) && checkSumTwo === Number(value[11]));
        }
    }

    function searchButtonHandler(event) {
        event.preventDefault();

        let newSearchData = {
            INN: INN,
            tonality: tonality,
            documents: documents,
            startDate: startDate,
            endDate: endDate,
            isMaxFullness: isMaxFullness,
            isBusinessNews: isBusinessNews,
            isOnlyMainRole: isOnlyMainRole,
            isOnlyWithRiskFactors: isOnlyWithRiskFactors,
            isTechNews: isTechNews,
            isAnnouncement: isAnnouncement,
            isDigest: isDigest
        };

        setSearchData(newSearchData);

        navigate('/search-results');
    }

    return (
        <main className='search-page'>
            <h1 className='search-page-title'>НАЙДИТЕ НЕОБХОДИМЫЕ ДАННЫЕ В ПАРУ КЛИКОВ.</h1>
            <p className='search-page-description'>Задайте параметры поиска.<br />Чем больше заполните, тем точнее поиск</p>
            <form className='search-page-form'>
                <div className='search-page-form-inputs'>
                    <label className='search-page-form-label search-page-form-label_inn' htmlFor='search-page-form-inn-input'>ИНН компании<span style={INNError ? { color: '#ff5959' } : { color: '#000000' }}>*</span></label><br />
                    <input className='search-page-form-input' id='search-page-form-inn-input' type='number' placeholder='10 цифр' onBlur={() => !validateINN(INN) ? setINNError(true) : setINNError(false)} value={INN} onChange={event => setINN(event.target.value)} style={INNError ? { border: '1px solid #ff5959' } : { border: '1px solid #c7c7c7' }} /><br />
                    {INNError && elementErrorINN}
                    <label className='search-page-form-label search-page-form-label_tonality' htmlFor='search-page-form-tonality-select'>Тональность</label><br />
                    <select className='search-page-form-select' id='search-page-form-tonality-select' value={tonality} onChange={event => setTonality(event.target.value)} style={{ backgroundImage: `url(${searchPageSelectArrow})` }}>
                        <option value='any'>Любая</option>
                        <option value='negative'>Негативная</option>
                        <option value='positive'>Позитивная</option>
                    </select><br />
                    <label className='search-page-form-label search-page-form-label_documents' htmlFor='search-page-form-documents-input'>Количество документов в выдаче<span style={documentsError ? { color: '#ff5959' } : { color: '#000000' }}>*</span></label><br />
                    <input className='search-page-form-input' id='search-page-form-documents-input' type='number' placeholder='От 1 до 1000' onBlur={() => documents !== '' && (documents < 1 || documents > 1000) ? setDocumentsError(true) : setDocumentsError(false)} value={documents} onChange={event => setDocuments(event.target.value)} style={documentsError ? { border: '1px solid #ff5959' } : { border: '1px solid #c7c7c7' }} /><br />
                    {documentsError && elementErrorDocuments}
                    <label className='search-page-form-label search-page-form-label_range' htmlFor='search-page-form-range-select_start-date'>Диапазон поиска*</label><br />
                    <input className='search-page-form-select search-page-form-select_dates' type='text' min='2000-01-01' max={endDate ? endDate : new Date().toISOString().split('T')[0]} id='search-page-form-range-select_start-date' placeholder='Дата начала' onFocus={event => { event.target.type = 'date'; event.target.style.backgroundImage = 'none'; event.target.showPicker() }} onBlur={event => { event.target.type = 'text'; event.target.style.backgroundImage = `url(${searchPageSelectArrow})` }} value={startDate} onChange={event => setStartDate(event.target.value)} style={{ backgroundImage: `url(${searchPageSelectArrow})` }} />
                    <br className='search-page-form-dates-br' />
                    <label htmlFor='search-page-form-range-select_end-date'></label>
                    <input className='search-page-form-select search-page-form-select_dates' type='text' min='2000-01-01' max={new Date().toISOString().split('T')[0]} id='search-page-form-range-select_end-date' placeholder='Дата конца' onFocus={event => { event.target.type = 'date'; event.target.style.backgroundImage = 'none'; event.target.showPicker() }} onBlur={event => { event.target.type = 'text'; event.target.style.backgroundImage = `url(${searchPageSelectArrow})` }} value={endDate} onChange={event => setEndDate(event.target.value)} style={{ backgroundImage: `url(${searchPageSelectArrow})` }} />
                </div>
                <div className='search-page-form-checkboxes'>
                    <label className='search-page-form-label search-page-form-label_checkbox' htmlFor='search-page-form-fullness-checkbox' style={isMaxFullness ? { color: '#000000' } : { color: '#999999' }}>
                        <input className='search-page-form-checkbox' id='search-page-form-fullness-checkbox' type='checkbox' checked={isMaxFullness} onChange={() => setIsMaxFullness(!isMaxFullness)} />
                        <span className='search-page-form-checkbox-view'>
                            <img className='search-page-form-checkbox-view-icon' src={searchPageCheckbox} alt='Иконка чекбокса' />
                        </span>
                        Признак максимальной полноты
                    </label><br />
                    <label className='search-page-form-label search-page-form-label_checkbox' htmlFor='search-page-form-business-checkbox' style={isBusinessNews ? { color: '#000000' } : { color: '#999999' }}>
                        <input className='search-page-form-checkbox' id='search-page-form-business-checkbox' type='checkbox' checked={isBusinessNews} onChange={() => setIsBusinessNews(!isBusinessNews)} />
                        <span className='search-page-form-checkbox-view'>
                            <img className='search-page-form-checkbox-view-icon' src={searchPageCheckbox} alt='Иконка чекбокса' />
                        </span>
                        Упоминания в бизнес-контексте
                    </label><br />
                    <label className='search-page-form-label search-page-form-label_checkbox' htmlFor='search-page-form-main-role-checkbox' style={isOnlyMainRole ? { color: '#000000' } : { color: '#999999' }}>
                        <input className='search-page-form-checkbox' id='search-page-form-main-role-checkbox' type='checkbox' checked={isOnlyMainRole} onChange={() => setIsOnlyMainRole(!isOnlyMainRole)} />
                        <span className='search-page-form-checkbox-view'>
                            <img className='search-page-form-checkbox-view-icon' src={searchPageCheckbox} alt='Иконка чекбокса' />
                        </span>
                        Главная роль в публикации
                    </label><br />
                    <label className='search-page-form-label search-page-form-label_checkbox' htmlFor='search-page-form-risk-factors-checkbox' style={isOnlyWithRiskFactors ? { color: '#000000' } : { color: '#999999' }}>
                        <input className='search-page-form-checkbox' id='search-page-form-risk-factors-checkbox' type='checkbox' checked={isOnlyWithRiskFactors} onChange={() => setIsOnlyWithRiskFactors(!isOnlyWithRiskFactors)} />
                        <span className='search-page-form-checkbox-view'>
                            <img className='search-page-form-checkbox-view-icon' src={searchPageCheckbox} alt='Иконка чекбокса' />
                        </span>
                        Публикации только с риск-факторами
                    </label><br />
                    <label className='search-page-form-label search-page-form-label_checkbox' htmlFor='search-page-form-tech-checkbox' style={isTechNews ? { color: '#000000' } : { color: '#999999' }}>
                        <input className='search-page-form-checkbox' id='search-page-form-tech-checkbox' type='checkbox' checked={isTechNews} onChange={() => setIsTechNews(!isTechNews)} />
                        <span className='search-page-form-checkbox-view'>
                            <img className='search-page-form-checkbox-view-icon' src={searchPageCheckbox} alt='Иконка чекбокса' />
                        </span>
                        Включать технические новости рынков
                    </label><br />
                    <label className='search-page-form-label search-page-form-label_checkbox' htmlFor='search-page-form-announcement-checkbox' style={isAnnouncement ? { color: '#000000' } : { color: '#999999' }}>
                        <input className='search-page-form-checkbox' id='search-page-form-announcement-checkbox' type='checkbox' checked={isAnnouncement} onChange={() => setIsAnnouncement(!isAnnouncement)} />
                        <span className='search-page-form-checkbox-view'>
                            <img className='search-page-form-checkbox-view-icon' src={searchPageCheckbox} alt='Иконка чекбокса' />
                        </span>
                        Включать анонсы и календари
                    </label><br />
                    <label className='search-page-form-label search-page-form-label_checkbox' htmlFor='search-page-form-digest-checkbox' style={isDigest ? { color: '#000000' } : { color: '#999999' }}>
                        <input className='search-page-form-checkbox' id='search-page-form-digest-checkbox' type='checkbox' checked={isDigest} onChange={() => setIsDigest(!isDigest)} />
                        <span className='search-page-form-checkbox-view'>
                            <img className='search-page-form-checkbox-view-icon' src={searchPageCheckbox} alt='Иконка чекбокса' />
                        </span>
                        Включать сводки новостей
                    </label>
                </div>
                <div className='search-page-form-button-place'>
                    <button className='search-page-form-button' onClick={event => searchButtonHandler(event)} disabled={INN === '' || documents === '' || startDate === '' || endDate === '' || !validateINN(INN) ? true : false || documents < 0 || documents > 1000}>Поиск</button>
                    <p className='search-page-form-button-description'>* Обязательные к заполнению поля</p>
                </div>
            </form>
            <img className='search-page-image search-page-image_1' src={searchPageImage1} alt='Картинка для страницы поиска' />
            <img className='search-page-image search-page-image_2' src={searchPageImage2} alt='Картинка для страницы поиска' />
            <img className='search-page-image search-page-image_3' src={searchPageImage3} alt='Картинка для страницы поиска' />
        </main>
    );
}

export default Search;