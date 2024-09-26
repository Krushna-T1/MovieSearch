import { useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './Search.jsx';
import MovieCart from './MovieCart.jsx';
import MovieDetails from './MovieDetails.jsx';

function Home(props) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  // Fetching Information for MovieCart
  const SearchMovie = async (searchTerm) => {
    setError(null);
    setLoading(true);
    setMovie(null);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=7f6f2553`);
      if (!response.ok) {
        throw new Error("Network Error");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setMovie(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  //Function to add to favorite
  const addToFav = async (id) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=7f6f2553`);
      if (!response.ok) {
        throw new Error("Unable to Add to Favorite");
      }
      const fullDetails = await response.json();
      if (fullDetails.Response === "False") {
        throw new Error(fullDetails.Error);
      }
      localStorage.setItem(id, JSON.stringify(fullDetails));
      toast.success(`${fullDetails.Title} Added To Favorites Successfully`, {
        autoClose: 2000,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
    {/* Render Search component and loading/error messages when view is false */}
    {!props.view && (
      <>
        <Search onSearch={SearchMovie} />
        {loading && (
          <h5 className='d-flex justify-content-center text-success' >
            Loading...
          </h5>
        )}
        {error && (
          <h5 className='d-flex justify-content-center text-danger'>
             {error}
          </h5>
        )}
      </>
    )}
  
    {/* Render movie details or search results */}
    {movie && !error && (
      <div className="row ">
        {props.view ? (
          <MovieDetails id={props.id}  handleView={props.handleView} />
        ) : (
          movie.Search.map((d1) => (
            <div className="col-md-3" key={d1.imdbID}>
              <MovieCart
                title={d1.Title}
                year={d1.Year}
                type={d1.Type}
                image={d1.Poster}
                handleFavorite={addToFav}
                handleView={() => props.handleView(d1.imdbID)} 
                imdbID={d1.imdbID}
                text="Add To Favorite"
              />
            </div>
          ))
        )}
      </div>
    )}
  
    <ToastContainer />
  </div>
  
  );
}

export default Home;
