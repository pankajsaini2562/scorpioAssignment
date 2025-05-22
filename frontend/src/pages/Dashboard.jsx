import React, { useEffect, useState } from "react";
import API from "../api/api";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get("/task/");
    console.log("res", res);
    setTasks(res.data.tasks);
  };

  const handleDelete = async (id) => {
    await API.delete(`/task/${id}`);
    fetchTasks();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 sm:mb-0">
            Task Dashboard
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/task")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add Task
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-4 rounded shadow"
              >
                <div className="mb-2 sm:mb-0">
                  <h3 className="text-lg font-medium text-gray-900">
                    {task.title}
                  </h3>
                  <span className="text-sm text-gray-600">
                    Description: {task.description}
                  </span>
                  <p className="text-sm text-gray-600">Status: {task.status}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/task/${task._id}`)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
