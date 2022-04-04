import React, { useEffect } from 'react';
import postRecipe from '../actions/actions';
import { useHistory } from "react-router-dom";
import { useModal } from 'react-hooks-use-modal';
import s from './Create.module.css';
import background from '../images/CREATE-ABOUT.jpg';

export  function validate(input){
    let errors = {};
  
    if(!input.title){
      errors.title = 'Title is required!';
    }
  
    if(!input.summary){
      errors.summary = 'Summary is required!';
    }

    if(!input.rating){
        errors.rating = 'Rating is required!';
    }else if(input.rating < 0 || input.rating > 100){
        errors.rating = 'Rating has to be between 0 and 100!'
    }

    if(!input.healthScore){
        errors.healthScore = 'Healthy Score is required!';
    }else if(input.healthScore < 0 || input.healthScore > 100){
        errors.healthScore = 'Healthy Score has to be between 0 and 100!'
    }
  
    return errors;
}


function Create(){

    const [input, setInput] = React.useState({title: '', summary: '', rating: null, healthScore: null, steps: '', image:''});
    const [checks, setChecks] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [post, setPost] = React.useState({});
    const [Modal, open] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
    });

    let history = useHistory();

    const handleInputChange = function(e){    // esta funcion recibe los inputs para majearlos.

        setInput(prevInput => ({...prevInput, [e.target.name]:e.target.value}));  // copiamos el estado y la propiedad e.target.name definile el valor del evento
      
        let errors = validate({...input, [e.target.name]:e.target.value}); // pasamos el valor ingresado en vez del estado, porque puede que no este modificado todavia!
        setErrors(errors);

    }

    useEffect(() => {
           
        setPost(prevPost =>({...prevPost, title: input.title, summary: input.summary, image: input.image, rating: Number(input.rating), healthScore: Number(input.healthScore), steps: input.steps}));
    
    }, [input]);

    const handleCheckChange = function(e){

       setChecks(prevCheck => ({...prevCheck, [e.target.name]: !prevCheck[e.target.name]}))

    }

    useEffect(() => {

        let diets = Object.keys(checks).filter(function(x) {   // si el user tilda y destilda, crea la propiedad creada en false. La borramos.
            return checks[x] !== false;
        });
           
        setPost(prevPost =>({...prevPost, diets: diets}));
    
    }, [checks]);
   

    const handleSubmit = function(e){

        e.preventDefault();

        postRecipe(post);

        setPost({});
        
        open();

    }

    const redirect = function(){
        history.push("/front");
    }

    return(
        <div style={{backgroundImage: `url(${background})`}} className={s.container} >
            <button onClick={redirect} className={s.btnHome}>Back to Home Page</button>

            <div className={s.data}>
                <div className={s.formContainer} >
                    <h1 className={s.title} >Create Your Own Recipe!</h1>
                    <form>
                        {/*  Inputs */}
                            <div className={s.inputs} >
                                <input className={s.input} type='text' name='title' placeholder={' Title...'} value={input.title} onChange={handleInputChange} />
                                <input className={s.input}type='text' name='summary' placeholder={' Summary...'} value={input.summary} onChange={handleInputChange}/>
                            </div>
                            <div className={s.inputs}>
                                <input className={s.input} type='number' name='rating' placeholder={' Rating...'} value={input.rating} onChange={handleInputChange} />
                                <input className={s.input} type='number' name='healthScore' placeholder={' Healthy Score...'} value={input.healthScore} onChange={handleInputChange}/>
                                <input className={s.input} type='text' name='image' placeholder={' Image...'} value={input.image} onChange={handleInputChange}/>
                            </div>
                            <div className={s.inputs}>
                                <textarea className={s.inputText} type='text' name='steps' placeholder={' Steps...'} value={input.steps} onChange={handleInputChange} rows="4"/>
                            </div>
                        

                        {/* Checkboxs */}
                        <div className={s.checks}>

                            <div className={s.row} >

                                <div className={s.item} >
                                    <label className={s.label} >Gluten Free: </label>
                                    <input className={s.box} name="gluten free" type="checkbox" onChange={handleCheckChange} />
                                </div>

                                <div className={s.item} >
                                    <label className={s.label} >Ovo-Vegetarian: </label>
                                    <input className={s.box} name="lacto ovo vegetarian" type="checkbox" onChange={handleCheckChange} />
                                </div>

                                <div className={s.item} >
                                    <label className={s.label} >Primal: </label>
                                    <input className={s.box} name="primal" type="checkbox" onChange={handleCheckChange} />
                                </div>
                            </div>

                            <div className={s.row}>

                                <div className={s.item} >
                                    <label className={s.label} >Ketogenic: </label>
                                    <input className={s.box} name="ketogenic" type="checkbox" onChange={handleCheckChange} />
                                </div>

                                <div className={s.item} >
                                    <label className={s.label} >Vegan: </label>
                                    <input className={s.box} name="vegan" type="checkbox" onChange={handleCheckChange} />
                                </div>

                                <div className={s.item} >
                                    <label className={s.label} >Dairy Free: </label>
                                    <input className={s.box} name="dairy free" type="checkbox" onChange={handleCheckChange} />
                                </div>
                            </div>

                            <div className={s.row}>
                                <div className={s.item} >
                                    <label className={s.label} >Vegetarian: </label>
                                    <input className={s.box}  name="vegetarian" type="checkbox" onChange={handleCheckChange} />
                                </div>
                                <div className={s.item} >
                                    <label className={s.label} >Pescetarian: </label>
                                    <input className={s.box}  name="pescatarian" type="checkbox" onChange={handleCheckChange} />
                                </div>
                                <div className={s.item} >
                                    <label className={s.label} >Low FOODMAP: </label>
                                    <input className={s.box}  name="fodmap" type="checkbox" onChange={handleCheckChange} />
                                </div>
                            </div>

                            <div className={s.row}>
                                <div className={s.item} >
                                    <label className={s.label} >Lacto-Vegetarian: </label>
                                    <input className={s.box}  name="lacto ovo vegetarian" type="checkbox" onChange={handleCheckChange} />
                                </div>
                                <div className={s.item} >
                                    <label className={s.label} >Paleo: </label>
                                    <input className={s.box}  name="paleo" type="checkbox" onChange={handleCheckChange} />
                                </div>
                                <div className={s.item} >
                                    <label className={s.label} >Whole30: </label>
                                    <input className={s.box}  name="whole" type="checkbox" onChange={handleCheckChange} />
                                </div>

                            </div>
                        </div>
                    </form>
                </div>

                    
                <div className={s.errorsContainer}>
                    {/* Mensajes de error */}
                    {     
                    errors.title && (<div className={s.danger}>{errors.title}</div> ) 
                    }
                    {     
                    errors.summary && (<div className={s.danger}>{errors.summary}</div> ) 
                    }
                    {     
                    errors.rating && (<div className={s.danger}>{errors.rating}</div> )
                    }
                    {     
                    errors.healthScore && (<div className={s.danger}>{errors.healthScore}</div> ) 
                    }

                    {
                    (input.title !=='' && !errors.title && !errors.summary && !errors.rating && !errors.healthScore) && <button className={s.btnCreate} onClick={handleSubmit}>Create</button>
                    }
                </div>
                    
                <div>
                    <Modal>
                        <div className={s.modal}>
                            <h1 className={s.modalTitle} >Recipe <br/> Created!</h1>
                            <button className={s.modalBtn} onClick={redirect}  >Ok</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Create;