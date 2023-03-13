import { Link } from "react-router-dom";

const Levels = () => {
    document.title = 'Levels'
    return<>
            <h2>Levels</h2>
            <ul>
                <li>
                    <h3>Easy</h3>
                    <p>You'll be given 60 seconds to type 10 words</p>
                    <Link to="/play/easy">Play</Link>
                </li>
                <li>
                    <h3>Medium</h3>
                    <p>You'll be given 60 seconds to type 20 words</p>
                    <Link to="/play/medium">Play</Link>
                </li>
                <li>
                    <h3>Hard</h3>
                    <p>You'll be given 40 seconds to type 40 words</p>
                    <Link to="/play/hard">Play</Link>
                </li>
            </ul>
    </>
}
 
export default Levels;