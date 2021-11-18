import { USER_LOAD_REQUEST } from '../../redux/types';
import store from '../../store';


const loadUser = () => {
    try {
        store.dispatch({
            type: USER_LOAD_REQUEST,
            data: localStorage.getItem("token"),
        })
    } catch(err) {
        console.log(err)
    }
}

export default loadUser;