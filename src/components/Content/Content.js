import { useState, useEffect } from "react";
import Card from "./Card";
import Filter from "../../components/Filter/Filter";

import movies from "../../assets/films"; //simulation of getting data from the server

import styles from "./Content.module.scss"

const Content = () => {

  const [films, setFilms] = useState(movies);
  const [name, setName] = useState("");
  const [genres, setGenres] = useState([]);

  /* useEffect(() => {
    fetch(`https://run.mocky.io/v3/3d83f140-97ae-4395-945c-b7436c15fd9c`, {
      headers : {
        "access-control-allow-origin": "*",
        "Content-Type": "application/json"
      }
  })
  .then((response) => response.json())
  .then((messages) => {setFilms(messages);
  });
  }, []); */

  const filterName = (film) => {
    return film.name.toLowerCase().includes(name.toLowerCase());
  }

  const filterGenre = (film) => {
    if (genres.length !== 0) {
      let flag = false;
      for (let item in genres) {
        if (film.genres.includes(genres[item])) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      return flag;
    } else {
      return true;
    }
  }; 

  const addName = (name) => {
    setName(name);
  };

  const addGenres = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((item) => {return item !== genre }));
    } else {
      setGenres([...genres, genre]);
    }
  };

  let filteredFilms = films
  .filter(filterName)
  .filter(filterGenre);

  return (
    <div className={styles.contentWrapper}>
      <Filter addName={addName} addGenres={addGenres} />
      <div className={styles.cardsWrapper}>
        { (filteredFilms.length > 0) ? <ul className={styles.cardList}>
          {filteredFilms
          .map((film) => (
            <Card 
              key={film.id}
              kinopoiskRating={film.kinopoiskRating} 
              poster={film.poster} 
              name={film.name} 
              year={film.year} 
              genres={film.genres[0]} 
            />
          ))}
        </ul> : <h2 className={styles.errorTitle}>Ничего не найдено</h2> }
      </div>
    </div>        
  );
};

export default Content;