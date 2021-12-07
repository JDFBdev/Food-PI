import React from 'react';
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

    const handleCheckChange = function(e){

       setChecks(prevCheck => ({...prevCheck, [e.target.name]: !prevCheck[e.target.name]}))
       
    }
    

    const handleSubmit = function(e){

        e.preventDefault();

        let diets = Object.keys(checks).filter(function(x) {   // si el user tilda y destilda, crea la propiedad creada en false. La borramos.
            return checks[x] !== false; 
        });

        diets.forEach(function(d, index, theArray){   // cambiamos los nombres de los string que tengan espacios o guiones bajos
            if(d === 'Gluten_Free') theArray[index] = 'Gluten Free';
            if(d === 'Lacto_Vegetarian') theArray[index] = 'Lacto-Vegetarian';
            if(d === 'Ovo_Vegetarian') theArray[index] = 'Ovo-Vegetarian';;
            if(d === 'Low_FODMAP') theArray[index] = 'Low FODMAP';
            if(d === 'Dairy_Free') theArray[index] = 'Dairy Free';
        });

        let post = {title: input.title, summary: input.summary, rating: Number(input.rating), healthScore: Number(input.healthScore), steps: input.steps, diets: diets};

        postRecipe(post);
        
        history.push("/front");

    }

    const redirect = function(){
        history.push("/front");
    }

    return(
        <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover',  width: '100vw', height: '100vh'}}/>
            <button onClick={redirect} className={s.btnHome}>Back to Home Page</button>
            <div className={s.formContainer} >
                <h1 className={s.title} >Create Your Own Recipe!</h1>
                <form>
                    {/*  Inputs */}
                    <div className={s.inputs}>
                        <div >
                            <input className={s.inputTitle} type='text' name='title' placeholder={' Title...'} value={input.title} onChange={handleInputChange} />
                            <input className={s.inputSummary}type='text' name='summary' placeholder={' Summary...'} value={input.summary} onChange={handleInputChange}/>
                        </div>
                        <div>
                            <input className={s.inputRating} type='number' name='rating' placeholder={' Rating...'} value={input.rating} onChange={handleInputChange} />
                            <input className={s.inputHealthyScore} type='number' name='healthScore' placeholder={' Healthy Score...'} value={input.healthScore} onChange={handleInputChange}/>
                            <input className={s.inputImage} type='text' name='image' placeholder={' Image...'} value={input.image} onChange={handleInputChange}/>
                        </div>
                        <div>
                            <textarea className={s.inputSteps} type='text' name='steps' placeholder={' Steps...'} value={input.steps} onChange={handleInputChange}/>
                        </div>
                    </div>
                    

                    {/* Checkboxs */}
                    <div>
                        <div >
                            <label className={s.checkA} >Gluten Free: </label>
                            <input className={s.boxA} name="Gluten_Free" type="checkbox" onChange={handleCheckChange} />

                            <label className={s.checkB} >Ovo-Vegetarian: </label>
                            <input className={s.boxB} name="Ovo_Vegetarian" type="checkbox" onChange={handleCheckChange} />

                            <label className={s.checkC} >Primal: </label>
                            <input className={s.boxC} name="Primal" type="checkbox" onChange={handleCheckChange} />
                        </div>
                        <div>
                            <label className={s.checkD} >Ketogenic: </label>
                            <input className={s.boxD} name="Ketogenic" type="checkbox" onChange={handleCheckChange} />
                        
                            <label className={s.checkE} >Vegan: </label>
                            <input className={s.boxE} name="Vegan" type="checkbox" onChange={handleCheckChange} />

                            <label className={s.checkF} >Dairy Free: </label>
                            <input className={s.boxF} name="Dairy_Free" type="checkbox" onChange={handleCheckChange} />
                        </div>
                        <div>
                            <label className={s.checkG} >Vegetarian: </label>
                            <input className={s.boxG}  name="Vegetarian" type="checkbox" onChange={handleCheckChange} />

                            <label className={s.checkH} >Pescetarian: </label>
                            <input className={s.boxH}  name="Pescetarian" type="checkbox" onChange={handleCheckChange} />

                            <label className={s.checkI} >Low FOODMAP: </label>
                            <input className={s.boxI}  name="Low_FODMAP" type="checkbox" onChange={handleCheckChange} />
                        </div>
                        <div>
                            <label className={s.checkJ} >Lacto-Vegetarian: </label>
                            <input className={s.boxJ}  name="Lacto_Vegetarian" type="checkbox" onChange={handleCheckChange} />

                            <label className={s.checkK} >Paleo: </label>
                            <input className={s.boxK}  name="Paleo" type="checkbox" onChange={handleCheckChange} />

                            <label className={s.checkL} >Whole30: </label>
                            <input className={s.boxL}  name="Whole30" type="checkbox" onChange={handleCheckChange} />
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
                (input.title !=='' && !errors.title && !errors.summary && !errors.rating && !errors.healthScore) && <button className={s.btnCreate} onClick={open}>Create</button>
                }
            </div>
               
            <div>
                <Modal>
                    <div className={s.modal}>
                        <h1 className={s.modalTitle} >Recipe Created!</h1>
                        <button className={s.modalBtn} onClick={handleSubmit}  >Ok</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Create;