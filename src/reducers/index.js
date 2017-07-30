// каждая функция редьюсера создаёт дерево State-Store
function IMGGESS(state=[], action){
   switch (action.type) {
     // IMGGESS - хранит информацию о фоторграфиях
     case 'IMGGESS':
       return [
         ...state,
         {
           url: action.url,
           url_full: action.url_full,
           id: action.id,
           author_name: action.author_name,
           author_link: action.author_link,
           date: action.date,
           likes: action.likes,
           liked_by_user: action.liked_by_user
         }
       ]
     // UPDATE_LIKES - для обнолвения информации о лайках
     case 'UPDATE_LIKES':
         return state.map(ev => {
           if(ev.id === action.id) {
             return {
               url: ev.url,
               url_full: ev.url_full,
               id: ev.id,
               author_name: ev.author_name,
               author_link: ev.author_link,
               date: ev.date,
               likes: action.likes,
               liked_by_user: action.liked_by_user
             }
           }
           else return ev;
         })
     default:
       return state
   }
}

export default IMGGESS;
