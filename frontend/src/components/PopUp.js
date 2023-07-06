import {useState} from 'react'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const PopUp = (props) => {

    const [pop_up, set_pop_up] = useState(true);

    const [user_name, set_user_name] = useState("");

    const handle_submit = (evt) => {
        evt.preventDefault();
        props.user_name(user_name);

        set_user_name("");
        set_pop_up(!pop_up);
    }
    
    const handle_change = (evt) => {
        set_user_name(evt.target.value);
    }

    return (
        <div className="pop_up_container" style={ (!pop_up) ? {display:"none"} : {}} >
            <form className="pop_up" onSubmit={handle_submit}>
                <label htmlFor="pop_up_input">Enter your name: </label>
                <input id="pop_up_input" type="text" placeholder="Type here: " value={user_name} onChange={handle_change} autoFocus/>
                <button type="submit">SUBMIT <KeyboardReturnIcon/></button>
            </form>
        </div>
    )
}

export default PopUp;
