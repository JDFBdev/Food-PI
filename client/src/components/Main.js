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
    <div style={{position: 'relative'}}>
        <div style={{position: 'absolute', backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover',  width: '100vw', height: '100vh'}}/>
        <h1 style={{position:'absolute', marginTop:'11%', marginLeft: '44%', fontSize:'7rem', fontWeight:'lighter'}} >Food Project</h1>
        <button onClick={go} className={s.btn} >Go!</button>
    
    </div>
);
}

export default Main;