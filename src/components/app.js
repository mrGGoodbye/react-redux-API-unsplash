import React from 'react';
import { connect } from 'react-redux'
import { action_SET_list_photos } from '../actions';
import {unsplash} from '../../src/index.js';
import {Router, Route, hashHistory, Link} from 'react-router';

// Эту функцию API будем вызывать из REACT
// listPhotos
let page = 1;
const n = 10;
const func_list_photo=(func_new_list_photo)=>{
  // ДОбавим API listPhotos
  console.log('unsplash in app.js==',unsplash);
  unsplash.photos.listPhotos(page, n, "latest")
    .then(res => res.json())
    .then(json => {
      // Your code
      console.log('JSON_list_photo__TOKEN--- ', json);
      //
      let propValue=[];
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
      propValue.map((item, i)=>{
        func_new_list_photo(propValue[i]);
      })
    });
    // end my code
}

// эта функция будет загружать еще фото
const func_load_foto=(func_new_list_photo)=>{
   console.log('Загружаем еще фото...');
   // ДОбавим API listPhotos
   page = page + 1;
   unsplash.photos.listPhotos(page, n, "latest")
     .then(res => res.json())
     .then(json => {
       // Your code
       console.log('NEW_JSON_list_photo__TOKEN--- ', json);
       let propValue=[];
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
       console.log('NEW_MASSSIVE_NEW_PHOTO : ', propValue);
       propValue.map((item, i)=>{
         func_new_list_photo(propValue[i]);
       })
     });
     // end my code
}


let ii =0;
// Здесь мы из REACT вызываем функцию API
let App_Con = (props) =>{
  console.log('PROPS_QWERTY==', props);
  //console.log('ii==', ii++);
  // вызывем функции с API в REACT
  // func_photo("mtNweauBsMQ", props.funcSetIMG);
  // func_photo("kBJEJqWNtNY", props.funcSetIMG);
  if(!props.IMGGESS[0]){
    console.log('props.IMGGESS[0]= ',props.IMGGESS[0]);
    console.log('ii==', ii);
    if(ii<=0) func_list_photo(props.func_new_list_photo);
    console.log('ii==', ++ii);
  };

  window.onscroll = function() {
    var app2 = document.querySelector('#app2');
    if((window.scrollY>=app2.clientHeight - window.innerHeight)&&(window.location.hash=='#/'))
      {
        console.log('END!!! ',window.scrollY);
        func_load_foto(props.func_new_list_photo);
      }
  }
  return (
    <div>
      <h2>  Мой Unsplash </h2>
      <div>
        {props.IMGGESS.map((el,i) =>{
          var date = new Date(el.date);
          return  <div key={i}>
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
