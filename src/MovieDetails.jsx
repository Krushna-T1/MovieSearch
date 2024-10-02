import { useState, useEffect } from "react";
import React from "react";
function MovieDetails(props) {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  
  //fetch when change in id
  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${props.id}&apikey=7f6f2553`);
        if (!response.ok) {
          throw new Error("Network Error");
        }
        if(response){
            console.log(props.id);
            console.log(true);
        }

        const data = await response.json();
        console.log(data);
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
       
        setDetails(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    getDetails();
  }, [props.id]);

  return (
    <div className="container  ">
      {error && <div class="alert alert-danger" role="alert">
       <h5 className='d-flex justify-content-center text-danger'>
             {error}
          </h5>
        </div>}
      {details ? (
      <div className="card mb-3 max-width-540  bg-dark bg-gradient">
        <div className="row g-0 ">
          <div className="col-md">
            <img src={details.Poster} className="card-image" alt={details.Title}|| "Unavailable" />
         </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title fw-bolder fs-1 text-light">
              {details.Title}
            </h5>
          </div>
            <ul className="list-group list-group-flush  text-light  ">
             <li className="list-group-item bg-transparent fs-5 text-light ">
                <span className="fw-bold mx-2">Director:</span>
                 <span className="text-primary">{details.Director}</span>
             </li>
             <li className="list-group-item bg-transparent fs-5 text-light ">
                <span className="fw-bold mx-2">Writer:</span>
                 <span className="text-primary">{details.Writer}</span>
             </li>
             <li className="list-group-item bg-transparent fs-5 text-light ">
                 <span className="fw-bold mx-2">Star:</span>
                 <span className="text-primary">{details.Actors}</span>
             </li>
             <li className="list-group-item bg-transparent fs-5 text-light ">
                 <span className="fw-bold mx-2">Released:</span>
                 <span className="text-primary">{details.Released}</span>
             </li>
             <li className="list-group-item bg-transparent fs-5 text-light ">
                 <span className="fw-bold mx-2">⭐:</span>
                 <span className="text-primary">{details.imdbRating}</span>
             </li>
             <li className="list-group-item bg-transparent fs-5 text-light ">{details.Plot}
             </li>
           </ul>
                <button onClick={()=>{props.handleView()}} className="btn btn-warning px-5">Back</button>
          </div>
        </div>
      </div>

      ) : (
        <div className='d-flex justify-content-center text-success' >
           <div class="spinner-border text-light" role="status">
              <span class="sr-only"></span>
           </div>
        </div>
      )}
  </div>
  );
}

export default React.memo(MovieDetails);
