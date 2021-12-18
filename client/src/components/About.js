import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import background from '../images/ABOUT.jpg';
import s from './About.module.css';
import git from '../images/LOGO_GITHUB.png';
import gmail from '../images/LOGO_GMAIL.png';
import linkedin from '../images/LOGO_LINKEDIN.png';


const About = () => {
    let history = useHistory();

    const leave = function(){
        history.push('/front');
    }


return(
    <div style={{position: 'relative'}}>
        <div style={{position: 'absolute', backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover',  width: '100vw', height: '100vh'}}/>
        <div>
            <button className={s.btn} onClick={leave} >Back To Home Page</button>
        </div>
        <div className={s.container}>
            <h2 className={s.title} >About This Project</h2>
            <h4  className={s.text}>This Food App was created to showcase
            the knowledge learned through the “Henry” bootcamp. It’s a React - Redux 
            application that uses a back-end express server to get information from the
            Spoonacular Api. It also uses Sequelize to store the recipes created by the user
            in a PostgreSQL database. None of the styles have been imported.
            Thanks for passing by to check out my project! <br/>
            - Juan Diego Fernández Bottarini
            </h4>
        </div>
        <div className={s.linksdiv} >
            <img src={linkedin} className={s.icon} onClick={() => { window.open('https://www.linkedin.com/in/jdfbdev/','_blank')}} />
            <img src={gmail} className={s.icon} onClick={() => { window.open('mailto:JDFBdeveloper@gmail.com?','_blank')}} />
            <img src={git} className={s.icon} onClick={() => { window.open('https://github.com/JDFBdev','_blank')}} />
        </div>
    </div>
);
}

export default About;