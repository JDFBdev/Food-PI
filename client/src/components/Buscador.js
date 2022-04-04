import React from "react";
import { connect } from "react-redux";
import Cards from './Cards';
import s from './Buscador.module.css';
import { getRecipes } from '../actions/actions';
import { useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import background from '../images/FRONT2.jpg';
import ReactTooltip from 'react-tooltip';

function Buscador() {

  const [state, setState] = React.useState({title: null});
  const [ans, setAns] = React.useState({ order: 'Result', diet: 'Diet'});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = function(e) {
    setState(prevInput => ({title: e.target.value}));
  }
  
  const handleSubmit = async function(e) {
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
    <div style={{backgroundImage: `url(${background})`}} className={s.container}>
      <div className={s.finder}>
        <div className={s.header}>
          <h2 className={s.title}>Finder</h2>
          <div className={s.info} data-tip data-for='tooltip' >?</div>
          <ReactTooltip id='tooltip' place='right' effect="solid" >
            Use the finder to search through thousands <br/>
            of recipes and even the ones you've created!
          </ReactTooltip>
        </div>
        <form className={s.form} >   {/* hacemos un form que llama a handle submit ante cada cambio para setear lo que se escribe en title */}
          <input type='text' name='title' value={state.title} className={s.input} onChange={handleChange} />
          <button onClick={handleSubmit} className={s.btnSubmit} type='submit' >Search</button>
        </form>
        <div className={s.selectors} >
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
          </div>
          <div className={s.btns} >
            <button onClick={create} className={s.btnCreate} >Create Recipe</button>
            <button onClick={about}className={s.btnAbout} >About</button>
          </div>
      </div>
      {
          (<div className={s.cardsContainer}> <Cards props = {ans} /> </div>)
      }
    </div>
  );
  
}

export default connect(
  null,{ getRecipes }   // pasamos los action creators que voy a querer despachar desde mi componente, o la funcion dispatchpropstonoseque
)(Buscador);