import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
          🧪 ChemBot Admin
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
          Chemical Factory Management System
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition cursor-pointer"
          >
            Admin Login
          </button>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-slate-800 rounded-lg font-medium transition cursor-pointer"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;