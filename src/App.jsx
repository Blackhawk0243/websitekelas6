import React, { useState } from 'react';
import { 
  Palette, Type, Layout, MousePointer, 
  CheckCircle, Award, AlertCircle, RefreshCcw, LayoutTemplate
} from 'lucide-react';

const CLIENT_BRIEFS = [
  {
    id: 1,
    clientName: "Kapten Robby",
    avatar: "🤖",
    company: "Toko Robot Masa Depan",
    request: "Saya butuh website yang terlihat CANGGIH dan FUTURISTIK. Gunakan latar belakang gelap, tulisan besar, dan sudut kotak yang tajam. Jangan pakai warna pink!",
    targets: { theme: 'dark', fontStyle: 'mono', borderRadius: 'sharp', primaryColor: 'cyan', mood: 'tech' }
  },
  {
    id: 2,
    clientName: "Putri Donat",
    avatar: "🍩",
    company: "Dunia Manis Donat",
    request: "Buatkan website yang LUCU dan CERIA! Saya suka warna pink atau kuning. Sudut-sudut tombolnya harus bulat biar tidak tajam. Tulisannya harus santai.",
    targets: { theme: 'light', fontStyle: 'handwriting', borderRadius: 'rounded', primaryColor: 'pink', mood: 'fun' }
  },
  {
    id: 3,
    clientName: "Profesor Alam",
    avatar: "🌿",
    company: "Taman Hutan Kota",
    request: "Website harus terlihat TENANG dan ALAMI. Gunakan warna hijau. Saya tidak suka animasi yang berlebihan. Tulisannya harus rapi dan mudah dibaca.",
    targets: { theme: 'nature', fontStyle: 'serif', borderRadius: 'medium', primaryColor: 'green', mood: 'calm' }
  }
];

const FONTS = [
  { label: 'Standar (Sans)', value: 'font-sans' },
  { label: 'Klasik (Serif)', value: 'font-serif' },
  { label: 'Koding (Mono)', value: 'font-mono' },
];

const COLORS = [
  { label: 'Hitam Gelap', value: '#1a202c', type: 'dark' },
  { label: 'Putih Bersih', value: '#ffffff', type: 'light' },
  { label: 'Pink Neon', value: '#f687b3', type: 'fun' },
  { label: 'Biru Langit', value: '#63b3ed', type: 'calm' },
  { label: 'Hijau Hutan', value: '#48bb78', type: 'nature' },
  { label: 'Ungu Misterius', value: '#9f7aea', type: 'tech' },
  { label: 'Kuning Ceria', value: '#f6e05e', type: 'fun' },
  { label: 'Cyan Cyber', value: '#0bc5ea', type: 'tech' },
];

const BORDERS = [
  { label: 'Kotak Tajam', value: '0px', type: 'sharp' },
  { label: 'Sedikit Melengkung', value: '8px', type: 'medium' },
  { label: 'Sangat Bulat', value: '24px', type: 'rounded' },
  { label: 'Lonjong (Pill)', value: '9999px', type: 'rounded' },
];

