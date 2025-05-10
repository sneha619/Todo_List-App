import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Plus, Trash2, StickyNote, Edit2, GripVertical } from "lucide-react"
import { motion } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export interface Todo {
  _id: string
  title: string
  description?: string
  status?: string
  createdAt: string
  dueDate?: string
}

interface TodoListProps {
  todos: Todo[]
  fetchTodos: () => Promise<void>
}

const TodoList: React.FC<TodoListProps> = ({ todos, fetchTodos }) => {
const [newTodo, setNewTodo] = useState<string>("")
const [currentPage, setCurrentPage] = useState<number>(1)
const [statusFilter, setStatusFilter] = useState<string>("all")
const [selectedTodos, setSelectedTodos] = useState<string[]>([])
const [orderedTodos, setOrderedTodos] = useState<Todo[]>([])
const [editingTodoId, setIsEditing] = useState<string | null>(null);
const [editText, setEditText] = useState<string>("");
const [newDueDate, setNewDueDate] = useState<string>("")
const [newDescription, setNewDescription] = useState<string>("");


useEffect(() => {
  const savedPage = localStorage.getItem("currentPage");
  if (savedPage) {
    setCurrentPage(parseInt(savedPage, 10));
  }
  
  const savedFilter = localStorage.getItem("statusFilter");
  if (savedFilter) {
    setStatusFilter(savedFilter);
  }
}, []);


useEffect(() => {
  localStorage.setItem("currentPage", currentPage.toString());
}, [currentPage]);

useEffect(() => {
  localStorage.setItem("statusFilter", statusFilter);
}, [statusFilter]);

const updateTodo = async (id: string, updates: Partial<Todo>) => {
  try {
    console.log(`PUT /todos/${id} →`, updates);
    const response = await axios.put(
      `https://todo-backend-8occ.onrender.com/todos/${id}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update todo with id ${id}:`, error);
    throw error;
  }
};


const handleSave = async (id: string) => {
  const todoToUpdate = todos.find((todo) => todo._id === id);
  if (!todoToUpdate) return;

  const payload = {
    title: editText.trim(),
    description: todoToUpdate.description || "",
    dueDate: todoToUpdate.dueDate || undefined,
    status: todoToUpdate.status || "pending",
    owner: (todoToUpdate as any).owner,
  };

  try {
    await updateTodo(id, payload);
    await fetchTodos();
    setIsEditing(null);
  } catch (err) {
    console.error("Update failed:", err);
  }
};

const cancelEdit = () => {
  setIsEditing(null);
};

  // Initialize orderedTodos when todos change or on component mount
  useEffect(() => {
    if (todos && todos.length > 0) {
      setOrderedTodos(todos)
    }
  }, [todos])

  const todosPerPage: number = 5

  const addTodo = async (): Promise<void> => {
    if (!newTodo.trim()) return
    try {
      console.log("Adding todo:", { title: newTodo.trim(), description: newDescription, dueDate: newDueDate || undefined })
      const token = localStorage.getItem("accessToken")
      if (!token) {
        console.error("No auth token found")
        return
      }
      
      const response = await axios.post(
        "https://todo-backend-8occ.onrender.com/todos",
        { 
          title: newTodo.trim(),
          description: newDescription, 
          dueDate: newDueDate || undefined,
          status: "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        },
      )
      console.log("Todo created successfully:", response.data)
      setNewTodo("")
      setNewDescription("") 
      setNewDueDate("") 
      await fetchTodos()
    } catch (error) {
      console.error("Error adding todo:", error)
      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status)
        console.error("Response data:", error.response?.data)
      }
    }
  }

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      console.log(`Deleting todo with ID: ${id}`)
      const response = await axios.delete(`https://todo-backend-8occ.onrender.com/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true
      })
      console.log("Delete response:", response.status)
      await fetchTodos()
    } catch (error) {
      console.error("Error deleting todo:", error)
      
      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status)
        console.error("Response data:", error.response?.data)
      }
    }
  }

  const markSelectedAsCompleted = async (): Promise<void> => {
    console.log("Marking complete:", selectedTodos);
    try {
      const promises = selectedTodos.map((id) => {
        console.log(`PUT /todos/${id} → { status: "completed" }`);
        return axios.put(
          `https://todo-backend-8occ.onrender.com/todos/${id}`,
          { status: "completed" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true
          }
        );
      });
  
      const results = await Promise.all(promises);
      console.log("Update results:", results.map(r => r.status));
      setSelectedTodos([]);
      await fetchTodos();
    } catch (err: any) {
      console.error("Error updating todos:", err.response?.status, err.response?.data);
    }
  };
  
  const toggleTodoSelection = (id: string): void => {
    setSelectedTodos((prev) => (prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]))
  }

  const onDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(orderedTodos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setOrderedTodos(items)
  }
  const filteredTodos = orderedTodos.filter((todo) => {
    if (statusFilter === "all") return true
    return todo.status === statusFilter
  })

  const indexOfLastTodo = currentPage * todosPerPage
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage
  const currentTodos = orderedTodos
  .filter((todo) => {
    if (statusFilter === "all") return true
    return todo.status === statusFilter
  })
  .slice(indexOfFirstTodo, indexOfLastTodo)
  const pageCount = Math.ceil(filteredTodos.length / todosPerPage)

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card shadow-xl rounded-2xl p-8 transition-colors duration-200">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white flex justify-center items-center gap-2 transition-colors duration-200">
          <StickyNote className="text-indigo-600 dark:text-indigo-400" />
          My To-Do List
        </h1>

        {/* Input */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="w-full space-y-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 w-full transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-600"
              placeholder="Add a new task..."
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 w-full transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-600"
              placeholder="Description (optional)"
            />
            {!newDueDate ? (
              <input
                type="text"
                value={newDueDate}
                placeholder="Select date"
                onFocus={(e) => e.target.type = "date"}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 w-full sm:w-[50%] transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-600"
              />
            ) : (
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-3 w-full sm:w-[50%] transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-600"
              />
            )}
          </div>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-2xl shadow-lg transition-all duration-200"
            onClick={addTodo}
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>

        </div>       
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="status-filter" className="text-gray-700 dark:text-gray-300">
              Filter by status:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {selectedTodos.length > 0 && (
            <button
              onClick={markSelectedAsCompleted}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Mark Selected as Completed ({selectedTodos.length})
            </button>
          )}
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-5 font-semibold text-sm bg-blue-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-t-md transition-colors duration-200">
          <span className="flex items-center">
            <span className="ml-6">TODO TITLE</span>
          </span>
          <span className="text-center">STATUS</span>
          <span className="text-center">CREATED AT</span>
          <span className="text-center">DRAG</span>
          <span className="text-right">ACTION</span>
        </div>

        {/* Todos */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todos-list">
            {(provided, snapshot) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                className={`divide-y ${snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-gray-700/50' : ''}`}
              >
                {currentTodos.map((todo, index) => {                  
                  const originalIndex = orderedTodos.findIndex(t => t._id === todo._id) + 1;
                  return (
                  <Draggable key={todo._id} draggableId={todo._id} index={index}>
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileDrag={{ scale: 1.02, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
                        className={`grid grid-cols-5 items-center px-4 py-3 ${snapshot.isDragging ? 'bg-blue-100 dark:bg-gray-600 shadow-lg' : 'bg-white dark:bg-gray-800'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 rounded ${snapshot.isDragging ? 'z-10' : ''}`}
                      >
                        <span className="dark:text-white transition-colors duration-200 flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedTodos.includes(todo._id)}
                            onChange={() => toggleTodoSelection(todo._id)}
                            className="mr-2 h-4 w-4"
                          />
                          <span className="mr-2 text-gray-500 dark:text-gray-400 font-mono text-sm">{originalIndex}.</span>
                          {editingTodoId === todo._id ? (
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onBlur={() => handleSave(todo._id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSave(todo._id);
                                if (e.key === "Escape") cancelEdit();
                              }}
                              autoFocus
                              className="bg-white dark:bg-gray-700 text-black dark:text-white border rounded px-2 py-1 w-full"
                            />
                          ) : (
                            <div className="flex flex-col">
                              <span
                                className={`font-medium ${
                                  todo.status === 'completed'
                                    ? 'line-through text-gray-400 dark:text-gray-500'
                                    : ''
                                }`}
                              >
                                {todo.title}
                              </span>
                              {todo.description && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {todo.description}
                                </span>
                              )}
                            </div>
                          )}
                        </span>
                        <span className="text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              todo.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }`}
                          >
                            {todo.status || "pending"}
                          </span>
                        </span>
                        <span className="text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "No due date"}
                        </span>
                        <div className="flex justify-center items-center">
                          <div    {...provided.dragHandleProps}
                            className={`cursor-grab active:cursor-grabbing p-2 ${snapshot.isDragging ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'} transition-colors duration-200 flex items-center justify-center`}
                            aria-label="Drag to reorder"
                          >
                            <GripVertical size={18} />
                          </div>
                        </div>
                        <div className="text-right flex space-x-2 justify-end">
                        {editingTodoId === todo._id ? (
                          <>
                            <button
                              onClick={() => handleSave(todo._id)}
                              className="text-green-600 hover:text-green-800 transition"
                              aria-label="Save Task"
                            >
                              ✅
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="text-gray-500 hover:text-gray-700 transition"
                              aria-label="Cancel Edit"
                            >
                              ❌
                            </button>
                          </>
                        ) : (
                          <>

                            <button
                              onClick={() => {
                                setIsEditing(todo._id)
                                setEditText(todo.title)
                              }}
                              className="text-blue-500 hover:text-blue-700 transition"
                              aria-label="Edit Task"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => deleteTodo(todo._id)}
                              className="text-red-500 hover:text-red-700 transition"
                              aria-label="Delete Task"
                            >
                              <Trash2 />
                            </button>
                          </>
                        )}
                      </div>
                      </motion.div>
                    )}
                  </Draggable>
                )})}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Pagination Controls */}
        {pageCount > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: pageCount }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => paginate(idx + 1)}
                className={`px-4 py-2 rounded-md transition-all border ${
                  currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center transition-colors duration-200">
          Built by{" "}
          <span className="font-medium text-blue-500 dark:text-blue-400 transition-colors duration-200">Sneha</span>
        </footer>
      </div>
    </div>
  )
}

export default TodoList
