import { Link } from "react-router-dom";

const Home = () => {
    document.title = 'Home';
    return <div className="home"><Link to='/levels'>Get started</Link></div>
}
 
export default Home;