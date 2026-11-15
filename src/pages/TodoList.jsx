import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialTodos } from '../data/dummyData';

export default function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : initialTodos;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'to-do',
    priority: 'low',
    deadline: ''
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTodo = {
      id: Date.now(),
      ...formData
    };

    setTodos(prev => [...prev, newTodo]);
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      status: 'to-do',
      priority: 'low',
      deadline: ''
    });
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus tugas "${title}"?`)) {
      setTodos(prev => prev.filter(t => t.id !== id));
    }
  };

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'high':
        return { backgroundColor: '#FFDDDD', color: '#D9534F' };
      case 'medium':
        return { backgroundColor: '#FFF4DE', color: '#D99B26' };
      default:
        return { backgroundColor: '#E2F1FF', color: '#3B82F6' };
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'done':
        return { backgroundColor: '#E2F8E7', color: '#2E7D32' };
      case 'in progress':
        return { backgroundColor: '#FFE8C4', color: '#D97706' };
      default:
        return { backgroundColor: '#F1F5F9', color: '#64748B' };
    }
  };

  return (
    <div style={{ backgroundColor: '#F4F8FD', minHeight: '100vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header Box */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px 32px',
          marginBottom: '24px',
          border: '1px solid #E2EDF9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#2C3E50', margin: 0 }}>Todo List</h1>
            <p style={{ fontSize: '13px', color: '#7B8B9A', marginTop: '4px', margin: 0, fontWeight: '500' }}>
              Kelola dan atur jadwal harianmu di sini
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: '#FFCED8',
              color: '#8C3B4D',
              fontWeight: '700',
              padding: '10px 24px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: '0 2px 8px rgba(255,206,216,0.5)',
              transition: 'transform 0.1s ease'
            }}
          >
            + Tambah Todo
          </button>
        </div>

        {/* Table Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E2EDF9',
          overflow: 'hidden',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAFDFE' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6A7B8C', letterSpacing: '0.05em' }}>JUDUL</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6A7B8C', letterSpacing: '0.05em' }}>STATUS</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6A7B8C', letterSpacing: '0.05em' }}>PRIORITAS</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6A7B8C', letterSpacing: '0.05em' }}>DEADLINE</th>
                <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#6A7B8C', letterSpacing: '0.05em' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id} style={{ backgroundColor: '#FFFFFF' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '600', color: '#34495E', fontSize: '14px' }}>
                    {todo.title}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      ...getStatusBadgeStyle(todo.status),
                      padding: '6px 14px',
                      borderRadius: '50px',
                      fontSize: '12px',
                      fontWeight: '700',
                      display: 'inline-block'
                    }}>
                      {todo.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      ...getPriorityBadgeStyle(todo.priority),
                      padding: '6px 14px',
                      borderRadius: '50px',
                      fontSize: '12px',
                      fontWeight: '700',
                      display: 'inline-block'
                    }}>
                      {todo.priority}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#7F8C8D', fontFamily: 'monospace', fontSize: '13px' }}>
                    {todo.deadline}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => navigate(`/todo/${todo.id}`)}
                        title="Detail"
                        style={{
                          backgroundColor: '#E2F1FF',
                          color: '#3B82F6',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '8px 10px',
                          cursor: 'pointer'
                        }}
                      >
                        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id, todo.title)}
                        title="Hapus"
                        style={{
                          backgroundColor: '#FFDDDD',
                          color: '#D9534F',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '8px 10px',
                          cursor: 'pointer'
                        }}
                      >
                        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(44, 62, 80, 0.3)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          zIndex: 50
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: '28px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            border: '1px solid #E2EDF9'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#2C3E50', textAlign: 'center', marginBottom: '20px' }}>
              Tambah Todo
            </h2>
            <form onSubmit={handleAddTodo} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#7B8B9A', marginBottom: '6px', letterSpacing: '0.05em' }}>JUDUL</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Masukkan judul tugas..."
                  style={{
                    width: '100%',
                    border: '1px solid #E2EDF9',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    fontSize: '14px',
                    backgroundColor: '#FAFDFE',
                    boxSizing: 'border-[#FFCED8]',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#7B8B9A', marginBottom: '6px', letterSpacing: '0.05em' }}>DESKRIPSI</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Masukkan deskripsi tugas..."
                  style={{
                    width: '100%',
                    border: '1px solid #E2EDF9',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    fontSize: '14px',
                    backgroundColor: '#FAFDFE',
                    resize: 'none',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#7B8B9A', marginBottom: '6px', letterSpacing: '0.05em' }}>STATUS</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      border: '1px solid #E2EDF9',
                      borderRadius: '14px',
                      padding: '10px',
                      fontSize: '14px',
                      backgroundColor: '#FAFDFE',
                      outline: 'none'
                    }}
                  >
                    <option value="to-do">to-do</option>
                    <option value="in progress">in progress</option>
                    <option value="done">done</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#7B8B9A', marginBottom: '6px', letterSpacing: '0.05em' }}>PRIORITAS</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      border: '1px solid #E2EDF9',
                      borderRadius: '14px',
                      padding: '10px',
                      fontSize: '14px',
                      backgroundColor: '#FAFDFE',
                      outline: 'none'
                    }}
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#7B8B9A', marginBottom: '6px', letterSpacing: '0.05em' }}>DEADLINE</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    border: '1px solid #E2EDF9',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    fontSize: '14px',
                    backgroundColor: '#FAFDFE',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFDDDD',
                    color: '#D9534F',
                    fontWeight: '700',
                    padding: '10px',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    backgroundColor: '#FFCED8',
                    color: '#8C3B4D',
                    fontWeight: '700',
                    padding: '10px',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}