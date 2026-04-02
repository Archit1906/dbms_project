import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorStatus('');
    try {
        // Data casting
        data.year = parseInt(data.year, 10);
      const res = await api.post('/auth/register', data);
      if (res.data.success) {
        navigate('/login');
      }
    } catch (err) {
      setErrorStatus(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070')] bg-cover bg-center relative py-12">
      <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm z-0"></div>
      
      <div className="glass-panel w-full max-w-lg p-8 rounded-2xl z-10 mx-4 border border-glass-border overflow-y-auto max-h-[90vh] custom-scrollbar">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Create an Account</h1>
          <p className="text-text-muted mt-2 text-sm">Join the centralized college events portal</p>
        </div>

        {errorStatus && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger/30 text-danger rounded-lg text-sm text-center">
            {errorStatus}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text-muted">Full Name</label>
            <input 
              {...register('name', { required: 'Name is required' })}
              type="text" 
              className="w-full bg-glass-bg border border-glass-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 text-text-primary placeholder:text-text-muted"
            />
            {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-text-muted">Email Address</label>
            <input 
              {...register('email', { required: 'Email is required' })}
              type="email" 
              className="w-full bg-glass-bg border border-glass-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 text-text-primary placeholder:text-text-muted"
            />
            {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
          </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium mb-1 text-text-muted">Department</label>
                <input 
                 {...register('department', { required: 'Department is required' })}
                 type="text" 
                 className="w-full bg-glass-bg border border-glass-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 text-text-primary"
                 placeholder="e.g. Computer Science"
                />
                {errors.department && <p className="text-danger text-xs mt-1">{errors.department.message}</p>}
             </div>
             <div>
                <label className="block text-sm font-medium mb-1 text-text-muted">Year (1-5)</label>
                <input 
                 {...register('year', { required: 'Year is required', min: 1, max: 5 })}
                 type="number" 
                 className="w-full bg-glass-bg border border-glass-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 text-text-primary"
                />
                 {errors.year && <p className="text-danger text-xs mt-1">{errors.year.message}</p>}
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-text-muted">Password</label>
            <input 
              {...register('password', { required: 'Password is required', minLength: 6 })}
              type="password" 
              className="w-full bg-glass-bg border border-glass-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 text-text-primary placeholder:text-text-muted"
            />
            {errors.password && <p className="text-danger text-xs mt-1">Password must be at least 6 length</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-accent-blue hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center mt-6 shadow-[0_4px_14px_rgba(59,130,246,0.39)]"
          >
            {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-6">
          Already have an account? <Link to="/login" className="text-accent-blue hover:text-blue-400 font-medium transition-colors">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
