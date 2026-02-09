import React, { useState, useEffect } from 'react';
import { 
  Palette, Layout, Type, MousePointer, 
  CheckCircle, Award, AlertCircle, RefreshCcw, 
  Monitor, Box, Layers, Grid
} from 'lucide-react';

// --- DATA KLIEN (SOAL) ---
const CLIENT_BRIEFS = [
  {
    id: 1,
    clientName: "Kapten Robby",
    avatar: "🤖",
    company: "Toko Robot Masa Depan",
    request: "Buatkan website yang CANGGIH! Saya mau latar belakang gelap dengan corak kotak-kotak (Grid). Garis tepinya harus tebal dan warnanya neon (Cyan/Hijau). Sudut kotak jangan bulat, harus tajam!",
    targets: { 
      theme: 'dark', 
      pattern: 'grid', 
      radius: 'sharp', 
      border: 'thick', 
      mood: 'tech' 
    }
  },
  {
    id: 2,
    clientName: "Putri Donat",
    avatar: "🍩",
    company: "Kerajaan Manis",
    request: "Saya suka warna PINK atau KUNING! Website harus terlihat lembut. Gunakan font tulisan tangan, sudut kotak yang sangat bulat, dan berikan bayangan yang tebal agar terlihat timbul.",
    targets: { 
      theme: 'fun', 
      pattern: 'dots', 
      radius: 'rounded', 
      border: 'none', 
      mood: 'cute' 
    }
  },
  {
    id: 3,
    clientName: "Profesor Alam",
    avatar: "🌿",
    company: "Hutan Lindung",
    request: "Website yang tenang. Gunakan warna HIJAU atau PUTIH. Saya tidak suka garis putus-putus. Font harus yang resmi (Serif). Buat transparansi sedikit agar menyatu dengan alam.",
    targets: { 
      theme: 'nature', 
      pattern: 'none', 
      radius: 'medium', 
      border: 'thin', 
      mood: 'calm' 
    }
  }
];

// --- PILIHAN OPSI ---
const PATTERNS = [
  { label: 'Polos', value: 'none' },
  { label: 'Titik-titik', value: 'dots' },
  { label: 'Kotak Grid', value: 'grid' },
  { label: 'Garis Miring', value: 'lines' },
];

const FONTS = [
  { label: 'Modern (Sans)', value: 'font-sans' },
  { label: 'Resmi (Serif)', value: 'font-serif' },
  { label: 'Kode (Mono)', value: 'font-mono' },
  { label: 'Tulisan Tangan', value: 'font-hand' }, // Custom class logic below
];

const BORDER_STYLES = [
  { label: 'Garis Lurus', value: 'solid' },
  { label: 'Putus-putus', value: 'dashed' },
  { label: 'Titik-titik', value: 'dotted' },
  { label: 'Ganda', value: 'double' },
];

const ANIMATIONS = [
  { label: 'Diam', value: 'none' },
  { label: 'Muncul (Fade)', value: 'fade-in' },
  { label: 'Melompat (Bounce)', value: 'bounce' },
  { label: 'Geser (Slide)', value: 'slide-up' },
  { label: 'Berputar (Spin)', value: 'spin' },
];

