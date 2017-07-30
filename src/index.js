// Подключаем библиотеку unsplash-js
// (при настроенной webpack-сборке)
import Unsplash from 'unsplash-js';
// подключаем react и redux
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, Link} from 'react-router';
import {routerReducer} from 'react-router-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {createStore} from 'redux';
import { combineReducers } from 'redux'
// подключаем контейнеры, редьюсеры
import IMGGESS from './reducers';
import App_Con22 from './containers/app.js';
import Photo2 from './containers/photo.js';

// Создаем экземпляр объекта для доступа к API
export const unsplash = new Unsplash({
  // Application ID из настроек вашего приложения
  applicationId: "94a18de64bf393327906690c338f49b770a15678a77faf0f8e203c0ec2881d3a",
  // Application Secret из настроек вашего приложения
  secret: "e87358412d9ef6d54993adfa5f4508630f7c4792f1f547d3c72c343557dc82a2",
  // Полный адрес страницы авторизации приложения (Redirect URI)
  // Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
  //callbackUrl: "http://www.example.com/auth"
   callbackUrl: "http://localhost:8080"
  // callbackUrl: "http://pppfotos.ucoz.net"
});
console.log('UNSPLASH===== ',unsplash);
// Считываем GET-параметр code из URL
// www.example.com/auth?code=abcdef123456...
const code = location.search.split('code=')[1];
console.log('CODE== ',code);
// Если код передан, отправляем запрос на получение токена
if (code) {
  console.log('CODE== ',code);
  unsplash.auth.userAuthentication(code)
    .then(res => res.json())
    .then(json => {
      // Сохраняем полученный токен
      unsplash.auth.setBearerToken(json.access_token);
    });
}
else{
  // Генерируем адрес страницы аутентификации на unsplash.com
  // и указываем требуемые разрешения (permissions)
  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "read_user",
    "write_user",
    "read_photos",
    "write_photos",
    "write_likes"
  ]);
  // Отправляем пользователя по этому адресу
  //location.assign(authenticationUrl);
  location.href=authenticationUrl;
}
console.log('UNSPLASH===== ',unsplash);

// создаем контейнер с редьюсерами
// IMGGESS - будет хранить массив объектов с информацией о фотографиях
// routing - для передачи Router в redux
let reducer = combineReducers({ IMGGESS, routing: routerReducer })
// создаем store с контейнером редьюсеров и добавляем средства отладки браузера
let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// создаем history для Router
const history = syncHistoryWithStore(hashHistory, store);

// Делаем рендер через react-роутер
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={App_Con22} />
        <Route path="/photo/:id" component={Photo2} />
      </div>
    </Router>
  </Provider>,
  document.querySelector('#app2')
)
