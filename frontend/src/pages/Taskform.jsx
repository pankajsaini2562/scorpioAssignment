import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const Taskform = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "", // <-- Add dueDate here
  });
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/task/${id}`, form);
      } else {
        await API.post("/task/", form);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert(error.response?.data?.message || "Failed to submit the form");
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (id) {
          const res = await API.get(`/task/${id}`);
          console.log("Idres", res);
          const task = res.data;
          const formattedDueDate = task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : "";
          setForm({ ...task, dueDate: formattedDueDate });
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        alert(error.response?.data?.message || "Failed to load task");
      }
    };

    fetchTask();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {id ? "Edit" : "Add"} Task
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Title</span>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Description</span>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none resize-none"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Due Date</span>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 font-medium">Status</span>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          {id ? "Update" : "Create"} Task
        </button>
      </form>
    </div>
  );
};

export default Taskform;
