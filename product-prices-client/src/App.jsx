import { useState, useEffect } from 'react'
import axios from "axios"
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HeroOverlay from './components/HeroOverlay';


function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //function to fetch data
  async function fetchAPI() {
    setIsLoading(true);
    const response = await axios.get("http://localhost:8080/prices");
    setProducts(response.data);
    setIsLoading(false);
  }

  function handleSearchClick() {
      
  }

  function handleQueryChange(event) {
      setSearchQuery(event.target.value);
  }


  //call function on initial rendeer
  //useEffect(() => {
  //  fetchAPI();
  //}, []);
  
  //when fetching data from backend have loading screen
  if (isLoading) {
    return(
    <button className="btn">
      <span className="loading loading-spinner"></span>
      loading prices
    </button>
    );
  }

  return (
    <div>
        {/* NavBar */}
        <NavBar />
        {/* Title */}
        <p className="text-5xl font-bold m-20 mt-75 text-center">Product Price Searcher</p>
        {/* Search Bar */}
        <div className="text-center">
            <input className="input input-primary rounded-l-full sm:input-sm md:input-md lg:input-lg xl:input-xl" type="search" required placeholder="Search Product..." onChange={handleQueryChange}/>
            <button className="btn btn-primary rounded-r-full btn-soft sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" onClick={handleSearchClick}>                
                <svg className="h-[1em] opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
            </button>
        </div>
        {/* List displaying products */}
        <div>
          <ul>
            {products.map((product,index) => 
              <li key={index}> 
                {product.retailer}
                <br />
                {product.price}
                <br />
                {product.link}
              </li>
            )}
          </ul>
        </div>
        {/* Footer */}
        <Footer />
    </div>
  )
}
export default App