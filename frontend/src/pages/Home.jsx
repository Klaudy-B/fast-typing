import { Link } from "react-router-dom";
import { UserContext } from "../context";
import { useContext } from "react";
const Home = () => {
    document.title = 'Home';
    const { user } = useContext(UserContext);
    return <div className="home">
        <h1>{ user?`${user}, welcome` : 'Welcome' } to Fast-Typing!</h1>
        <p>Measure your average typing speed with our web app and register personal records within three levels of difficulties.</p>
        <Link to='/levels'>Get started</Link>
    </div>
}
 
export default Home;