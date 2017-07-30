// подключаем необходимые модули React и Unsplash
import React from 'react';
import { connect } from 'react-redux'
import { action_SET_list_photos } from '../actions';
import {unsplash} from '../../src/index.js';
import {Router, Route, hashHistory, Link} from 'react-router';

// счетчик страниц и количества фоток на каждой странице
let page = 1;
const n = 10;

// функция загруки первого списка фотографий
const func_list_photo=(func_new_list_photo)=>{
  console.log('unsplash in app.js==',unsplash);
  // делаем запрос в unsplash
  unsplash.photos.listPhotos(page, n, "latest")
    .then(res => res.json())
    .then(json => {
      console.log('JSON_list_photo__TOKEN--- ', json);
      let propValue=[];
      // разбираем полученный результат и сохраняем его в propValue
      for(let prop in json){
        if(json.hasOwnProperty(prop)){
          // let propValue = json[prop].urls.small;
          propValue = [
            ...propValue,
            {
              id: json[prop].id,
              url: json[prop].urls.small,
              url_full: json[prop].urls.full,
              author_name: json[prop].user.name,
              author_link: json[prop].user.links.html,
              date: json[prop].created_at,
              likes: json[prop].likes,
              liked_by_user: json[prop].liked_by_user
            }
          ];
          console.log(prop+' : ', propValue);
        }
      }
      console.log('MASSSIVE_PHOTO : ', propValue);
      // для каждого элемента propValue вызываем функцию,
      // которая вызовет action-creators "action_SET_list_photos"
      propValue.map((item, i)=>{
        func_new_list_photo(propValue[i]);
      })
    });
}

// эта функция будет загружать новые списки фото
// будем листать страницы
const func_load_foto=(func_new_list_photo, load_ok)=>{
   console.log('Загружаем еще фото...');
   // листаем следующую станицу
   page = page + 1;
   // делаем запрос в UNSPLASH
   unsplash.photos.listPhotos(page, n, "latest")
     .then(res => res.json())
     .then(json => {
       // Your code
       console.log('NEW_JSON_list_photo__TOKEN--- ', json);
       let propValue=[];
       // разбираем полученный результат и сохраняем его в propValue
       for(let prop in json){
         if(json.hasOwnProperty(prop)){
          propValue = [
             ...propValue,
             {
               id: json[prop].id,
               url: json[prop].urls.small,
               url_full: json[prop].urls.full,
               author_name: json[prop].user.name,
               author_link: json[prop].user.links.html,
               date: json[prop].created_at,
               likes: json[prop].likes,
               liked_by_user: json[prop].liked_by_user
             }
           ];
           console.log(prop+' : ', propValue);
         }
       }
       console.log('NEW_MASSSIVE_NEW_PHOTO : ', propValue);
       // для каждого элемента propValue вызываем функцию,
       // которая вызовет action-creators "action_SET_list_photos"
       propValue.map((item, i)=>{
         func_new_list_photo(propValue[i]);
       })
       load_ok = true;
     });
     // end my code
}

// делаем счетчик рендинга при первоначальной загрузке странице
// чтобы не загружать несколько раз пока незагружен первый результат,
// так как ему нужно время для получения результата и загрузки
let nn=0;
let load_first = true;
let func_log = () => {
  console.log("Сработало! ---- ", nn++);
  load_first = false;
}


// Создаем компонен App_Con
// основной компонент будет показывать список фотографий
let App_Con = (props) =>{
  console.log('PROPS_QWERTY==', props);
  // загружаем первый списко через Timeout
  // иначе из unsplash загрузятся не актульные данные по лайкам польлзователя
  const for_timeout=()=>{
    func_list_photo(props.func_new_list_photo);
    console.log('Timeout Ok');
  }
  if(nn==1){
    setTimeout(for_timeout, 1000);
  }
  func_log();
  // load_ok - для подстраховки если пока незагрузились новые фото
  // будут крутить скролом на месте удовлетворяющем условиям
  let load_ok = true;
  // функция для отлавливания момента скрола вниз для загрузки новых фото
  window.onscroll = function() {
    var app2 = document.querySelector('#app2');
    if((load_ok)&&(window.scrollY>=app2.clientHeight - window.innerHeight+26)&&(window.location.hash=='#/'))
      {
        console.log('END!!! ',window.scrollY);
        load_ok = false;
        func_load_foto(props.func_new_list_photo, load_ok);
      }
  }
  // сторим наше приложение
  // загружаем первый список фото
  // новый список загружаем при скроле в самый низ или по нажатии кнопки
  return (
    <div >
      <h2>  Мой Unsplash </h2>
      <div>
        {props.IMGGESS.map((el,i) =>{
          var date = new Date(el.date);
          return  <div key={i} >
                      <div><Link to={`/photo/${el.id}`} key={i+100}><img src={el.url} /></Link></div>
                      <div><a href={el.author_link+'?utm_source=over&utm_medium=referral&utm_campaign=api-credit'} target="_blank" key={i+10}>{el.author_name}</a></div>
                      <div>Дата публикации: {date.toUTCString()}</div>
                      <div>Количество лайков: {el.likes}</div>
                  </div>
        })}
      </div>
      <button
        className={'button_load_foto'}
        onClick={ev=>func_load_foto(props.func_new_list_photo)}
      >Загрузить еще...</button>
    </div>
  )
}

// создаем store и action-creators
const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.todos,
    IMGGESS: state.IMGGESS,
    ownProps
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // функция для listPhotos
    func_new_list_photo: (props) => {
      dispatch(action_SET_list_photos(props))
    }
  }
}
let App_Con22 = connect(
  mapStateToProps,
  mapDispatchToProps
)(App_Con)

export default App_Con22;
