import './HeaderCompaniesInfo.css';
import loadingSpinner from './assets/loading-spinner.svg';

function HeaderCompaniesInfo({ isAuthorized, userData }) {
    let element = (
        <div className='companies-info'>
            <div className='companies-info-container'>
                <div className='companies-info-leftside' style={!userData.hasOwnProperty('companiesLimit') ? { display: 'none' } : { display: 'block' }}>
                    <div className='companies-info-description'>Использовано компаний</div>
                    <div className='companies-info-description'>Лимит по компаниям</div>
                </div>
                <div className='companies-info-rightside' style={!userData.hasOwnProperty('companiesLimit') ? { display: 'none' } : { display: 'block' }}>
                    <div className='companies-info-quantity'>{userData.companiesUsed}</div>
                    <div className='companies-info-quantity companies-info-quantity_limit'>{userData.companiesLimit}</div>
                </div>
                <div className='companies-info-loading-spinner' style={!userData.hasOwnProperty('companiesLimit') ? { display: 'block' } : { display: 'none' }}>
                    <img className='companies-info-loading-spinner-image' src={loadingSpinner} alt='Иконка загрузки' />
                </div>
            </div>
        </div>
    );

    return (
        <>
            {isAuthorized && element}
        </>
    );
}

export default HeaderCompaniesInfo;