export default function App() {
  const [currentBriefIndex, setCurrentBriefIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [scoreData, setScoreData] = useState({ score: 0, feedback: [] });

  const [config, setConfig] = useState({
    bgColor: '#ffffff', textColor: '#000000', alignment: 'center', containerWidth: '80%',
    fontFamily: 'font-sans', titleSize: 40, descSize: 16, lineHeight: 1.5,
    cardColor: '#f7fafc', cardBorderWidth: 2, cardBorderColor: '#cbd5e0', cardShadow: 'none', cardRadius: '8px',
    btnText: 'Klik Saya!', btnColor: '#3182ce', btnTextColor: '#ffffff', btnRadius: '4px',
    opacity: 100, rotation: 0, animation: 'none', showImage: true,
  });

  const activeBrief = CLIENT_BRIEFS[currentBriefIndex];

  const updateConfig = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  const calculateScore = () => {
    let points = 0;
    let feedback = [];
    const target = activeBrief.targets;

    if (target.mood === 'tech' && ['#1a202c', '#000000'].includes(config.bgColor)) points += 20;
    else if (target.mood === 'fun' && ['#f687b3', '#f6e05e', '#ffffff'].includes(config.bgColor)) points += 20;
    else if (target.mood === 'calm' && ['#ffffff', '#e2e8f0'].includes(config.bgColor)) points += 20;
    else if (target.mood === 'nature' && ['#ffffff', '#f0fff4'].includes(config.bgColor)) points += 20;
    else points += 5;

    if (target.fontStyle === 'mono' && config.fontFamily === 'font-mono') { points += 15; feedback.push("✅ Font canggih!"); }
    else if (target.fontStyle === 'handwriting' && config.fontFamily === 'font-sans') { points += 10; feedback.push("✅ Font cukup santai."); }
    else if (target.fontStyle === 'serif' && config.fontFamily === 'font-serif') { points += 15; feedback.push("✅ Font elegan."); }
    else feedback.push("⚠️ Font kurang cocok.");

    if (target.borderRadius === 'sharp' && config.cardRadius === '0px') points += 15;
    else if (target.borderRadius === 'rounded' && parseInt(config.cardRadius) > 10) points += 15;
    else if (target.borderRadius === 'medium' && parseInt(config.cardRadius) > 0 && parseInt(config.cardRadius) <= 10) points += 15;
    else feedback.push(`⚠️ Sudut ${target.borderRadius === 'sharp' ? 'harus tajam' : 'harus bulat'}.`);

    if (target.primaryColor === 'pink' && (config.btnColor === '#f687b3' || config.titleColor === '#f687b3')) points += 20;
    else if (target.primaryColor === 'cyan' && (config.btnColor === '#0bc5ea' || config.titleColor === '#0bc5ea')) points += 20;
    else if (target.primaryColor === 'green' && config.btnColor === '#48bb78') points += 20;
    else points += 5;

    if (config.bgColor === config.textColor) { points -= 20; feedback.push("❌ Teks tidak terbaca!"); }
    else points += 10;

    if (points > 100) points = 100;
    if (points < 0) points = 0;

    setScoreData({ score: points, feedback });
    setShowScore(true);
  };

  const nextBrief = () => {
    setShowScore(false);
    setCurrentBriefIndex((prev) => (prev + 1) % CLIENT_BRIEFS.length);
    setConfig(prev => ({ ...prev, bgColor: '#ffffff', fontFamily: 'font-sans' }));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col h-screen shadow-xl z-10 overflow-y-auto">
        <div className="p-4 bg-indigo-600 text-white flex justify-between items-center sticky top-0 z-20">
          <h1 className="font-bold text-xl flex items-center gap-2"><Palette size={20} /> Studio Desain</h1>
          <span className="text-xs bg-indigo-500 px-2 py-1 rounded">Level 6 SD</span>
        </div>
        <div className="p-4 space-y-6">
          {/* Controls */}
          <div className="space-y-3">
            <h3 className="font-bold text-indigo-600 flex items-center gap-2 text-sm uppercase"><LayoutTemplate size={16} /> 1. Dasar Halaman</h3>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button key={c.value} onClick={() => updateConfig('bgColor', c.value)} title={c.label}
                  className={`w-8 h-8 rounded-full border-2 ${config.bgColor === c.value ? 'border-indigo-600 scale-110' : 'border-gray-200'}`} style={{ backgroundColor: c.value }} />
              ))}
            </div>
            <div className="flex bg-gray-100 rounded p-1">
              {['left', 'center', 'right'].map((align) => (
                <button key={align} onClick={() => updateConfig('alignment', align)} className={`flex-1 py-1 text-xs capitalize rounded ${config.alignment === align ? 'bg-white shadow text-indigo-600 font-bold' : 'text-gray-500'}`}>{align}</button>
              ))}
            </div>
          </div>
          <hr />
          <div className="space-y-3">
            <h3 className="font-bold text-indigo-600 flex items-center gap-2 text-sm uppercase"><Layout size={16} /> 2. Kotak Konten</h3>
            <input type="range" min="30" max="100" value={parseInt(config.containerWidth)} onChange={(e) => updateConfig('containerWidth', `${e.target.value}%`)} className="w-full" />
            <div className="flex gap-2">
               <input type="color" value={config.cardColor} onChange={(e) => updateConfig('cardColor', e.target.value)} className="h-8 w-1/2 cursor-pointer" />
               <select className="w-1/2 text-sm border rounded" value={config.cardRadius} onChange={(e) => updateConfig('cardRadius', e.target.value)}>
                {BORDERS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>
          </div>
          <hr />
          <div className="space-y-3">
            <h3 className="font-bold text-indigo-600 flex items-center gap-2 text-sm uppercase"><Type size={16} /> 3. Tulisan</h3>
            <select className="w-full p-2 text-sm border rounded" value={config.fontFamily} onChange={(e) => updateConfig('fontFamily', e.target.value)}>
                {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <input type="color" value={config.textColor} onChange={(e) => updateConfig('textColor', e.target.value)} className="w-full h-8 cursor-pointer" />
          </div>
          <hr />
          <div className="space-y-3">
            <h3 className="font-bold text-indigo-600 flex items-center gap-2 text-sm uppercase"><MousePointer size={16} /> 4. Tombol</h3>
            <input type="text" value={config.btnText} onChange={(e) => updateConfig('btnText', e.target.value)} className="w-full p-2 border rounded text-sm" />
            <div className="flex flex-wrap gap-2">{COLORS.map((c) => (<button key={c.value} onClick={() => updateConfig('btnColor', c.value)} className={`w-6 h-6 rounded border ${config.btnColor === c.value ? 'ring-2 ring-indigo-500' : 'border-gray-200'}`} style={{ backgroundColor: c.value }} />))}</div>
            <select className="w-full p-2 text-sm border rounded" value={config.animation} onChange={(e) => updateConfig('animation', e.target.value)}>
              <option value="none">Diam</option><option value="bounce">Melompat</option><option value="pulse">Berdenyut</option><option value="spin">Berputar</option>
            </select>
          </div>
          <div className="h-20"></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-gray-50">
        <div className="bg-white p-4 shadow-sm border-b flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-4">
            <div className="text-4xl bg-gray-100 p-2 rounded-full">{activeBrief.avatar}</div>
            <div><h2 className="font-bold text-lg">{activeBrief.clientName}</h2><p className="text-sm text-gray-600">{activeBrief.company}</p></div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 p-2 rounded text-sm text-yellow-800 italic flex-1 mx-2">"{activeBrief.request}"</div>
          <button onClick={calculateScore} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold shadow flex items-center gap-2"><CheckCircle size={20} /> Kirim</button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: config.bgColor }}>
          <div className={`transition-all duration-300 flex flex-col relative overflow-hidden ${config.animation === 'bounce' ? 'animate-bounce' : ''} ${config.animation === 'pulse' ? 'animate-pulse' : ''} ${config.animation === 'spin' ? 'animate-spin' : ''}`}
            style={{ width: config.containerWidth, backgroundColor: config.cardColor, borderWidth: `${config.cardBorderWidth}px`, borderColor: config.cardBorderColor, borderRadius: config.cardRadius, padding: '40px', textAlign: config.alignment, boxShadow: config.cardShadow === 'none' ? 'none' : '0 10px 15px rgba(0,0,0,0.1)', opacity: config.opacity / 100, transform: `rotate(${config.rotation}deg)` }}>
            {config.showImage && <div className="mb-6 text-6xl select-none filter drop-shadow-md">{activeBrief.avatar}</div>}
            <h1 className={`${config.fontFamily} font-bold mb-4`} style={{ color: config.textColor, fontSize: `${config.titleSize}px`, lineHeight: 1.2 }}>Selamat Datang di {activeBrief.company}</h1>
            <p className={`${config.fontFamily} mb-8`} style={{ color: config.textColor, fontSize: `${config.descSize}px`, lineHeight: config.lineHeight, opacity: 0.8 }}>Kami menyediakan layanan terbaik. Ini adalah contoh tampilan website yang sedang didesain oleh siswa kelas 6.</p>
            <div className={`flex ${config.alignment === 'center' ? 'justify-center' : config.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
              <button style={{ backgroundColor: config.btnColor, color: config.btnTextColor, borderRadius: config.btnRadius, padding: '12px 24px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} className="hover:opacity-90 transform transition hover:-translate-y-1">{config.btnText}</button>
            </div>
            <div className="mt-12 pt-4 border-t border-gray-300/30 text-xs opacity-50" style={{ color: config.textColor }}>&copy; 2024 {activeBrief.company}. Didesain oleh Tim Siswa.</div>
          </div>
        </div>
      </div>

      {showScore && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-in zoom-in duration-300">
            <div className="mb-4 flex justify-center">{scoreData.score >= 80 ? <Award size={64} className="text-yellow-500" /> : <AlertCircle size={64} className="text-orange-500" />}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{scoreData.score >= 80 ? "Luar Biasa!" : "Sedikit Lagi!"}</h2>
            <div className="text-6xl font-black text-indigo-600 mb-4 font-mono">{scoreData.score}<span className="text-xl text-gray-400 font-normal">/100</span></div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left text-sm text-gray-700 max-h-40 overflow-y-auto border">
              <p className="font-bold mb-2 text-gray-500 uppercase text-xs">Masukan Klien:</p>
              {scoreData.feedback.length > 0 ? <ul className="space-y-2">{scoreData.feedback.map((fb, idx) => <li key={idx}><span>{fb}</span></li>)}</ul> : <p className="text-green-600">Sempurna! Tidak ada komplain.</p>}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowScore(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Edit Lagi</button>
              <button onClick={nextBrief} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 flex justify-center items-center gap-2"><RefreshCcw size={16} /> Tantangan Baru</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
