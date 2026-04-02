import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import api from '../../api/axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const setAuth = useAuthStore(state => state.setAuth);
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorStatus('');
    try {
      const res = await api.post('/auth/login', data);
      if (res.data.success) {
        setAuth(res.data.data.user, res.data.data.token);
        if (res.data.data.user.role === 'Admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/events/catalog');
        }
      }
    } catch (err) {
      setErrorStatus(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm z-0"></div>
      
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl z-10 mx-4 border border-glass-border">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-lg mx-auto bg-gradient-to-br from-accent-gold to-accent-blue flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_20px_rgba(245,158,11,0.6)] mb-4">
            CE
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Welcome Back</h1>
          <p className="text-text-muted mt-2 text-sm">Sign in to manage your college events</p>
        </div>

        {errorStatus && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger/30 text-danger rounded-lg text-sm text-center">
            {errorStatus}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text-muted">Email Address</label>
            <input 
              {...register('email', { required: 'Email is required' })}
              type="email" 
              className="w-full bg-glass-bg border border-glass-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 text-text-primary placeholder:text-text-muted transition-all"
              placeholder="you@college.edu"
            />
            {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-text-muted">Password</label>
            <input 
              {...register('password', { required: 'Password is required' })}
              type="password" 
              className="w-full bg-glass-bg border border-glass-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 text-text-primary placeholder:text-text-muted transition-all"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-accent-blue hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center mt-6 shadow-[0_4px_14px_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)]"
          >
            {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-6">
          Don't have an account? <Link to="/register" className="text-accent-blue hover:text-blue-400 font-medium transition-colors">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
