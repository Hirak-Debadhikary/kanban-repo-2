import React, { useState } from "react";
import Modal from "react-modal"; // You may need to install this library

const EditTask = ({ task, isOpen, onRequestClose, onUpdateTask }) => {
  const [newTitle, setNewTitle] = useState(task.title);

  const handleUpdate = () => {
    onUpdateTask(task._id, newTitle);
    onRequestClose();
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Edit Task"
    className="fixed inset-0 flex items-center justify-center z-50"
    overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50"
  >
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />
      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Update
        </button>
        <button
          onClick={onRequestClose}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </Modal>
  );
};

export default EditTask;
