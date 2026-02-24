import { useParams } from "react-router-dom";

const TaskDetails = () => {
    const { id } = useParams();

    return (
        <div className="p-4">
            <h1>Task Details</h1>
            <p>Task ID: {id}</p>
        </div>
    );
};

export default TaskDetails;
