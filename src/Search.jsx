
import { useState } from "react";
import React from "react";
function Search(props){

   // Using useRef instead of useState
  const inputRef = useRef(null);

  const handleClick = (e) => {
   

    e.preventDefault();

    // Get value from ref when submitting
    const searchText = inputRef.current.value;
    props.onSearch(searchText);  // Pass the search text to the parent component
    // console.log(searchText);

    // Clear the input after submission
    inputRef.current.value = "";
  };
  
    return(

        
  <div className="container-fluid  p-1" >
    <form className="d-flex justify-content-center"
          id="form"
          name="searchTearm" 
          role="search" 
          onSubmit={handleClick}>
            
      <input className="form-control p-2 alert-dark me-2 w-50"
         type="search" 
         placeholder="Search Movie ...."  
         aria-label="Search "
         value={searchText}
         onChange={handleInput} />
      
      <button className="btn btn-outline-success" type="submit" >Search</button>
    </form>
  </div>

  

        
    );
}

export default React.memo(Search);
