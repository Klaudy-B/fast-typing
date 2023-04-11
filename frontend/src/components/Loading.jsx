import { setTitle } from "../scripts/helpers";

const Loading = () => {
    setTitle('Loading');
    return <span className="loading">Loading...</span>
}

export default Loading;