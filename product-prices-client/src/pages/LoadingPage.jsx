import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function LoadingPage() {
    return(
        <div className="loadingContainer">
            {/* NavBar */}
            <NavBar />
            {/* Title */}
            <p className="text-5xl font-bold m-20 mt-75 text-center">Product Price Searcher</p>
            {/* Search Bar */}
            <div className="text-center">
                <button className="btn justify-center text-center">
                    <span className="loading loading-spinner"></span>
                    loading prices...
                </button>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
}