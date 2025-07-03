import { Link } from "react-router-dom";


export default function NotFoundPage() {
    return(
        <div className="flex flex-col gap-2 text-center mt-10">
            <p>404 not found ):</p>
            <Link to="/">
                <button className="btn btn-primary">To Home Page</button>
            </Link>
        </div>
    );
}