import React, { useEffect } from 'react';
import s from './Card.module.css';
import { useHistory } from 'react-router-dom';
import defaultImage from '../images/NOIMAGE.jpg';


export default function Card({title, image, diet, id}) {

  const history = useHistory();

  const details = function(){
    history.push(`/details/${id}`);
  }

  const analizeDiets = function(arr){

    let arr2 = arr.map(d => {
        const str1 = d.split(" ");
        for (var i = 0; i < str1.length; i++) {
            str1[i] = str1[i].charAt(0).toUpperCase() + str1[i].slice(1);
        }
        return str1.join(' ');
    });

    return (<p>{arr2.join(' - ')}</p>)
    
  } 

  useEffect(() => {
    
  }, [title]);

  return (
    <div onClick={details} className={s.container}>
      <div className={s.info} >
        {
          (title) && (<p className={s.title} >{title}</p>)
        }
        {
          (diet[0]) && (<p className={s.diets} >{analizeDiets(diet)}</p>)
        }
      </div>
      <div >
        {
          (image !== '' && image) ? <img src={image} className={s.img} alt={'img'} /> : <img src={defaultImage} className={s.img} alt={'img'} />
        }
      </div>
    </div>
  )
};


