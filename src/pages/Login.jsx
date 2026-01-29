import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            navigate('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-2xl">
                <div className="flex justify-center mb-8">
                    <div className="p-4 rounded-full bg-brand/10 text-brand">
                        <Lock size={32} />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-8">Admin Access</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 rounded-lg bg-brand text-white font-bold hover:bg-brand-hover transition-colors"
                    >
                        Authenticate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
