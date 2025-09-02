import { useState, useEffect } from 'react';

const MathLessons = ({ activeLesson, setActiveLesson, isDarkMode, setView }) => {
  const lessons = [
    { id: 'v_adunari', title: 'Adunări și scăderi', category: 'Clasa a V-a' },
    { id: 'v_inmultiri', title: 'Înmulțiri și împărțiri', category: 'Clasa a V-a' },
    { id: 'vi_ecuatii', title: 'Ecuații simple', category: 'Clasa a VI-a' },
    { id: 'vi_geometrie', title: 'Geometrie de bază', category: 'Clasa a VI-a' },
  ];

  const groupedLessons = lessons.reduce((acc, lesson) => {
    const category = lesson.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(lesson);
    return acc;
  }, {});

  const sidebarClass = isDarkMode ? 'bg-gray-900/70 text-white' : 'bg-gray-100/70 text-gray-900';
  const lessonItemHoverClass = isDarkMode ? 'hover:bg-white/20' : 'hover:bg-gray-200';
  const lessonItemActiveClass = isDarkMode ? 'bg-white/20' : 'bg-gray-200';
  const categoryTitleClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className="flex flex-col md:flex-row w-full h-full rounded-none overflow-hidden backdrop-blur-md bg-white/5">
      {}
      <div className={`w-full md:w-64 p-4 overflow-y-auto flex-shrink-0 ${sidebarClass}`}>
        <button
          className={`w-full text-left font-bold text-sm hover:text-red-500 transition duration-200 mt-4 mb-4 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}
          onClick={() => {
            setView('loggedIn');
            setActiveLesson(null);
          }}
        >
          &lt; Înapoi la categorii
        </button>
        {Object.keys(groupedLessons).map(category => (
          <div key={category} className="mb-4">
            <h4 className={`uppercase text-xs font-semibold tracking-wider mb-2 ${categoryTitleClass}`}>
              {category}
            </h4>
            <ul className="space-y-1">
              {groupedLessons[category].map(lesson => (
                <li
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson.id)}
                  className={`py-2 px-3 rounded-md cursor-pointer transition-colors duration-200 ${lessonItemHoverClass} ${activeLesson === lesson.id ? lessonItemActiveClass : ''}`}
                >
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {}
      <div className={`flex-1 p-6 overflow-y-auto hidden md:block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <h3 className="text-3xl font-bold mb-4">Selectează o lecție</h3>
        <p>Alege o lecție din meniul din stânga pentru a o deschide în ecran complet.</p>
      </div>
    </div>
  );
};

