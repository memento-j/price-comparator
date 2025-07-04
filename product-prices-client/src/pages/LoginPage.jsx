import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function LoginPage() {
    return(
        <div>
            <NavBar/>
            <div className="flex items-center justify-center mt-80">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-90 order p-4">
                    <legend className="fieldset-legend">Login</legend>

                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password" />

                    <button className="btn btn-primary mt-4">Login</button>
                </fieldset>
            </div>
            <Footer />
        </div>
    );
}