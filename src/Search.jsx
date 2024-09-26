
import { useState } from "react";
function Search(props){

    const [searchText,setSearchText]=useState('');
    // console.log(searchText);

      function handleInput(e){
        setSearchText(e.target.value);
       

      

    }
    const handleClick =(e)=>{
        e.preventDefault();
        props.onSearch(searchText);
        console.log(searchText);
        setSearchText("");
    }
  
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

export default Search;