import { useState } from 'react'
import axios from "axios"
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingPage from './LoadingPage';
import Card from '../components/Card';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //function to fetch data
  async function fetchAPI(userQuery) {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/prices?search=${userQuery}`);
      setProducts(response.data);
    }
    catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  //loading page when fetching from backend
  if (isLoading) {
    return (
      <LoadingPage />
    )
  }

  return (
    <div>
      {/* NavBar */}
      <NavBar />
      {/* Title */}
      <p className="text-5xl font-bold m-20 mt-50 text-center">Product Price Searcher</p>
      {/* Search Bar */}
      <div className="text-center">
        <input className="input input-primary rounded-l-full sm:input-sm md:input-md lg:input-lg xl:input-xl" type="search" required placeholder="Enter full product name..." 
        onChange={(event) => setSearchQuery(event.target.value)}  
        //if key presseed in the input field is enter, fetch prices
        onKeyDown={(event) => {
          //ensures there is a valid search query
          if (searchQuery === "") {
            return;
          }
          if (event.key === "Enter") {
            fetchAPI(searchQuery);
          }
        }}/>
        <button className="btn btn-primary rounded-r-full btn-outline sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" onClick={() => {
          //ensures there is a valid search query
          if (searchQuery === "") {
            return;
          }
          fetchAPI(searchQuery)}}>
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
      <div className="flex justify-center-safe">
        <ul className="mb-75 mt-15 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
          {products.map((product, index) =>
            <li key={index} className="m-5">
              <Card 
              price={product.price}
              retailer={product.retailer}
              link={product.link}/>
            </li>
          )}
        </ul>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}
export default HomePage