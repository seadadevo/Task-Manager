import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1>404 - Page Not Found</h1>
            <Link to="/">Go back home</Link>
        </div>
    );
};

export default NotFound;
