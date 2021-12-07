import React, { useState, useEffect } from 'react';
import Card from './Card';
import s from './Cards.module.css';

export default function Cards({props}) {
  const [render, setRender] = React.useState([]);
  const [pages, setPages] = React.useState(Math.ceil(props.recipes.length/8));    // cantidad inicial de paginas que necesito
  const [buttons, setButtons] = React.useState([]);   // cantidad de botones que voy a usar, hechos en array con su valor
  console.log(props);

  
  if(props.diet !== 'Diet'){     // si hay que filtrar por dieta hacemos un filter a lo que incluya la dieta
    props.recipes = props.recipes.filter(r=>{
      return r.diet.includes(props.diet);
      });
  }

  // Ordenamos props.recipes segun lo que nos paso props.order 
  if (props.order === 'NAME_ASC') props.recipes.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  if (props.order === 'NAME_DES') props.recipes.sort((a,b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0));
  if (props.order === 'RATING_ASC') props.recipes.sort((a,b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0));
  if (props.order === 'RATING_DES') props.recipes.sort((a,b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0));

    useEffect(() => {
      setPages(prevPages=>(Math.ceil(props.recipes.length/8)))
    }, [props.recipes[0]]);   // actualiza la cantidad de paginas necesarias cuando cambie la primera receta que llega
    
    useEffect(() => {
      setButtons([]);
      for(let i = 0; i < pages; i++){
        setButtons(prevButtons=>([...prevButtons, i+1]));
      }
    }, [pages]);   // actualiza la cantidad de botones necesarios una vez que se actualice la cantidad de paginas
  
    useEffect(() => {
      setRender([])
      for(let i = 0; i < 8; i++){
        if(props.recipes[i]) setRender(prevRender=>([...prevRender,props.recipes[i]]));   // seteamos las primeras recetas como render incial
      }
    }, [props.recipes[0]]);   // actualizame las recetas a renderizar una vez que se actualicen los botones O las nuevas recetas



    const handlePageButton = function(page){
      let x1 = (page.target.value * 8)-8;
      let x2 = (page.target.value * 8);
      setRender(prevRender => ([]));

      for(let i=x1; i < x2; i++){
        if(props.recipes[i]){
          setRender(prevRender => ([...prevRender,props.recipes[i]]));
        }
      }
    }
    

    return (
      <div>
        <div className={s.container}>{
          render.map(r => (
              <Card title={r.title} image={r.image} diet={r.diet} id={r.id}/>
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

