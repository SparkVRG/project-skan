import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Homepage from './pages/Homepage/Homepage';
import Authorization from './pages/Authorization/Authorization';
import Search from './pages/Search/Search';
import SearchResults from './pages/SearchResults/SearchResults';
import NotFound from './pages/NotFound/NotFound';
import Footer from './Footer';
import avatar from './assets/avatar.png';

function App() {
  let [isAuthorized, setIsAuthorized] = useState(false);
  let [userData, setUserData] = useState('');
  let [searchData, setSearchData] = useState('');

  if (userData === '' && localStorage.getItem('accessToken')) {
    if (Date.parse(localStorage.getItem('expire')) >= Date.parse(new Date())) {
      let newUserData = {
        name: 'Алексей А.',
        avatar: avatar,
        currentRate: 'beginner'
      };

      // В рамках учебного проекта имя, аватар и текущий тариф берутся не с сервера, а устанавливаются одинаковые для всех пользователей.
      // Так сделано из-за того, что API не даёт возможности получить эти данные.
      // В реальном проекте эти данные были бы запрошены так же, как и информация о компаниях - через функцию getCompaniesInfo ниже.

      setUserData(newUserData);
      setIsAuthorized(true);
    } else {
      localStorage.clear();
    }
  }

  if (isAuthorized === true && !userData.hasOwnProperty('companiesLimit')) {
    getCompaniesInfo(localStorage.getItem('accessToken'));
  }

  function getCompaniesInfo(accessToken) {
    let URL = 'https://gateway.scan-interfax.ru/api/v1/account/info';

    let options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    fetch(URL, options)
      .then(response => response.json())
      .then(data => {
        let newUserData = Object.assign({}, userData);
        newUserData.companiesLimit = data.eventFiltersInfo.companyLimit;
        newUserData.companiesUsed = data.eventFiltersInfo.usedCompanyCount;

        setUserData(newUserData);
      });
  }

  return (
    <>
      <Header isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} userData={userData} setUserData={setUserData} />
      <Routes>
        <Route path='/' element={<Navigate to='/project-skan' />} />
        <Route path='/project-skan' element={<Homepage isAuthorized={isAuthorized} userData={userData} />} />
        {/* Перенаправление выше сделано для того, чтобы проект корректно работал на GitHub Pages.
            Впрочем, с GitHub Pages всё равно не всё идеально. :)  */}
        <Route path='/authorization' element={isAuthorized ? <Navigate to='/' /> : <Authorization setUserData={setUserData} setIsAuthorized={setIsAuthorized} />} />
        <Route path='/search' element={isAuthorized ? <Search setSearchData={setSearchData} /> : <Navigate to='/' />} />
        <Route path='/search-results' element={isAuthorized && searchData !== '' ? <SearchResults searchData={searchData} accessToken={localStorage.getItem('accessToken')} /> : <Navigate to='/' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;