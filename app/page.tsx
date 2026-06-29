'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Users, TrendingUp, Gavel, Shield, Globe,
  Star, ArrowRight, Zap, Package, ChevronDown
} from 'lucide-react';

const languages = ['en', 'si', 'ta'] as const;

const heroTexts = {
  en: { title: 'Galaxy Mart', subtitle: 'Tagla Market', desc: 'Sri Lanka\'s Premier Multi-Vendor Marketplace' },
  si: { title: 'ගැලැක්සි මාට්', subtitle: 'ටැග්ලා මාකට්', desc: 'ශ්‍රී ලංකාවේ ප්‍රමුඛ බහු-විකුණුම්කරු වෙළඳපොළ' },
  ta: { title: 'கேலக்ஸி மார்ட்', subtitle: 'டேக்லா மார்க்கெட்', desc: 'இலங்கையின் முன்னணி பல-விற்பனையாளர் சந்தை' },
};

export default function LandingPage() {
  const [lang, setLang] = useState<'en'|'si'|'ta'>('en');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'en'|'si'|'ta';
    if (saved) setLang(saved);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLang = (l: 'en'|'si'|'ta') => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  const hero = heroTexts[lang];

  const features = [
    { icon: <ShoppingBag className="w-8 h-8" />, title: lang === 'si' ? 'සෘජු මිලදී ගැනීම' : lang === 'ta' ? 'நேரடி வாங்குதல்' : 'Direct Buying', desc: lang === 'si' ? 'ගනුදෙනුකරුවන්ට කෙලින්ම order දාන්න' : lang === 'ta' ? 'நேரடியாக ஆர்டர் செய்யுங்கள்' : 'Place orders directly as a buyer' },
    { icon: <Users className="w-8 h-8" />, title: lang === 'si' ? 'Dropshipping' : lang === 'ta' ? 'டிராப்ஷிப்பிங்' : 'Dropshipping', desc: lang === 'si' ? 'ඔබේ store දාලා dropship කරන්න' : lang === 'ta' ? 'உங்கள் கடையை நடத்துங்கள்' : 'Run your own store & dropship' },
    { icon: <Gavel className="w-8 h-8" />, title: lang === 'si' ? 'වෙන්දේසි' : lang === 'ta' ? 'ஏலங்கள்' : 'Auctions', desc: lang === 'si' ? 'Live auction system' : lang === 'ta' ? 'நேரடி ஏல அமைப்பு' : 'Real-time auction bidding' },
    { icon: <Shield className="w-8 h-8" />, title: lang === 'si' ? 'ආරක්ෂිත' : lang === 'ta' ? 'பாதுகாப்பான' : 'Secure', desc: lang === 'si' ? 'KYC verified & OTP protected' : lang === 'ta' ? 'KYC மற்றும் OTP பாதுகாப்பு' : 'KYC verified & OTP protected' },
    { icon: <Globe className="w-8 h-8" />, title: lang === 'si' ? 'බහු භාෂා' : lang === 'ta' ? 'பல மொழிகள்' : 'Multi-Language', desc: lang === 'si' ? 'සිංහල, දෙමළ, ඉංග්‍රීසි' : lang === 'ta' ? 'சிங்களம், தமிழ், ஆங்கிலம்' : 'Sinhala, Tamil, English' },
    { icon: <TrendingUp className="w-8 h-8" />, title: lang === 'si' ? 'ලාභ ශ්‍රේණිය' : lang === 'ta' ? 'லாப அமைப்பு' : 'Profit System', desc: lang === 'si' ? 'Auto profit % calculation' : lang === 'ta' ? 'தானியங்கி லாப கணக்கீடு' : 'Auto profit % calculation' },
  ];

  return (
    <div className="min-h-screen hero-bg grid-pattern overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center neon-border">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-black gradient-text">{hero.title}</span>
              <p className="text-xs text-indigo-300">{hero.subtitle}</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex gap-1 glass rounded-lg p-1">
              {languages.map((l) => (
                <button key={l} onClick={() => changeLang(l)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${lang === l ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors text-sm">
              {lang === 'si' ? 'ලොග් වන්න' : lang === 'ta' ? 'உள்நுழை' : 'Login'}
            </Link>
            <Link href="/register" className="btn-primary text-white text-sm">
              {lang === 'si' ? 'ලියාපදිංචි වන්න' : lang === 'ta' ? 'பதிவு செய்' : 'Register'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Floating orbs */}
            <div className="absolute top-40 left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl float-animation" />
            <div className="absolute top-60 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-40 left-1/2 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />

            <div className="relative z-10">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm text-indigo-300">
                <Star className="w-4 h-4 text-yellow-400" />
                {lang === 'si' ? 'Galaxy Workers විසින් ඉදිරිපත් කෙරේ' : lang === 'ta' ? 'கேலக்ஸி வொர்க்கர்ஸ் வழங்குகிறது' : 'Powered by Galaxy Workers'}
              </motion.div>

              <h1 className="text-7xl md:text-9xl font-black mb-4">
                <span className="gradient-text neon-text">{hero.title}</span>
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-300 mb-6">{hero.subtitle}</h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">{hero.desc}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="btn-primary text-white flex items-center gap-2 text-lg w-full sm:w-auto justify-center">
                  {lang === 'si' ? 'ආරම්භ කරන්න' : lang === 'ta' ? 'தொடங்குங்கள்' : 'Get Started'}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/login" className="glass glass-hover px-6 py-3 rounded-xl font-semibold text-gray-300 hover:text-white transition-all w-full sm:w-auto text-center text-lg">
                  {lang === 'si' ? 'ලොග් වන්න' : lang === 'ta' ? 'உள்நுழை' : 'Login'}
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="mt-20 flex justify-center">
            <ChevronDown className="w-8 h-8 text-indigo-400 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '3', label: lang === 'si' ? 'Panel පද්ධති' : lang === 'ta' ? 'பேனல் அமைப்புகள்' : 'Panel Systems' },
            { num: '∞', label: lang === 'si' ? 'නිෂ්පාදන' : lang === 'ta' ? 'தயாரிப்புகள்' : 'Products' },
            { num: 'Live', label: lang === 'si' ? 'වෙන්දේසි' : lang === 'ta' ? 'ஏலங்கள்' : 'Auctions' },
            { num: '3', label: lang === 'si' ? 'භාෂා' : lang === 'ta' ? 'மொழிகள்' : 'Languages' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center card-3d">
              <div className="text-4xl font-black gradient-text mb-2">{stat.num}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-black text-center gradient-text mb-4">
            {lang === 'si' ? 'විශේෂාංග' : lang === 'ta' ? 'அம்சங்கள்' : 'Features'}
          </motion.h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            {lang === 'si' ? 'Phase 1 → Phase 3 ගමන' : lang === 'ta' ? 'Phase 1 → Phase 3 பயணம்' : 'Phase 1 → Phase 3 Journey'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass glass-hover rounded-2xl p-8 card-3d cursor-pointer group">
                <div className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-center gradient-text mb-16">
            {lang === 'si' ? 'ක්‍රියා කරන ආකාරය' : lang === 'ta' ? 'எப்படி செயல்படுகிறது' : 'How It Works'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: lang === 'si' ? 'ලියාපදිංචි වන්න' : lang === 'ta' ? 'பதிவு செய்யுங்கள்' : 'Register', desc: lang === 'si' ? 'ගනුදෙනුකරු, විකුණුම්කරු, හෝ ගැනුම්කරු ලෙස' : lang === 'ta' ? 'வாடிக்கையாளர், விற்பனையாளர் அல்லது வாங்குபவராக' : 'As customer, seller, or buyer' },
              { step: '02', title: lang === 'si' ? 'ව්‍යාපාරය ආරම්භ කරන්න' : lang === 'ta' ? 'வணிகம் தொடங்குங்கள்' : 'Start Business', desc: lang === 'si' ? 'නිෂ්පාදන list කරන්න, orders ගන්න' : lang === 'ta' ? 'தயாரிப்புகளை பட்டியலிடுங்கள்' : 'List products, accept orders' },
              { step: '03', title: lang === 'si' ? 'ලාභ උපයන්න' : lang === 'ta' ? 'லாபம் சம்பாதியுங்கள்' : 'Earn Profits', desc: lang === 'si' ? 'ස්වයංක්‍රීය ලාභ % ගණනය' : lang === 'ta' ? 'தானியங்கி லாப கணக்கீடு' : 'Automatic profit % calculation' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
                className="relative glass rounded-2xl p-8 text-center card-3d">
                <div className="text-6xl font-black text-indigo-500/30 mb-4">{s.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto glass rounded-3xl p-16 text-center neon-border">
          <h2 className="text-4xl font-black gradient-text mb-6">
            {lang === 'si' ? 'අද ම ආරම්භ කරන්න!' : lang === 'ta' ? 'இன்றே தொடங்குங்கள்!' : 'Start Today!'}
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            {lang === 'si' ? 'Galaxy Mart සමඟ ඔබේ ව්‍යාපාරය ගොඩනගන්න' : lang === 'ta' ? 'கேலக்ஸி மார்ட்டுடன் உங்கள் வணிகத்தை கட்டியெழுப்புங்கள்' : 'Build your business with Galaxy Mart'}
          </p>
          <Link href="/register" className="btn-primary text-white text-xl inline-flex items-center gap-2">
            <Package className="w-6 h-6" />
            {lang === 'si' ? 'இப்போது சேருங்கள்' : lang === 'ta' ? 'இப்போது சேரும்' : 'Join Now'}
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-indigo-500/20">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p className="gradient-text font-bold text-lg mb-2">Galaxy Mart | Tagla Market</p>
          <p className="text-sm">© 2024 Galaxy Workers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
