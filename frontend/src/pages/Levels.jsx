import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context";

const Levels = () => {
    document.title = 'Levels'
    const user = useContext(UserContext);
    return (
    <div className="welcome">
        <h1>{ user?`${user}, welcome` : 'Welcome' } to Fast-Typing!</h1>
        <p>Measure your typing speed with our web app and keep track of your personal records within three levels of difficulties.</p>
        <div className="levels">
            <h2>Levels</h2>
            <ul>
                <li>
                    <h3>Easy</h3>
                    <p>You'll be given 60 seconds to type 15 words</p>
                    <Link to="/play/easy">Play</Link>
                </li>
                <li>
                    <h3>Medium</h3>
                    <p>You'll be given 60 seconds to type 30 words</p>
                    <Link to="/play/medium">Play</Link>
                </li>
                <li>
                    <h3>Hard</h3>
                    <p>You'll be given 40 seconds to type 40 words</p>
                    <Link to="/play/hard">Play</Link>
                </li>
            </ul>
        </div>
    </div>
    )
}
 
export default Levels;