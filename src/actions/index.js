// //
// ActionCreater для картинок для listPhotos
export const action_SET_list_photos=(props)=>{
    return{
      type: 'IMGGESS',
      id: props.id,
      url: props.url,
      url_full: props.url_full,
      author_name: props.author_name,
      author_link: props.author_link,
      date: props.date,
      likes: props.likes,
      liked_by_user: props.liked_by_user
    }
}
// ACtion Creators for UPDATE_LIKES
export const action_update_like=(id, likes, liked_by_user)=>{
  console.log('ACTION_update_like==', id, likes, liked_by_user);
  return {
        type: 'UPDATE_LIKES',
        id: id,
        likes: likes,
        liked_by_user: liked_by_user
  }
}