const ChangePasswordModal = ({ isDarkMode, onClose, onPasswordChange, isLoading, isErrorAnimating }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordChange(currentPassword, newPassword);
  };

  const formTextClass = isDarkMode ? 'text-white' : 'text-gray-700';
  const inputClass = isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300';
  const modalBgClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';

  const buttonClass = isErrorAnimating
    ? 'bg-red-500 animate-shake'
    : 'bg-blue-500 hover:bg-blue-600';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/70 animate-expand-from-center`}>
      <div className={`relative p-8 rounded-3xl shadow-2xl w-full max-w-sm transform transition-transform duration-500 ${modalBgClass}`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-3xl font-bold transition-transform duration-300 transform hover:scale-125 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-4">Schimbă parola</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className={`block text-sm font-semibold mb-2 ${formTextClass}`} htmlFor="current-password">
              Parolă curentă
            </label>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Parolă curentă"
              className={`w-full py-2 px-3 rounded-md border ${inputClass}`}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              id="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showCurrentPassword ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z" : "M13.875 18.825A10.051 10.051 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7a9.954 9.954 0 012.378.36"} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showCurrentPassword ? "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7M16 12a4 4 0 11-8 0 4 4 0 018 0z"} />
                {!showCurrentPassword && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" />}
              </svg>
            </button>
          </div>
          <div className="relative">
            <label className={`block text-sm font-semibold mb-2 ${formTextClass}`} htmlFor="new-password">
              Parolă nouă
            </label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Parolă nouă"
              className={`w-full py-2 px-3 rounded-md border ${inputClass}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showNewPassword ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z" : "M13.875 18.825A10.051 10.051 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7a9.954 9.954 0 012.378.36"} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showNewPassword ? "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7M16 12a4 4 0 11-8 0 4 4 0 018 0z"} />
                {!showNewPassword && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" />}
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className={`w-full text-white font-bold py-3 px-6 rounded-full transition duration-200 transform hover:scale-105 shadow-lg ${buttonClass}`}
            disabled={isLoading}
          >
            {isLoading ? 'Se încarcă...' : 'Confirmă'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('login');
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [hasPremium, setHasPremium] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [isLogoGlowing, setIsLogoGlowing] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  
  const [message, setMessage] = useState('');

  const [isShakeAnimating, setIsShakeAnimating] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const storedMode = localStorage.getItem('isDarkMode');
      return storedMode === null ? true : JSON.parse(storedMode);
    } catch (error) {
      console.error("Failed to read from localStorage:", error);
      return true; 
    }
  });

  const apiEndpoint = 'http://localhost:5000/api/user';

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedPremium = localStorage.getItem('hasPremium');
    if (storedUser) {
      setCurrentUser(storedUser);
      setHasPremium(storedPremium === 'true');
      setView('loggedIn');
    }
  }, []);

  useEffect(() => {
    const scriptId = 'confetti-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.min.js';
      script.onload = () => {
        console.log("Confetti script loaded successfully!");
      };
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(''); 

    const normalizedUsername = formState.username.toLowerCase();

    if (view === 'register' && normalizedUsername === formState.password) {
      setIsShakeAnimating(true);
      setTimeout(() => setIsShakeAnimating(false), 1000);
      setIsLoading(false);
      setMessage('Numele de utilizator și parola nu pot fi identice.');
      return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: view,
          username: normalizedUsername,
          password: formState.password,
        }),
      });

      if (response.ok) {
        if (view === 'login') {
          const data = await response.json();
          setCurrentUser(normalizedUsername);
          setHasPremium(data.hasPremium);
          setView('loggedIn');
          localStorage.setItem('currentUser', normalizedUsername);
          localStorage.setItem('hasPremium', data.hasPremium);
          setMessage('Autentificare reușită!');
        } else {
          setMessage('Înregistrare reușită! Vă puteți autentifica acum.');
          setView('login');
        }
      } else {
        setIsShakeAnimating(true);
        setTimeout(() => setIsShakeAnimating(false), 1000);
        const errorData = await response.json();
        setMessage(`Eroare: ${errorData.error || 'A apărut o eroare necunoscută.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsShakeAnimating(true);
      setTimeout(() => setIsShakeAnimating(false), 1000);
      setMessage('A apărut o eroare de rețea.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setHasPremium(false);
    setFormState({ username: '', password: '' });
    setView('login');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('hasPremium');
    setMessage('Ai fost delogat cu succes.');
  };

  const handleBuyPremium = () => {
    setView('buyPremium');
  };

  const handleLogoClick = () => {
    if (currentUser) {
      setView('loggedIn');
      setActiveLesson(null);
    } else {
      setView('login');
    }

    setIsLogoGlowing(true);
    setTimeout(() => setIsLogoGlowing(false), 500); 
  };

  const getLessonContent = (id) => {
    switch (id) {
      case 'v_adunari':
        return (
          <div>
            <h3 className="text-3xl font-bold mb-4">Lecția: Adunări și scăderi</h3>
            <p>În această lecție vei învăța operațiile de bază: adunarea și scăderea. Vom explora tehnici rapide de calcul și probleme practice.</p>
          </div>
        );
      case 'v_inmultiri':
        return (
          <div>
            <h3 className="text-3xl font-bold mb-4">Lecția: Înmulțiri și împărțiri</h3>
            <p>Această lecție se concentrează pe înmulțire și împărțire. Vom exersa tabla înmulțirii și vom rezolva probleme cu numere mai mari.</p>
          </div>
        );
      case 'vi_ecuatii':
        return (
          <div>
            <h3 className="text-3xl font-bold mb-4">Lecția: Ecuații simple</h3>
            <p>Introducere în ecuații. Vei învăța cum să găsești valoarea unei necunoscute într-o ecuație simplă, pas cu pas.</p>
          </div>
        );
      case 'vi_geometrie':
        return (
          <div>
            <h3 className="text-3xl font-bold mb-4">Lecția: Geometrie de bază</h3>
            <p>Explorează formele și spațiul. Vom studia puncte, linii, unghiuri și figuri geometrice de bază, precum triunghiuri și cercuri.</p>
          </div>
        );
      default:
        return <div>Lecție indisponibilă.</div>;
    }
  };

  const renderBuyPremiumPage = () => {
    return (
      <div className={`flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl backdrop-blur-md w-full max-w-lg transition-all duration-500 transform scale-100 ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-100/50 text-gray-900'}`}>
        <h2 className="text-3xl font-bold mb-6 drop-shadow-md text-center">Achiziționează cont Premium</h2>
        <p className={`mb-8 text-center text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Pentru a avea acces la toate lecțiile, plătește o taxă unică de <strong>3 euro</strong> prin PayPal.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4">
          <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="hosted_button_id" value="UJLSGLHXK42W2" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
          </form>
          <button
            className={`mt-4 inline-block align-baseline font-bold text-sm hover:text-blue-500 transition duration-200 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
            onClick={() => setView('loggedIn')}
          >
            &lt; Înapoi la contul meu
          </button>
        </div>
      </div>
    );
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    setMessage(''); 

    if (currentPassword === newPassword) {
      setIsShakeAnimating(true);
      setTimeout(() => setIsShakeAnimating(false), 1000);
      setIsLoading(false);
      setMessage('Parola nouă nu poate fi aceeași cu parola curentă.');
      return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'changePassword',
          username: currentUser,
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        setShowChangePasswordModal(false);
        setMessage('Parola a fost schimbată cu succes!');
      } else {
        setIsShakeAnimating(true);
        setTimeout(() => setIsShakeAnimating(false), 1000);
        const errorData = await response.json();
        setMessage(`Eroare: ${errorData.error || 'Schimbarea parolei a eșuat.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsShakeAnimating(true);
      setTimeout(() => setIsShakeAnimating(false), 1000);
      setMessage('A apărut o eroare de rețea.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderAccountMenu = () => {
    return (
      <div className={`fixed inset-0 z-40 flex items-center justify-center p-4 backdrop-blur-md bg-black/70 transition-opacity duration-300 animate-expand-from-center`}>
        <div className={`relative p-8 rounded-3xl shadow-2xl w-full max-w-sm transform transition-transform duration-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <button
            onClick={() => setShowAccountModal(false)}
            className={`absolute top-4 right-4 text-3xl font-bold transition-transform duration-300 transform hover:scale-125 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            &times;
          </button>
          <h3 className="text-2xl font-bold mb-4 drop-shadow-md">Contul meu</h3>
          <div className="space-y-4 text-lg">
            <p><strong>Nume de utilizator:</strong> {currentUser}</p>
            <p><strong>Stare cont:</strong> {hasPremium ? 'Premium ✅' : 'Non-premium'}</p>
            <button
              onClick={() => {
                setShowChangePasswordModal(true);
                setIsShakeAnimating(false);
              }}
              className={`w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-200 transform hover:scale-105 shadow-lg`}
            >
              Schimbă parola
            </button>
            <button
              onClick={() => { handleLogout(); setShowAccountModal(false); }}
              className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 transform hover:scale-105 shadow-lg"
            >
              Delogare
            </button>
          </div>
        </div>
        {}
        {showChangePasswordModal && (
          <ChangePasswordModal
            isDarkMode={isDarkMode}
            onClose={() => setShowChangePasswordModal(false)}
            onPasswordChange={handleChangePassword}
            isLoading={isLoading}
            isErrorAnimating={isShakeAnimating}
          />
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (view === 'loggedIn' && currentUser) {
      if (hasPremium) {
        return (
          <div className={`flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl backdrop-blur-md w-full max-w-2xl transition-all duration-500 transform scale-100 ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-100/50 text-gray-900'}`}>
            <h2 className="text-3xl font-bold mb-6 drop-shadow-md text-center">Bun venit, {currentUser}!</h2>
            <p className={`mb-8 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Alege o categorie premium pentru a începe.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
              <div
                className={`flex-1 flex flex-col items-center p-6 rounded-2xl shadow-xl backdrop-blur-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-200/50 text-gray-900'}`}
                onClick={() => {
                  setView('mathLessons');
                }}
              >
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                <span className="text-xl font-semibold">MATEMATICĂ</span>
              </div>
              <div className={`flex-1 flex flex-col items-center p-6 rounded-2xl shadow-xl backdrop-blur-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-200/50 text-gray-900'}`}>
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673m-4.5-4.5v-2m9 2v-2m-4.5 4.5v-2m-9 2v-2"></path></svg>
                <span className="text-xl font-semibold">ROMÂNĂ</span>
              </div>
            </div>
            <button
              className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 transform hover:scale-105 shadow-lg"
              onClick={handleLogout}
            >
              Delogare
            </button>
          </div>
        );
      }

      return (
        <div className={`flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl backdrop-blur-md w-full max-w-md transition-all duration-500 transform scale-100 ${isDarkMode ? 'bg-white/5 text-white' : 'bg-gray-100/50 text-gray-900'}`}>
          <h2 className="text-3xl font-bold mb-6 drop-shadow-md text-center">Bun venit, {currentUser}!</h2>
          <p className={`mb-8 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Momentan nu ai acces premium.</p>
          <button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-2xl transition duration-200 transform hover:scale-105 shadow-lg"
            onClick={handleBuyPremium}
            disabled={isLoading}
          >
            Cumpără Premium
          </button>
          <button
            className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 transform hover:scale-105 shadow-lg"
            onClick={handleLogout}
          >
            Delogare
          </button>
        </div>
      );
    }

    if (view === 'mathLessons') {
      return <MathLessons activeLesson={activeLesson} setActiveLesson={setActiveLesson} isDarkMode={isDarkMode} setView={setView} />;
    }

    if (view === 'buyPremium') {
      return renderBuyPremiumPage();
    }

    const formTextClass = isDarkMode ? 'text-white' : 'text-gray-700';
    const buttonClass = isShakeAnimating ? 'bg-red-500 animate-shake' : 'bg-blue-500 hover:bg-blue-600';

    return (
      <div className={`backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-500 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100/50'}`}>
        <h2 className={`text-3xl font-bold mb-6 text-center drop-shadow-md ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {view === 'register' ? 'Crează un cont' : 'Autentificare'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-semibold mb-2 ${formTextClass}`} htmlFor="username">
              Nume de utilizator
            </label>
            <input
              className={`shadow appearance-none border-none rounded-xl w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${isDarkMode ? 'bg-white/30 text-white' : 'bg-white/70 text-gray-900'}`}
              id="username"
              name="username"
              type="text"
              placeholder="Introduceți numele de utilizator"
              value={formState.username}
              onChange={handleInputChange}
              required
            />
          </div>
          {}
          <div className="mb-6 relative">
            <label className={`block text-sm font-semibold mb-2 ${formTextClass}`} htmlFor="password">
              Parolă
            </label>
            <input
              className={`shadow appearance-none border-none rounded-xl w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${isDarkMode ? 'bg-white/30 text-white' : 'bg-white/70 text-gray-900'}`}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={formState.password}
              onChange={handleInputChange}
              required
            />
            {}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.051 10.051 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7a9.954 9.954 0 012.378.36" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <button
              className={`w-full sm:w-auto text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-200 transform hover:scale-105 ${buttonClass}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Se încarcă...' : (view === 'register' ? 'Înregistrare' : 'Autentificare')}
            </button>
            <button
              className={`w-full sm:w-auto inline-block align-baseline font-bold text-sm hover:text-blue-500 transition duration-200 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
              onClick={() => setView(view === 'register' ? 'login' : 'register')}
              type="button"
            >
              {view === 'register' ? 'Ai deja un cont? Autentifică-te' : 'Nu ai un cont? Înregistrează-te'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      try {
        localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
      return newMode;
    });
  };

  const handleToggleTheme = () => {
    toggleDarkMode();
    if (window.JSConfetti) {
      const jsConfetti = new window.JSConfetti();
      jsConfetti.addConfetti({
        confettiRadius: 6,
        confettiNumber: 250,
      });
    }
  };

  const logoText = view === 'mathLessons' ? 'INVATA SIMPLU - MATEMATICĂ' : 'INVATA SIMPLU';

  const containerBgClass = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const backgroundGradientClass = isDarkMode ? 'from-gray-900 to-indigo-900' : 'from-gray-200 to-indigo-200';
  const headerBgClass = isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50';
  const footerBgClass = isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50';
  const footerTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const currentDate = new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className={`min-h-screen relative flex flex-col overflow-hidden user-select-none ${containerBgClass}`}>
      <style>
        {`
          .user-select-none {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }
          @keyframes expand-from-center {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-expand-from-center {
            animation: expand-from-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          @keyframes glow-dark {
            0% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3); }
            50% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6); }
            100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3); }
          }
          @keyframes glow-light {
            0% { text-shadow: 0 0 5px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.2); }
            50% { text-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.4); }
            100% { text-shadow: 0 0 5px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.2); }
          }
          .logo-glow-dark {
            animation: glow-dark 0.5s ease-in-out;
          }
          .logo-glow-light {
            animation: glow-light 0.5s ease-in-out;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
          }
          .animate-shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
        `}
      </style>

      {}
      <div className={`absolute inset-0 z-0 bg-gradient-to-br transition-opacity duration-500 ${backgroundGradientClass}`}></div>

      {}
      <div className={`fixed top-0 left-0 w-full z-20 flex justify-between items-center p-4 backdrop-blur-md ${headerBgClass}`}>
        {}
        <div
          className={`cursor-pointer select-none`}
          onClick={handleLogoClick}
        >
          <h1 className={`text-xl sm:text-2xl font-extrabold tracking-wide drop-shadow-lg transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} ${isLogoGlowing ? (isDarkMode ? 'logo-glow-dark' : 'logo-glow-light') : ''}`}>
            {logoText}
          </h1>
        </div>
        {}
        <div className="flex items-center space-x-4">
          {currentUser && (
            <button
              onClick={() => setShowAccountModal(true)}
              className={`p-2 rounded-full transition-transform duration-300 transform hover:scale-110 active:scale-95`}
              title="Contul meu"
            >
              <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          )}
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-full transition-transform duration-300 transform hover:scale-110 active:scale-95"
            title="Schimbă tema"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 14a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm10-7a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-18 0a1 1 0 011 1h1a1 1 0 110-2h-1a1 1 0 01-1 1zM5.388 3.556a1 1 0 01.31-1.42l.55-.38a1 1 0 011.42.31l.38.55a1 1 0 01-.31 1.42l-.55.38a1 1 0 01-1.42-.31l-.38-.55zM16.612 16.444a1 1 0 01-.31 1.42l-.55.38a1 1 0 01-1.42-.31l-.38-.55a1 1 0 01.31-1.42l.55-.38a1 1 0 011.42.31l.38.55zM3.556 16.612a1 1 0 01-.31 1.42l-.55.38a1 1 0 01-1.42-.31l-.38-.55a1 1 0 01.31-1.42l.55-.38a1 1 0 011.42.31l.38.55zM17.444 3.556a1 1 0 01-.31 1.42l-.55.38a1 1 0 01-1.42-.31l-.38-.55a1 1 0 01.31-1.42l.55-.38a1 1 0 011.42.31l.38.55zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {}
      <div className={`relative z-10 w-full flex-grow flex ${view === 'mathLessons' ? '' : 'items-center justify-center'} pt-20 p-4`}>
        {renderContent()}
      </div>

      {}
      {activeLesson && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-md bg-black/70 transition-opacity duration-300 animate-expand-from-center`}>
          <div className={`relative p-8 rounded-3xl shadow-2xl w-full max-w-3xl h-5/6 overflow-y-auto transform transition-transform duration-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <button
              onClick={() => setActiveLesson(null)}
              className={`absolute top-4 right-4 text-3xl font-bold transition-transform duration-300 transform hover:scale-125 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              &times;
            </button>
            {getLessonContent(activeLesson)}
          </div>
        </div>
      )}

      {}
      {showAccountModal && renderAccountMenu()}

      {}
      {message && (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl backdrop-blur-md transition-opacity duration-300 animate-fade-in ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-800/20 text-gray-900'}`}>
          <p className="font-semibold text-center">{message}</p>
        </div>
      )}

      {}
      <footer className={`flex-shrink-0 w-full p-4 mt-8 text-center backdrop-blur-md ${footerBgClass}`}>
        <p className={`text-sm ${footerTextClass}`}>
          MADE BY KEYRIF COPYRIGHT 2025 | Ultima actualizare: {currentDate}
        </p>
      </footer>
    </div>
  );
}
