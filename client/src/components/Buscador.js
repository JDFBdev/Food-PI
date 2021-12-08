import React from "react";
import { connect } from "react-redux";
import Cards from './Cards';
import s from './Buscador.module.css';
import { getRecipes } from '../actions/actions';
import { useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import background from '../images/FRONT.jpg';


function Buscador() {
  const recipes = useSelector((state)=> state.recipesLoaded);
  const [state, setState] = React.useState({title: null});
  const [ans, setAns] = React.useState({ order: 'Result', diet: 'Diet'});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = function(e) {
    setState(prevInput => ({title: e.target.value}));
  }
  
  const handleSubmit = function(e) {   
    e.preventDefault();
    if(state.title && !/^\s*$/.test(state.title)){
      dispatch(getRecipes(state.title));
    }
  }

  const create = function(){
    history.push('/create');
  }

  const about = function(){
    history.push('/about');
  }

  const handleSelectorA = function(select){
    setAns(prevInput => ({...prevInput, order: select.target.value}))
  }

  const handleSelectorB = function(select){
    setAns(prevInput => ({...prevInput, diet: select.target.value}))
  }


  return (
    <div style={{position: 'relative'}}>
      <div style={{position: 'absolute', backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover',  width: '100vw', height: '100vh'}}/>
      <div className={s.finder}>
        <h2 className={s.title}>Finder</h2>
        <form>   {/* hacemos un form que llama a handle submit ante cada cambio para setear lo que se escribe en title */}
          <input type='text' name='title' value={state.title} className={s.input} onChange={handleChange} />
          <button onClick={handleSubmit} className={s.btnSubmit} >Search</button>
        </form>
        <div>
          <select className={s.selectorA} onChange={handleSelectorA}>
            <option value="NAME_ASC">A-Z</option>
            <option value="NAME_DES">Z-A</option>
            <option value="RATING_ASC">Highest Rating</option>
            <option value="RATING_DES">Lowest Rating</option>
            <option selected value = {null} >Result</option>
          </select>
          <select className={s.selectorB} onChange={handleSelectorB}>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="lacto ovo vegetarian">Lacto-Vegetarian</option>
            <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescetarian</option>
            <option value="paleo">Paleo</option>
            <option value="primal">Primal</option>
            <option value="fodmap">Low FODMAP</option>
            <option value="dairy free">Dairy Free</option>
            <option value="whole">Whole30</option>
            <option selected value={null} >Diet</option>
          </select>
          <div>
            <button onClick={create} className={s.btnCreate} >Create Recipe</button>
            <button onClick={about}className={s.btnAbout} >About</button>
          </div>
        </div>
      </div>
      
        {
           (<div className = {s.cardsContainer}> <Cards props = {ans} /> </div>)
        }  
      
    </div>
  );
  
}

export default connect(
  null,{ getRecipes }   // pasamos los action creators que voy a querer despachar desde mi componente, o la funcion dispatchpropstonoseque
)(Buscador);