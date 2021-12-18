import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getRecipeDetail, clearDetail } from '../actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import s from './Detalles.module.css';
import background from '../images/LANDING.jpg';
import defaultImage from '../images/NOIMAGE.jpg';
import loader from '../images/loader.gif';

function Detalles(){

    let history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        
        dispatch(getRecipeDetail(id));
        return () => dispatch(clearDetail());

    }, [dispatch, id]);


    const leave = function(){
        history.push('/front');
    }

    const analizeDiets = function(arr){

        if(arr[0]){
            let arr2 = arr.map(d => {
                const str1 = d.split(" ");
                for (var i = 0; i < str1.length; i++) {
                    str1[i] = str1[i].charAt(0).toUpperCase() + str1[i].slice(1);
                }
                return str1.join(' ');
            });

            return (<p>{arr2.join(' - ')}</p>)

        }  else return (<p>No Matching Diets</p>)
        
    }

    const recipe = useSelector((state)=> state.recipeDetail); // subscripcion al store
    console.log(recipe);

    return (
        <div style={{position:'relative'}}>
            <div style={{position: 'absolute', backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover',  width: '100vw', height: '100vh'}}/>
            <button to='/front' onClick={leave} className={s.btn} >Back to Home Page</button>
            { (!recipe.title) ? (<div> <img className={s.loader} src={loader} /></div>) : (
            <div className={s.container} >
                <h2 className={s.title}  >{recipe.title}</h2>
                {
                    (recipe.image) ? (<img src={recipe.image} className={s.img} alt={recipe.title}/>) : (<img src={defaultImage} className={s.img} alt='Default'/>)
                }
                
                <div className={s.diet} >
                    {
                        (recipe.diet) && analizeDiets(recipe.diet)
                    }
                </div>
                <div className={s.ratingHealthy}>
                    <div className={s.rating} >
                        <p style={{marginTop:'0px'}} >Rating: {recipe.rating}</p>
                        </div>
                    <div className={s.healthScore} >
                        <p style={{marginTop:'0px'}} >Healthy Score: {recipe.healthScore}</p>
                        </div>
                </div >
                <div  >
                    {
                        (recipe.steps) &&(<textarea readOnly={true} className={s.steps}  style={{paddingTop:'10px', paddingLeft: '20px', paddingRight: '20px', paddingBottom:'10px'}}>{recipe.steps.replace(/<[^>]*>?/g, "")}</textarea>)  
                    }
                </div>
                <div className={s.summary} >
                    {
                        (recipe.summary ) && (<p style={{paddingTop:'10px', paddingLeft: '20px', paddingRight: '20px', paddingBottom:'10px'}} >{recipe.summary.replace(/<[^>]*>?/g, "")}</p>)
                    }
                </div>
            </div>)
            }
        </div>
    );
    
}

export default connect(null,{ getRecipeDetail })(Detalles);