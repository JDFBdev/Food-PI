import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './Main.module.css';
import background from '../images/LANDING.jpg';

const Main = () => {
    let history = useHistory();

    const go = function(){
        history.push('/front');
    }


return(
    <div style={{backgroundImage: `url(${background})`}} className={s.container} >
        <div className={s.div} > 
            <h1 className={s.h1}>Meal Swipe!</h1>
            <button onClick={go} className={s.btn} >Go!</button>
        </div>
    </div>
);
}

export default Main;