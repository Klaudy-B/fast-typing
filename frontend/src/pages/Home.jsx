import { Link } from "react-router-dom";
import { UserContext } from "../context";
import { useContext } from "react";
import { setTitle, urls } from "../scripts/helpers";
const Home = () => {
    setTitle('Home');
    const { user } = useContext(UserContext);
    return<>
        <h1>{ user?`${user}, welcome` : 'Welcome' } to Fast-Typing!</h1>
        <img src="fast-typing.png" alt="fast-typing.png" />
        <p>Measure your average typing speed with our web app and register personal records within three levels of difficulties.</p>
        <Link to={urls.levels}>Get started</Link>
        </>
}
 
export default Home;