export default function App() {
  const [currentBriefIndex, setCurrentBriefIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [scoreData, setScoreData] = useState({ score: 0, feedback: [] });

  // --- 20 FITUR CONFIGURABLE ---
  const [config, setConfig] = useState({
    // KELOMPOK 1: LATAR BELAKANG (5 Fitur)
    1: '#f3f4f6',      // bgColor
    2: 'none',         // bgPattern
    3: 'center',       // layoutAlign (left/center/right)
    4: 40,             // pagePadding
    5: 100,            // bgOpacity

    // KELOMPOK 2: WADAH KONTEN (5 Fitur)
    6: 80,             // containerWidth (%)
    7: '#ffffff',      // cardColor
    8: 100,            // cardOpacity
    9: 'lg',           // shadow (none, sm, lg, xl)
    10: 16,            // borderRadius (px)

    // KELOMPOK 3: GARIS & DEKORASI (5 Fitur)
    11: 2,             // borderWidth
    12: '#e5e7eb',     // borderColor
    13: 'solid',       // borderStyle
    14: 0,             // rotation (deg)
    15: '0px',         // blurEffect

    // KELOMPOK 4: TEKS & TOMBOL (5 Fitur)
    16: 'font-sans',   // fontFamily
    17: '#1f2937',     // textColor
    18: 24,            // titleSize
    19: '#3b82f6',     // btnColor
    20: 'none'         // animation
  });

  const activeBrief = CLIENT_BRIEFS[currentBriefIndex];

  const updateConfig = (id, value) => {
    setConfig(prev => ({ ...prev, [id]: value }));
  };

  // --- LOGIKA PENILAIAN ---
  const calculateScore = () => {
    let points = 0;
    let feedback = [];
    const t = activeBrief.targets;

    // 1. Cek Warna & Mood (Config 1 & 7 & 19)
    const colors = [config[1], config[7], config[19]];
    const isDark = ['#000000', '#1a202c', '#374151'].some(c => colors.includes(c));
    const isPink = ['#fbcfe8', '#db2777', '#f472b6'].some(c => colors.includes(c));
    const isGreen = ['#dcfce7', '#16a34a', '#22c55e'].some(c => colors.includes(c));
    const isNeon = ['#06b6d4', '#22d3ee', '#bef264'].some(c => colors.includes(c));

    if (t.mood === 'tech') {
      if (isDark) { points += 20; feedback.push("✅ Warna gelap sangat futuristik!"); }
      else { feedback.push("⚠️ Klien minta tema canggih (gelap), tapi terlalu terang."); }
    } else if (t.mood === 'cute') {
      if (isPink) { points += 20; feedback.push("✅ Warna Pink/Kuning sangat manis!"); }
      else { feedback.push("⚠️ Kurang ceria warnanya."); }
    } else if (t.mood === 'calm') {
      if (isGreen || config[1] === '#ffffff') { points += 20; feedback.push("✅ Warna alam menenangkan."); }
    }

    // 2. Cek Pola (Config 2)
    if (t.pattern === 'grid' && config[2] === 'grid') { points += 10; feedback.push("✅ Pola Grid cocok untuk robot."); }
    else if (t.pattern === 'dots' && config[2] === 'dots') { points += 10; feedback.push("✅ Pola titik-titik lucu."); }
    else if (t.pattern === 'none' && config[2] === 'none') { points += 10; feedback.push("✅ Polos dan bersih."); }
    else if (t.pattern !== 'none' && config[2] === 'none') { points += 5; } // Partial

    // 3. Cek Sudut (Config 10)
    const radius = parseInt(config[10]);
    if (t.radius === 'sharp' && radius === 0) points += 15;
    else if (t.radius === 'rounded' && radius >= 20) points += 15;
    else if (t.radius === 'medium' && radius > 0 && radius < 20) points += 15;
    else feedback.push(`⚠️ Sudut kotak ${t.radius === 'sharp' ? 'harus tajam (0)' : 'harus bulat'}.`);

    // 4. Cek Garis (Config 11 & 13)
    if (t.border === 'thick' && config[11] >= 4) points += 15;
    else if (t.border === 'none' && config[11] === 0) points += 15;
    else if (t.border === 'thin' && config[11] > 0 && config[11] < 4) points += 15;
    
    // 5. Cek Font (Config 16)
    if (t.mood === 'tech' && config[16] === 'font-mono') points += 10;
    else if (t.mood === 'cute' && config[16] === 'font-hand') points += 10;
    else if (t.mood === 'calm' && config[16] === 'font-serif') points += 10;
    else points += 5; // Bonus usaha

    // 6. Keterbacaan (Kontras)
    if (config[1] === config[17] || config[7] === config[17]) {
      points -= 20;
      feedback.push("❌ Teks tidak terbaca! Warnanya sama dengan latar.");
    } else {
      points += 30; // Bonus dasar
    }

    if (points > 100) points = 100;
    setScoreData({ score: points, feedback });
    setShowScore(true);
  };

  const nextBrief = () => {
    setShowScore(false);
    setCurrentBriefIndex((prev) => (prev + 1) % CLIENT_BRIEFS.length);
    // Reset defaults
    setConfig({ ...config, 1: '#ffffff', 2: 'none', 16: 'font-sans' });
  };

  // Helper untuk input warna
  const ColorPicker = ({ id, label }) => (
    <div className="mb-2">
      <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
      <div className="flex flex-wrap gap-1">
        {['#ffffff', '#000000', '#1f2937', '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#db2777'].map(c => (
          <button
            key={c}
            onClick={() => updateConfig(id, c)}
            className={`w-5 h-5 rounded-full border border-gray-300 ${config[id] === c ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-100 flex flex-col md:flex-row font-sans overflow-hidden text-gray-800">
      
      {/* --- SIDEBAR PANEL (20 FITUR) --- */}
      <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full shadow-xl z-20">
        <div className="p-3 bg-blue-600 text-white flex items-center justify-between shadow-md shrink-0">
          <h1 className="font-bold flex items-center gap-2 text-sm"><Layers size={18} /> Editor Desain</h1>
          <span className="text-[10px] bg-blue-800 px-2 py-0.5 rounded-full">20 Fitur</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          
          {/* GRUP 1: LATAR BELAKANG */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <h3 className="font-bold text-blue-600 text-xs uppercase mb-3 flex items-center gap-1">
              <Grid size={14}/> 1. Latar Belakang
            </h3>
            
            <ColorPicker id={1} label="1. Warna Latar" />
            
            <div className="mb-3">
              <label className="text-xs font-semibold text-gray-500">2. Corak / Pola</label>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {PATTERNS.map(p => (
                  <button key={p.value} onClick={() => updateConfig(2, p.value)}
                    className={`text-xs p-1 border rounded ${config[2]===p.value ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs font-semibold text-gray-500">3. Perataan Halaman</label>
              <div className="flex bg-gray-200 rounded p-0.5 mt-1">
                {['left', 'center', 'right'].map(a => (
                  <button key={a} onClick={() => updateConfig(3, a)} className={`flex-1 capitalize text-xs py-1 rounded ${config[3]===a ? 'bg-white shadow' : 'text-gray-500'}`}>{a}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-semibold text-gray-500">4. Padding</label>
                <input type="range" min="0" max="100" value={config[4]} onChange={e => updateConfig(4, e.target.value)} className="w-full h-1 bg-gray-300 rounded appearance-none" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500">5. Gelap/Terang</label>
                <input type="range" min="20" max="100" value={config[5]} onChange={e => updateConfig(5, e.target.value)} className="w-full h-1 bg-gray-300 rounded appearance-none" />
              </div>
            </div>
          </div>

          {/* GRUP 2: WADAH KONTEN */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <h3 className="font-bold text-blue-600 text-xs uppercase mb-3 flex items-center gap-1">
              <Box size={14}/> 2. Wadah Konten
            </h3>

            <div className="mb-3">
              <label className="text-xs font-semibold text-gray-500 block">6. Lebar Kotak ({config[6]}%)</label>
              <input type="range" min="30" max="100" value={config[6]} onChange={e => updateConfig(6, e.target.value)} className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer" />
            </div>

            <ColorPicker id={7} label="7. Warna Kotak" />

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-[10px] font-semibold text-gray-500">8. Transparansi</label>
                <input type="range" min="0" max="100" value={config[8]} onChange={e => updateConfig(8, e.target.value)} className="w-full" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500">10. Sudut (Radius)</label>
                <input type="number" value={config[10]} onChange={e => updateConfig(10, e.target.value)} className="w-full border rounded p-1 text-xs" />
              </div>
            </div>

            <div className="mb-1">
              <label className="text-xs font-semibold text-gray-500">9. Bayangan</label>
              <select value={config[9]} onChange={e => updateConfig(9, e.target.value)} className="w-full text-xs border rounded p-1">
                <option value="none">Tidak Ada</option>
                <option value="sm">Tipis</option>
                <option value="lg">Sedang</option>
                <option value="2xl">Tebal & Luas</option>
              </select>
            </div>
          </div>

          {/* GRUP 3: GARIS & DEKORASI */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <h3 className="font-bold text-blue-600 text-xs uppercase mb-3 flex items-center gap-1">
              <Layout size={14}/> 3. Garis Tepi
            </h3>
            
            <div className="flex gap-2 mb-3">
              <div className="flex-1">
                <label className="text-[10px] text-gray-500 font-bold">11. Tebal</label>
                <input type="number" min="0" max="20" value={config[11]} onChange={e => updateConfig(11, e.target.value)} className="w-full border rounded p-1 text-xs" />
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-gray-500 font-bold">14. Putar (Deg)</label>
                <input type="number" min="-180" max="180" value={config[14]} onChange={e => updateConfig(14, e.target.value)} className="w-full border rounded p-1 text-xs" />
              </div>
            </div>

            <ColorPicker id={12} label="12. Warna Garis" />

            <div className="mb-2">
              <label className="text-xs font-semibold text-gray-500">13. Gaya Garis</label>
              <select value={config[13]} onChange={e => updateConfig(13, e.target.value)} className="w-full text-xs border rounded p-1 mt-1">
                {BORDER_STYLES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>

            <div className="mt-2">
              <label className="text-xs font-semibold text-gray-500 flex justify-between">15. Efek Blur <span>{config[15]}</span></label>
              <input type="range" min="0" max="20" value={parseInt(config[15])} onChange={e => updateConfig(15, `${e.target.value}px`)} className="w-full h-1 bg-gray-300" />
            </div>
          </div>

          {/* GRUP 4: KONTEN */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <h3 className="font-bold text-blue-600 text-xs uppercase mb-3 flex items-center gap-1">
              <Type size={14}/> 4. Teks & Animasi
            </h3>

            <div className="mb-2">
              <label className="text-xs font-semibold text-gray-500">16. Jenis Font</label>
              <select value={config[16]} onChange={e => updateConfig(16, e.target.value)} className="w-full text-xs border rounded p-1">
                {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>

            <ColorPicker id={17} label="17. Warna Teks" />
            <ColorPicker id={19} label="19. Warna Tombol" />

            <div className="mb-2">
               <label className="text-xs font-semibold text-gray-500">18. Ukuran Judul</label>
               <input type="range" min="16" max="60" value={config[18]} onChange={e => updateConfig(18, e.target.value)} className="w-full h-1 bg-gray-300" />
            </div>

            <div className="mb-1">
              <label className="text-xs font-semibold text-gray-500">20. Animasi Masuk</label>
              <select value={config[20]} onChange={e => updateConfig(20, e.target.value)} className="w-full text-xs border rounded p-1 bg-yellow-50 border-yellow-200">
                {ANIMATIONS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
            </div>
          </div>

          <div className="h-20"></div>
        </div>
      </div>

      {/* --- AREA UTAMA (PREVIEW) --- */}
      <div className="flex-1 flex flex-col relative bg-gray-100 h-full overflow-hidden">
        
        {/* HEADER KLIEN */}
        <div className="bg-white p-3 shadow-sm border-b z-10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-3xl bg-blue-50 p-2 rounded-full">{activeBrief.avatar}</div>
            <div>
              <h2 className="font-bold text-gray-800 text-sm">{activeBrief.clientName}</h2>
              <div className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600 inline-block mt-0.5">{activeBrief.company}</div>
            </div>
          </div>
          <div className="flex-1 mx-4 bg-yellow-50 border-l-4 border-yellow-400 p-2 text-xs text-gray-700 italic hidden md:block">
            "{activeBrief.request}"
          </div>
          <button onClick={calculateScore} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow text-sm flex items-center gap-2 transition-transform hover:scale-105">
            <CheckCircle size={16} /> Kirim
          </button>
        </div>

        {/* CANVAS PREVIEW */}
        <div 
          className="flex-1 overflow-auto flex relative transition-all duration-500"
          style={{ 
            backgroundColor: config[1],
            backgroundImage: config[2] === 'dots' ? 'radial-gradient(#cbd5e1 1px, transparent 1px)' : 
                             config[2] === 'grid' ? 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)' : 
                             config[2] === 'lines' ? 'repeating-linear-gradient(45deg, #cbd5e1 0, #cbd5e1 1px, transparent 0, transparent 50%)' : 'none',
            backgroundSize: config[2] === 'grid' ? '20px 20px' : config[2] === 'dots' ? '20px 20px' : '10px 10px',
            justifyContent: config[3] === 'center' ? 'center' : config[3] === 'right' ? 'flex-end' : 'flex-start',
            alignItems: 'center',
            padding: `${config[4]}px`,
            filter: `brightness(${config[5]}%)`
          }}
        >
          {/* WEBSITE SISWA */}
          <div 
            className={`transition-all duration-500 flex flex-col relative
              ${config[20] === 'bounce' ? 'animate-bounce' : ''}
              ${config[20] === 'spin' ? 'animate-spin' : ''}
              ${config[20] === 'fade-in' ? 'animate-[pulse_1s_ease-in-out]' : ''}
            `}
            style={{
              width: `${config[6]}%`,
              minHeight: '300px',
              backgroundColor: config[7],
              opacity: config[8] / 100,
              boxShadow: config[9] === 'none' ? 'none' : config[9] === 'sm' ? '0 1px 3px rgba(0,0,0,0.1)' : config[9] === 'lg' ? '0 10px 15px rgba(0,0,0,0.2)' : '0 25px 50px rgba(0,0,0,0.35)',
              borderRadius: `${config[10]}px`,
              borderWidth: `${config[11]}px`,
              borderColor: config[12],
              borderStyle: config[13],
              transform: `rotate(${config[14]}deg)`,
              backdropFilter: `blur(${config[15]})`,
              padding: '40px'
            }}
          >
            {/* Header Konten */}
            <div className="flex items-center justify-between mb-8 border-b pb-4" style={{ borderColor: `${config[12]}40` }}>
              <div className="text-2xl">{activeBrief.avatar}</div>
              <div className={`text-sm font-bold uppercase tracking-widest ${config[16]}`} style={{ color: config[17] }}>Menu</div>
            </div>

            {/* Isi Konten */}
            <h1 
              className={`font-bold mb-4 leading-tight ${config[16] === 'font-hand' ? 'italic' : ''} ${config[16]}`}
              style={{ color: config[17], fontSize: `${config[18]}px` }}
            >
              Selamat Datang di<br/>{activeBrief.company}
            </h1>
            
            <p className={`mb-8 opacity-80 leading-relaxed ${config[16]}`} style={{ color: config[17] }}>
              Kami menyediakan solusi terbaik untuk kebutuhan Anda. Kualitas nomor satu, desain futuristik, dan pelayanan ramah adalah prioritas kami.
            </p>

            {/* Tombol */}
            <button
              className={`px-6 py-3 font-bold transition-transform hover:-translate-y-1 active:scale-95 ${config[16]}`}
              style={{
                backgroundColor: config[19],
                color: '#ffffff',
                borderRadius: `${config[10] / 2}px`, // Radius tombol setengah dari kotak
                border: 'none',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              Mulai Sekarang &rarr;
            </button>

             {/* Footer Dummy */}
             <div className="mt-auto pt-8 text-xs opacity-40 text-center" style={{ color: config[17] }}>
               &copy; 2024 Didesain oleh Siswa Kelas 6
             </div>
          </div>
        </div>
      </div>

      {/* --- MODAL HASIL --- */}
      {showScore && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
            <div className={`h-32 flex items-center justify-center ${scoreData.score >= 80 ? 'bg-green-500' : 'bg-orange-500'}`}>
              {scoreData.score >= 80 ? <Award size={80} className="text-white drop-shadow-lg" /> : <AlertCircle size={80} className="text-white/90" />}
            </div>
            
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{scoreData.score >= 80 ? "Hebat Sekali!" : "Coba Lagi Yuk!"}</h2>
              <div className="text-5xl font-black text-gray-800 mb-4">{scoreData.score}<span className="text-lg text-gray-400 font-medium">/100</span></div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left border border-gray-100 max-h-48 overflow-y-auto">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Catatan Klien:</p>
                <ul className="space-y-2 text-sm">
                  {scoreData.feedback.map((fb, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span>{fb}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowScore(false)} className="flex-1 py-3 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50">Perbaiki</button>
                <button onClick={nextBrief} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 flex justify-center items-center gap-2">
                  <RefreshCcw size={18} /> Tantangan Baru
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
