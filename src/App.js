import { useState } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home.jsx';
import Favorites from './Favorites.jsx';

function App() {
  const [view, setView] = useState(false);
  const [id, setID] = useState("");
  
  const handleView = (movieId) => {
    if (movieId) {
      setView(true); 
      setID(movieId); 
    } else {
      setView(false);  
      setID("");       
    }
  };


  //Reset ID and View when Route to another page
  const resetState = () => {
    setView(false);
    setID("");
  }

  

  return (
    <Router>
      <nav className="navbar bg-dark mb-4 mt-1">
        <div className="container-fluid justify-content-start ">
          <Link className="navbar-brand fw-bold text-light btn btn-outline-success  px-4 py-1 "  to="/" onClick={()=>{resetState()}}>Home</Link>
          <Link className="navbar-brand mx-2 fw-bold text-light btn btn-outline-success" to="/favorites"  onClick={()=>{resetState()}}>Favorites</Link>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element=
        { <Home
               view={view}
               handleView={handleView}
               id={id} setID={setID}
               setView={setView}
               resetState={resetState}
          />
        }
      />

       <Route path="/favorites" element=
        {<Favorites   
                view={view} 
                handleView={handleView} 
                id={id}  
                setView={setView}
                setID={setID} 
                resetState={resetState} 
          />
          }
       />
      </Routes>
    </Router>
  );
}

export default App;
