'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff, Zap, ChevronRight } from 'lucide-react';

type Step = 'role' | 'details' | 'otp';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<'SELLER' | 'CUSTOMER' | 'BUYER'>('CUSTOMER');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [userId, setUserId] = useState('');

  const [form, setForm] = useState({
    username: '', firstName: '', lastName: '',
    email: '', phone: '', whatsapp: '',
    address: '', password: '', confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match!'); return;
    }
    if (!form.username || !form.email || !form.password || !form.firstName || !form.lastName) {
      toast.error('Please fill all required fields'); return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setUserId(data.userId);
      toast.success('OTP sent to your phone!');
      setStep('otp');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code: otpCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'OTP verification failed');
      toast.success('Registration complete! Please login.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-bg grid-pattern flex items-center justify-center p-4">
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="glass rounded-3xl p-8 neon-border">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 neon-border">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black gradient-text">Galaxy Mart</h1>
            <p className="text-gray-400 text-sm mt-1">Create Your Account</p>
          </div>

          {/* Step: Role Selection */}
          {step === 'role' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white text-center mb-6">Choose Your Role</h2>
              {[
                { value: 'SELLER', label: 'Seller / Dropshipper', desc: 'Sell products & earn commissions', icon: '🏪' },
                { value: 'CUSTOMER', label: 'Customer / Buyer', desc: 'Buy products directly', icon: '🛍️' },
              ].map((r) => (
                <button key={r.value} onClick={() => setRole(r.value as any)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${role === r.value ? 'border-indigo-500 bg-indigo-500/20' : 'border-gray-700 hover:border-indigo-400 glass'}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{r.icon}</span>
                    <div>
                      <div className="font-bold text-white">{r.label}</div>
                      <div className="text-gray-400 text-sm">{r.desc}</div>
                    </div>
                    {role === r.value && <div className="ml-auto w-3 h-3 rounded-full bg-indigo-500" />}
                  </div>
                </button>
              ))}
              <button onClick={() => setStep('details')} className="btn-primary w-full text-white flex items-center justify-center gap-2 mt-6">
                Continue <ChevronRight className="w-5 h-5" />
              </button>
              <p className="text-center text-gray-400 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">Login</Link>
              </p>
            </div>
          )}

          {/* Step: Details */}
          {step === 'details' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setStep('role')} className="text-indigo-400 hover:text-indigo-300 text-sm">← Back</button>
                <span className="text-gray-500">|</span>
                <span className="text-sm text-gray-400 capitalize">{role.toLowerCase()} Registration</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name *" className="w-full bg-gray-900/80 border border-gray-700 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-white text-sm outline-none transition-colors" />
                </div>
                <div className="relative">
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name *" className="w-full bg-gray-900/80 border border-gray-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors" />
                </div>
              </div>

              {[
                { name: 'username', placeholder: 'Username *', icon: <User className="w-4 h-4 text-indigo-400" /> },
                { name: 'email', placeholder: 'Email *', icon: <Mail className="w-4 h-4 text-indigo-400" /> },
                { name: 'phone', placeholder: 'Phone Number *', icon: <Phone className="w-4 h-4 text-indigo-400" /> },
                { name: 'whatsapp', placeholder: 'WhatsApp Number', icon: <Phone className="w-4 h-4 text-green-400" /> },
                { name: 'address', placeholder: 'Address', icon: <MapPin className="w-4 h-4 text-indigo-400" /> },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">{field.icon}</div>
                  <input name={field.name} value={(form as any)[field.name]} onChange={handleChange} placeholder={field.placeholder}
                    className="w-full bg-gray-900/80 border border-gray-700 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-white text-sm outline-none transition-colors" />
                </div>
              ))}

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Password *"
                  className="w-full bg-gray-900/80 border border-gray-700 focus:border-indigo-500 rounded-xl pl-10 pr-12 py-3 text-white text-sm outline-none transition-colors" />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password *"
                  className="w-full bg-gray-900/80 border border-gray-700 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-white text-sm outline-none transition-colors" />
              </div>

              <button onClick={handleRegister} disabled={loading} className="btn-primary w-full text-white disabled:opacity-50">
                {loading ? 'Registering...' : 'Register & Send OTP'}
              </button>
            </div>
          )}

          {/* Step: OTP */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h2 className="text-xl font-bold text-white mb-2">Verify Your Phone</h2>
                <p className="text-gray-400 text-sm">Enter the 6-digit OTP sent to {form.phone}</p>
              </div>
              <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="Enter OTP Code" maxLength={6}
                className="w-full bg-gray-900/80 border border-gray-700 focus:border-indigo-500 rounded-xl px-4 py-4 text-white text-center text-2xl font-bold tracking-widest outline-none transition-colors" />
              <button onClick={handleOtpVerify} disabled={loading || otpCode.length < 6} className="btn-primary w-full text-white disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button onClick={() => setStep('details')} className="w-full text-gray-400 hover:text-white text-sm transition-colors">
                ← Back to Details
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
