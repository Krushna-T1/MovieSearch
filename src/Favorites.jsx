import { useEffect, useState } from "react";
import React from "react";
import MovieCart from "./MovieCart";
import MovieDetails from "./MovieDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Favorites(props) {
  const [list, updateList] = useState([]);
  

  
  // Reset state when component mounts
  // useEffect(() => {
  //   props.resetState();
  //     },[]);
  

      //Fetching data from localStorage
  useEffect(() => {
    const fav = [];
     for (let i = 0; i < localStorage.length; i++) 
      {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);

      if (item)
      {
        fav.push(JSON.parse(item));
      }
    }
    updateList(fav);

  }, []);

  // Remove From Favorite
  function RemoveFav(id) {

    if (localStorage.getItem(id)) {
      localStorage.removeItem(id);
      toast.success("Removed From Favorites Successfully", {
        autoClose: 3000, 
      });
      
      // Update the state to reflect the change
      updateList((prevList) => prevList.filter((movie) => movie.imdbID !== id));
    }
  }
 
  return (
            <div className='row'>
                <h2 className="d-flex justify-content-center m-2 text-light">Your Favorite Movies</h2>
              {list.length === 0 ? 
                  (
                  <h4 className="d-flex justify-content-center text-danger">No Favorites Added Yet !!!</h4>
                  ) : (
                       !props.view ? 
                       (
                         list.map((movie) => 
                          (
                           <div className="col-md-3" key={movie.imdbID}>
                            <MovieCart title={movie.Title}
                                       year={movie.Year}
                                       type={movie.Type}
                                       image={movie.Poster}
                                       imdbID={movie.imdbID}
                                       text="Remove Favorite"
                                       handleFavorite={() => RemoveFav(movie.imdbID)}
                                       handleView={() => props.handleView(movie.imdbID)}  
                             />
                           </div>
                          ))
                        ) : (
                             <MovieDetails id={props.id}
                                           handleView={props.handleView} 
                             />
                           )
                       )
               }
               <ToastContainer /> 
            </div>
  
  );
}

export default React.memo(Favorites);
