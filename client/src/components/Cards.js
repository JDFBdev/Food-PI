import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import s from './Cards.module.css';
import { filterAZ, filterMIN, filterMAX, filterZA, filterDiet } from '../actions/actions';
import { CSSTransition } from 'react-transition-group';

export default function Cards({props}) {
  const recipes = useSelector((state) => state.recipesLoaded);
  const [render, setRender] = React.useState([]);
  const [pages, setPages] = React.useState(Math.ceil(recipes.length/8));    // cantidad inicial de paginas que necesito
  const [buttons, setButtons] = React.useState([]);   // cantidad de botones que voy a usar, hechos en array con su valor
  const [inProp, setInProp] = useState(true); // CSS transition group
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (props.diet !== 'Diet') dispatch(filterDiet(props.diet));
    if (props.order === 'NAME_ASC') dispatch(filterAZ());
    if (props.order === 'NAME_DES') dispatch(filterZA());
    if (props.order === 'RATING_ASC') dispatch(filterMAX());
    if (props.order === 'RATING_DES') dispatch(filterMIN());
  }, [props]);


  useEffect(() => {
  
    setPages(prevPages=>(Math.ceil(recipes.length/8)))
  }, [recipes, props.order, props.diet, dispatch]);   // actualiza la cantidad de paginas necesarias cuando cambie la primera receta que llega
  

  useEffect(() => {

    setButtons([]);
    for(let i = 0; i < pages; i++){
      setButtons(prevButtons=>([...prevButtons, i+1]));
    }
  }, [pages, dispatch]);   // actualiza la cantidad de botones necesarios una vez que se actualice la cantidad de paginas


  useEffect(() => {
    setRender([]);
    for(let i = 0; i < 8; i++){
      if(recipes[i]) setRender(prevRender=>([...prevRender, recipes[i]]));   // seteamos las primeras recetas como render incial
    }

  }, [recipes, props.order, props.diet, dispatch]);   // actualizame las recetas a renderizar una vez que se actualicen los botones O las nuevas recetas


  const handlePageButton = function(page){
    let x1 = (page.target.value * 8)-8;
    let x2 = (page.target.value * 8);
    setRender(prevRender => ([]));

    for(let i=x1; i < x2; i++){
      if(recipes[i]){
        setRender(prevRender => ([...prevRender,recipes[i]]));
      }
    }
  }

console.log(render);
  return (
    <div className={s.whole} >
      <div className={s.container}>{
        render.map((r,index) => (
          <CSSTransition
            in={inProp}
            timeout={index*50}
            appear={true}
            key={r.id}
            classNames={{
              appear: s.MyClassEnterActive,
              enterDone: s.MyClassEnterDone,
              exitActive: s.MyClassExit,
              exitDone: s.MyClassExitActive
            }}>
              <Card key={String(r.title)} title={r.title} image={r.image} diet={r.diet} id={r.id}/>
          </CSSTransition>
        ))
        }
      </div>
      <div className={s.btnsContainer}>
        {
          buttons.map(b=>(
            <button value={b} onClick={handlePageButton} className={s.pageBtn}>{b}</button>
          ))
        }
      </div>
    </div>

  ) 
};

