function MovieCart(props) {
    
  
    return (
      <div className="container">
        <div className="row justify-content-center ">
          <div className="card mx-auto" style={{ width: '20rem',  height: '37rem' ,margin: "10px" }}> 
             <img src={props.image} className="card-img-top bg-image hover-overlay img-thumbnail h-50 w-70"  alt="Not Available"  />                                       
             <div className="card-body">
             <hr />
              <h5 className="card-title">{props.title}</h5>
             </div>
            <ul className="list-group list-group-flush">
             <li className="list-group-item">Released: {props.year}</li>
              <li className="list-group-item">Type: {props.type}</li>
              
            
             </ul>
            <div className="card-body d-flex">
              <button className="card-link btn btn-primary m-1"
                 onClick={()=>{props.handleFavorite(props.imdbID)}} >
                 {props.text}
              </button>
              <button className="btn btn-primary m-1"
                 onClick={()=>{props.handleView(props.imdbID)}}>
                  More Details
              </button>
          </div>
        </div>
        </div>
      </div>
    );
  }
  
  export default MovieCart;
  

  // style={{ height: '50%', objectFit: 'fill' }}