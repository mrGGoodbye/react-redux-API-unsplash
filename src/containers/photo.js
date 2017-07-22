import React from 'react';
import { connect } from 'react-redux'
import { action_update_like } from '../actions';
import {unsplash} from '../../src/index.js';
import {Router, Route, hashHistory, Link} from 'react-router';

// эта функция будет лайкать фотографию
const func_like = (id, func_action_update_like, liked_by_user) =>{
  console.log('LIKE!!! ', id, liked_by_user);
if(liked_by_user==true){
  console.log('unlike');
  unsplash.photos.unlikePhoto(id)
  .then(res => res.json())
  .then(json => {
    // Your code
    console.log(json);
    console.log('id= ', id);
    console.log('likes= ', json.photo.likes);
    func_action_update_like(id, json.photo.likes, json.photo.liked_by_user);
  })
}
else {
  console.log('like');
  unsplash.photos.likePhoto(id)
  .then(res => res.json())
  .then(json => {
    // Your code
    console.log(json);
    console.log('id= ', id);
    console.log('likes= ', json.photo.likes);
    func_action_update_like(id, json.photo.likes, json.photo.liked_by_user);
  })
};
}

let Photo =(props)=>{
  console.log('PHOTOOO==', props);
  let date = new Date(props.photooo.date);
  let liked;
    if(props.photooo.liked_by_user==false){
      liked = "Like this photo";
    }
    else {
      liked = "Unlike this photo";
    }
  return (
    <div>
      <h2>PHOTO</h2>
      <div><a href={props.photooo.author_link+'??utm_source=over&utm_medium=referral&utm_campaign=api-credit'} target="_blank" >{props.photooo.author_name}</a></div>
      <div>Дата публикации: {date.toUTCString()}</div>
      <div>Количество лайков: {props.photooo.likes}</div>
      <button onClick={ev=>func_like(props.photooo.id, props.func_action_update_like, props.photooo.liked_by_user)}>{liked}</button>
      <div><Link to="/" >Назад</Link></div>
      <div><img src={props.photooo.url_full} /></div>
    </div>
    )
}

const mapStateToProps2= (state, ownProps)=>{
  console.log('ownProps==',ownProps);
  return {
    photooo: state.IMGGESS.find(photo => photo.id === ownProps.params.id)
  };
};
const mapDispatchToProps2 = (dispatch) => {
  return {
    func_action_update_like: (id, likes, liked_by_user) => {
      dispatch(action_update_like(id, likes, liked_by_user))
    }
  }
};

let Photo2 = connect(
  mapStateToProps2,
  mapDispatchToProps2
)(Photo);

export default Photo2;
