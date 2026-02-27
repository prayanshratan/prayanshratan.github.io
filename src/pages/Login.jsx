import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { success, error: authError } = await login(email, password);

        if (success) {
            navigate('/admin');
        } else {
            setError(authError || 'Invalid credentials');
        }
        setLoading(false);
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
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-lg bg-brand text-white font-bold transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-hover'}`}
                    >
                        {loading ? 'Authenticating...' : 'Authenticate'}
                    </button>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                        Secure login powered by Supabase.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
