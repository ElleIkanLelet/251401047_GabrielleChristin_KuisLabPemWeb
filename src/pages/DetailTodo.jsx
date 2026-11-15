import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialTodos } from '../data/dummyData';

export default function DetailTodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : initialTodos;
  });

  const todo = todos.find(t => t.id === Number(id));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'to-do',
    priority: 'low',
    deadline: ''
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        status: todo.status,
        priority: todo.priority,
        deadline: todo.deadline
      });
    }
  }, [id, todos]);

  if (!todo) {
    return (
      <div className="min-h-screen bg-[#F4F8FD] p-8 flex flex-col items-center justify-center font-sans">
        <h2 className="text-lg font-bold text-[#2C3E50] mb-4">Todo tidak ditemukan</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-[#FFCED8] text-[#8C3B4D] px-6 py-2 rounded-full text-sm font-bold hover:bg-[#FFB8C6] transition-all"
        >
          Kembali
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTodos = todos.map(t => {
      if (t.id === Number(id)) {
        return { ...t, ...formData };
      }
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F8FD] flex items-center justify-center p-4 font-sans">
      <div className="bg-white border border-[#E2EDF9] rounded-[32px] shadow-sm p-8 w-full max-w-xl relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <div>
              <span className="text-xs font-bold text-[#7B8B9A] uppercase tracking-wider">Judul</span>
              <h2 className="text-xl font-bold text-[#2C3E50] mt-1">{todo.title}</h2>
            </div>

            <div>
              <span className="text-xs font-bold text-[#7B8B9A] uppercase tracking-wider">Deskripsi</span>
              <p className="text-[#546E7A] text-sm mt-1.5 leading-relaxed bg-[#FAFDFE] p-4 rounded-2xl border border-[#E2EDF9]">
                {todo.description || 'Tidak ada deskripsi.'}
              </p>
            </div>
          </div>

          <div className="md:col-span-1 space-y-4 border-t md:border-t-0 md:border-l border-[#F0F5FA] pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#7B8B9A] uppercase tracking-wider">Status</span>
                <p className="text-[#34495E] text-sm font-bold mt-1">{todo.status}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-[#7B8B9A] uppercase tracking-wider">Prioritas</span>
                <p className="text-[#34495E] text-sm font-bold mt-1">{todo.priority}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-[#7B8B9A] uppercase tracking-wider">Deadline</span>
                <p className="text-[#34495E] text-sm font-mono mt-1">{todo.deadline}</p>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-[#FFDDDD] hover:bg-[#FFC2C2] text-[#D9534F] font-bold py-2 rounded-full text-sm transition-all duration-200 text-center"
              >
                Kembali
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-[#FFCED8] hover:bg-[#FFB8C6] text-[#8C3B4D] font-bold py-2 rounded-full text-sm shadow-sm transition-all duration-200 text-center"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#2C3E50]/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[32px] p-7 w-full max-w-md shadow-xl border border-[#E2EDF9]">
            <h2 className="text-xl font-bold text-[#2C3E50] text-center mb-6">Update Todo</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#7B8B9A] uppercase tracking-wider mb-1.5">Judul</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-[#E2EDF9] rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFCED8] bg-[#FAFDFE]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7B8B9A] uppercase tracking-wider mb-1.5">Deskripsi</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-[#E2EDF9] rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFCED8] bg-[#FAFDFE] resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#7B8B9A] uppercase tracking-wider mb-1.5">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-[#E2EDF9] rounded-2xl px-3.5 py-2.5 text-sm bg-[#FAFDFE] focus:outline-none focus:ring-2 focus:ring-[#FFCED8]"
                  >
                    <option value="to-do">to-do</option>
                    <option value="in progress">in progress</option>
                    <option value="done">done</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#7B8B9A] uppercase tracking-wider mb-1.5">Prioritas</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full border border-[#E2EDF9] rounded-2xl px-3.5 py-2.5 text-sm bg-[#FAFDFE] focus:outline-none focus:ring-2 focus:ring-[#FFCED8]"
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7B8B9A] uppercase tracking-wider mb-1.5">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full border border-[#E2EDF9] rounded-2xl px-4 py-2.5 text-sm bg-[#FAFDFE] focus:outline-none focus:ring-2 focus:ring-[#FFCED8]"
                />
              </div>

              <div className="flex justify-between space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 bg-[#FFDDDD] hover:bg-[#FFC2C2] text-[#D9534F] font-bold py-2.5 rounded-full text-sm transition-all duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-[#FFCED8] hover:bg-[#FFB8C6] text-[#8C3B4D] font-bold py-2.5 rounded-full text-sm shadow-sm transition-all duration-200"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}