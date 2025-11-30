import { useState, useEffect } from 'react';

// --- REUSABLE NEON FILTER DEFINITION ---
const NeonFilterDefs = () => (
  <defs>
    {/* Increased blur for a stronger neon effect on outlines */}
    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur3" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur6" />
      <feMerge>
        <feMergeNode in="blur6" />
        <feMergeNode in="blur3" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    {/* Gradient only for the silo outlines now */}
    <linearGradient id="silo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#7000FF" />
      <stop offset="100%" stopColor="#00F0FF" />
    </linearGradient>
  </defs>
);

// --- UPDATED: CONTEXT SILO SVG (No inner text/logos) ---
const ContextSiloSVG = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style={style} preserveAspectRatio="xMidYMid meet">
    <NeonFilterDefs />
    <g filter="url(#neon-glow)" strokeWidth="2" fill="none">
      {/* Silo 1 (Left) - Empty Outline */}
      <g transform="translate(50, 50)">
        {/* Removed fill, added url(#silo-gradient) to stroke */}
        <rect x="0" y="0" width="80" height="120" rx="10" stroke="url(#silo-gradient)" />
        <path d="M20 30h40 M20 50h40 M20 70h20" stroke="#7000FF" opacity="0.5" />
      </g>
      
      {/* Silo 2 (Middle) - Empty Outline */}
      <g transform="translate(160, 50)">
        <rect x="0" y="0" width="80" height="120" rx="10" stroke="url(#silo-gradient)" />
        <path d="M20 30h40 M20 50h40 M20 70h20" stroke="#7000FF" opacity="0.5" />
      </g>

      {/* Silo 3 (Right) - Empty Outline */}
      <g transform="translate(270, 50)">
        <rect x="0" y="0" width="80" height="120" rx="10" stroke="url(#silo-gradient)" />
        <path d="M20 30h40 M20 50h40 M20 70h20" stroke="#7000FF" opacity="0.5" />
      </g>

      {/* Broken Connections */}
      <path d="M130 110 h30" stroke="#FF0055" strokeDasharray="5,5" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M240 110 h30" stroke="#FF0055" strokeDasharray="5,5" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" begin="1s" repeatCount="indefinite" />
      </path>
      
      {/* "X" Marks */}
      <path d="M140 105 l10 10 M150 105 l-10 10" stroke="#FF0055" strokeWidth="3" />
      <path d="M250 105 l10 10 M260 105 l-10 10" stroke="#FF0055" strokeWidth="3" />
    </g>
  </svg>
);

// --- UPDATED: KNOWLEDGE LAYER SVG (Outline Only, No Fills) ---
const KnowledgeLayerSVG = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style={style} preserveAspectRatio="xMidYMid meet">
    <NeonFilterDefs />
    <g filter="url(#neon-glow)" fill="none">
      {/* Connecting Lines */}
      <g stroke="#00F0FF" strokeWidth="1" opacity="0.5">
        <path d="M200 150 L 80 80" /><path d="M200 150 L 320 80" />
        <path d="M200 150 L 80 220" /><path d="M200 150 L 320 220" />
        <path d="M200 150 L 200 50" /><path d="M200 150 L 200 250" />
      </g>

      {/* Central Core - OUTLINE ONLY */}
      <g transform="translate(200, 150)">
        {/* Outer shell - changed from fill to stroke */}
        <circle r="50" stroke="#00F0FF" strokeWidth="1" opacity="0.6" />
        <circle r="40" stroke="#00F0FF" strokeWidth="3" />
        <circle r="25" stroke="#00F0FF" strokeWidth="2" />
        <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="3s" repeatCount="indefinite" additive="sum"/>
      </g>

      {/* Connected Nodes - OUTLINE ONLY */}
      {/* Node 1 (Top Left) */}
      <g transform="translate(80, 80)">
        <circle r="25" stroke="#00F0FF" strokeWidth="2" /> { /* Removed fill="#000" */ }
        {/* Text converted to outline using stroke and fill="none" */}
        <text x="0" y="5" fill="#ffffffff" stroke="none" strokeWidth="0.5" fontSize="8" fontFamily="Orbitron" textAnchor="middle">REPO A</text>
      </g>
      {/* Node 2 (Top Right) */}
      <g transform="translate(320, 80)">
        <circle r="25" stroke="#00F0FF" strokeWidth="2" />
        <text x="0" y="5" fill="#ffffffff" stroke="none"  fontSize="8" fontFamily="Orbitron" textAnchor="middle">REPO B</text>
      </g>
      {/* Node 3 (Bottom Left) */}
      <g transform="translate(80, 220)">
        <circle r="25" stroke="#00F0FF" strokeWidth="2" />
        <text x="0" y="5" fill="#ffffffff" stroke="none"  fontSize="8" fontFamily="Orbitron" textAnchor="middle">AGENT</text>
      </g>
      {/* Node 4 (Bottom Right) */}
      <g transform="translate(320, 220)">
        <circle r="25" stroke="#00F0FF" strokeWidth="2" />
        <text x="0" y="5" fill="#ffffffff" stroke="none"  fontSize="8" fontFamily="Orbitron" textAnchor="middle">DOCS</text>
      </g>

      {/* Data Flow Particles (Kept fills here as they are tiny light points) */}
      <circle r="2" fill="#FFFFFF" filter="none">
        <animateMotion path="M80 80 L200 150" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle r="2" fill="#FFFFFF" filter="none">
        <animateMotion path="M320 80 L200 150" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle r="2" fill="#00F0FF" filter="none">
        <animateMotion path="M200 150 L80 220" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);


// --- EXISTING COMPONENTS ---
const BrainChipIcon = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 9h6" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [activeTab, setActiveTab] = useState('problem');
  
  // Survey State
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState({});

  // API URL
  const API_URL = "https://uu4qwx2iv5.execute-api.us-east-1.amazonaws.com/join";

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#050505';
    document.body.style.color = '#ffffff';
    document.body.style.fontFamily = '"Inter", sans-serif';
    return () => {
      document.body.style.margin = '';
    };
  }, []);

  // --- EXPANDED QUESTIONS ---
  const SURVEY_QUESTIONS = [
    {
      id: 'repo_count',
      question: "How many repositories does your team actively maintain?",
      options: ["1-5 (Manageable)", "5-20 (Messy)", "20+ (Chaos)"]
    },
    {
      id: 'current_agent',
      question: "Which AI Agent are you currently using?",
      options: ["Cursor", "Windsurf", "Github Copilot", "Others","None"]
    },
    {
      id: 'context_pain',
      question: "How often do you hit the 'context window' limit?",
      options: ["Rarely", "Daily", "Multiple times an hour"]
    },
    {
      id: 'language_stack',
      question: "What is your primary language stack?",
      options: ["TypeScript/JS", "Python", "Java/Kotlin", "Rust/Go"]
    },
    {
      id: 'onboarding_time',
      question: "How long does it take a new engineer to understand your codebase?",
      options: ["< 1 Week", "1 Month", "3+ Months"]
    }
  ];

  // STEP 1: User enters email -> Move to survey
  const handleEmailStart = (e) => {
    e.preventDefault();
    if(email) {
      setStatus('survey');
    }
  };

  // STEP 2: Handle "Skip"
  const handleSkip = () => {
    // Send email only, with empty survey data
    submitFinal({}); 
  };

  // STEP 3: Collect answers
  const handleSurveyOptionClick = (questionId, option) => {
    const newAnswers = { ...surveyAnswers, [questionId]: option };
    setSurveyAnswers(newAnswers);
    
    if (surveyStep < SURVEY_QUESTIONS.length - 1) {
      setTimeout(() => setSurveyStep(prev => prev + 1), 250); 
    } else {
      setTimeout(() => submitFinal(newAnswers), 250);
    }
  };

  // STEP 4: Send to Backend
  const submitFinal = async (finalAnswers) => {
    setStatus('loading');
    
    // Check if survey was taken (keys exist) or skipped
    const isSurveySkipped = Object.keys(finalAnswers).length === 0;

    const payload = {
      email: email,
      surveyCompleted: !isSurveySkipped,
      ...finalAnswers
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.gridBackground}></div>
      <div style={styles.glowOrb}></div>

      <nav style={styles.nav}>
        <div style={styles.betaBadge}>PRIVATE BETA</div>
      </nav>

      <header style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.mainTitle}>
            Context at <span style={styles.gradientText}>Scale.</span>
          </h1>
          <p style={styles.heroSub}>
            <strong>KogSector</strong> is the unified knowledge layer for your <strong>AI Agents</strong>.
            Stop context-switching. Start engineering with full organizational awareness.
          </p>

          <div style={{minHeight: '180px'}}>
            
            {status === 'loading' && (
               <div style={{color: '#00F0FF', fontSize: '1.2rem', animation: 'pulse 1s infinite'}}>
                 UPLOADING TO KNOWLEDGE CORE...
               </div>
            )}

            {status === 'success' && (
              <div style={styles.successCard}>
                <span style={{fontSize: '24px'}}>🚀</span>
                <div>
                  <strong>Protocol Initiated.</strong>
                  <div style={{fontSize: '14px', opacity: 0.8}}>You are on the list. We will signal you soon.</div>
                </div>
              </div>
            )}
            
            {status === 'survey' && (
              <div style={styles.surveyContainer}>
                {/* Header with Skip Button */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <div style={styles.surveyProgress}>
                    Question {surveyStep + 1} / {SURVEY_QUESTIONS.length}
                  </div>
                  <button onClick={handleSkip} style={styles.skipButton}>
                    SKIP SURVEY →
                  </button>
                </div>

                <h4 style={styles.surveyQuestion}>
                  {SURVEY_QUESTIONS[surveyStep].question}
                </h4>
                <div style={styles.surveyOptionsGrid}>
                  {SURVEY_QUESTIONS[surveyStep].options.map((opt, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleSurveyOptionClick(SURVEY_QUESTIONS[surveyStep].id, opt)}
                      style={styles.surveyOptionBtn}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {(status === 'idle' || status === 'error') && (
              <form onSubmit={handleEmailStart} style={styles.form}>
                <input
                  type="email"
                  placeholder="engineer@corp.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
                <button type="submit" style={styles.button}>
                  REQUEST ACCESS
                </button>
              </form>
            )}
            
            {status === 'error' && <p style={styles.error}>Connection failed. Retrying recommended.</p>}
          </div>
        </div>

        <div style={styles.heroVisual}>
           <div style={styles.neonContainer}>
             <div style={styles.neonWrapper}>
                <BrainChipIcon style={styles.neonIcon} />
                <h2 style={styles.neonHeroText}>KogSector</h2>
             </div>
             <div style={styles.reflection}></div>
           </div>
        </div>
      </header>

      {/* TABS */}
      <section style={styles.tabsSection}>
        <div style={styles.tabsHeader}>
          <button 
            style={activeTab === 'problem' ? styles.tabActive : styles.tab} 
            onClick={() => setActiveTab('problem')}
          >
            01. THE PROBLEM
          </button>
          <button 
            style={activeTab === 'solution' ? styles.tabActive : styles.tab} 
            onClick={() => setActiveTab('solution')}
          >
            02. THE SOLUTION
          </button>
        </div>

        <div style={styles.tabContent}>
          {activeTab === 'problem' && (
            <div style={styles.tabPane}>
              <div style={styles.textBlock}>
                <h3>The "Context Silo"</h3>
                <p>Your AI Agents are brilliant at generating code, but they operate in a vacuum. They see the file you are editing, but they are blind to the vast knowledge hidden across your organization's codebase.</p>
                <p>Without a central knowledge layer, you are forced to manually act as the "bridge"—finding context, copy-pasting snippets, and debugging integration issues your AI should have predicted.</p>
              </div>
              {/* REPLACED IMAGE WITH SVG COMPONENT */}
              <ContextSiloSVG style={styles.tabImage} />
            </div>
          )}

          {activeTab === 'solution' && (
            <div style={styles.tabPane}>
              <div style={styles.textBlock}>
                <h3>Knowledge-as-a-Service</h3>
                <p><strong>KogSector</strong> builds a unified "Knowledge Core" that indexes your entire engineering footprint—repositories, internal documentation, wikis, and specifications.</p>
                <p>When you query your AI Agent, we intercept it via <strong>MCP (Model Context Protocol)</strong>, retrieve the complete context—whether it's code, API references, or architectural decisions—and feed it to the agent.</p>
              </div>
              {/* REPLACED IMAGE WITH SVG COMPONENT */}
              <KnowledgeLayerSVG style={styles.tabImage} />
            </div>
          )}
        </div>
      </section>

      <footer style={styles.footer}>
        <p>KOGSECTOR © 2025</p>
        <p style={{opacity: 0.5, fontSize: '0.8rem'}}>System Status: ONLINE</p>
      </footer>
    </div>
  );
};

// --- STYLES ---
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    position: 'relative',
    overflowX: 'hidden',
    paddingBottom: '50px',
  },
  gridBackground: {
    position: 'fixed',
    top: 0, left: 0, width: '100%', height: '100%',
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    zIndex: -2,
  },
  glowOrb: {
    position: 'fixed',
    top: '-20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0,0,0,0) 70%)',
    zIndex: -1,
    pointerEvents: 'none',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 10%',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  betaBadge: {
    border: '1px solid #00F0FF',
    color: '#00F0FF',
    padding: '5px 10px',
    fontSize: '0.7rem',
    letterSpacing: '1px',
    borderRadius: '4px',
  },
  heroSection: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4rem 10%',
    gap: '40px',
    minHeight: '50vh', 
  },
  heroContent: {
    flex: '1',
    minWidth: '300px',
  },
  mainTitle: {
    fontSize: '3.5rem',
    lineHeight: '1.1',
    marginBottom: '1.5rem',
    fontWeight: '800',
  },
  gradientText: {
    background: 'linear-gradient(90deg, #00F0FF, #7000FF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    fontSize: '1.2rem',
    color: '#888',
    lineHeight: '1.6',
    marginBottom: '2.5rem',
    maxWidth: '500px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    padding: '15px',
    borderRadius: '4px',
    border: '1px solid #333',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: '1rem',
    minWidth: '250px',
    outline: 'none',
  },
  button: {
    padding: '15px 30px',
    background: '#00F0FF',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)',
    transition: 'all 0.2s',
  },
  successCard: {
    background: 'rgba(0, 240, 255, 0.1)',
    border: '1px solid #00F0FF',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    color: '#00F0FF',
    animation: 'fadeIn 0.5s ease',
  },
  // --- SURVEY STYLES ---
  surveyContainer: {
    background: 'rgba(0,0,0,0.6)',
    border: '1px solid #333',
    padding: '25px',
    borderRadius: '8px',
    backdropFilter: 'blur(10px)',
    animation: 'fadeIn 0.3s ease',
    maxWidth: '550px',
    borderLeft: '4px solid #00F0FF', 
  },
  surveyProgress: {
    fontSize: '0.8rem',
    color: '#00F0FF',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  skipButton: {
    background: 'transparent',
    border: 'none',
    color: '#888',
    fontSize: '0.8rem',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  surveyQuestion: {
    fontSize: '1.3rem',
    marginBottom: '20px',
    color: '#fff',
  },
  surveyOptionsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  surveyOptionBtn: {
    padding: '15px',
    textAlign: 'left',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid #444',
    color: '#ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '1rem',
  },
  heroVisual: {
    flex: '1',
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px', 
  },
  neonContainer: {
    position: 'relative',
    padding: '20px',
  },
  neonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px', 
    position: 'relative',
    zIndex: 2,
  },
  neonIcon: {
    width: '80px',
    height: '80px',
    stroke: '#00F0FF', 
    filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.8)) drop-shadow(0 0 20px rgba(0, 240, 255, 0.4))', 
    animation: 'flickerIcon 4s infinite alternate',
  },
  neonHeroText: {
    fontFamily: '"Orbitron", sans-serif',
    fontSize: '4.5rem', 
    fontWeight: '700',
    letterSpacing: '4px',
    margin: 0,
    color: 'transparent',
    WebkitTextStroke: '2px #00F0FF',
    textShadow: `
      0 0 10px rgba(0, 240, 255, 0.5),
      0 0 20px rgba(0, 240, 255, 0.3),
      0 0 40px rgba(0, 240, 255, 0.1)
    `,
    animation: 'flickerText 4s infinite alternate',
  },
  reflection: {
    content: '""',
    position: 'absolute',
    bottom: '-30px', 
    left: '50%',
    transform: 'translateX(-50%) scaleX(0.8)',
    width: '120%', 
    height: '50px',
    background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.2) 0%, transparent 70%)',
    zIndex: 1,
    filter: 'blur(15px)',
  },
  tabsSection: {
    marginTop: '4rem',
    padding: '4rem 10%',
    background: 'rgba(255,255,255,0.02)',
    borderTop: '1px solid #222',
    borderBottom: '1px solid #222',
  },
  tabsHeader: {
    display: 'flex',
    gap: '20px',
    marginBottom: '3rem',
    borderBottom: '1px solid #333',
  },
  tab: {
    background: 'transparent',
    border: 'none',
    color: '#666',
    padding: '10px 0',
    fontSize: '1rem',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s',
  },
  tabActive: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    padding: '10px 0',
    fontSize: '1rem',
    cursor: 'pointer',
    borderBottom: '2px solid #00F0FF',
  },
  tabContent: {
    minHeight: '300px',
  },
  tabPane: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
    alignItems: 'center',
    animation: 'fadeIn 0.5s ease',
  },
  textBlock: {
    flex: 1,
    minWidth: '300px',
  },
  // --- UPDATED IMAGE STYLE FOR SVGs (REMOVED BORDERS/BG) ---
  tabImage: {
    flex: 1,
    minWidth: '300px',
    height: 'auto',
    maxHeight: '350px',
    // Removed border, boxShadow, and background
    transition: 'all 0.3s ease',
  },
  footer: {
    textAlign: 'center',
    padding: '4rem 0',
    color: '#444',
    fontSize: '0.9rem',
  },
  error: {
    color: '#ff4444',
    marginTop: '10px',
  }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&display=swap');

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }

  button:hover {
     border-color: #00F0FF !important;
     background: rgba(0, 240, 255, 0.1) !important;
  }

  /* Updated hover effect for SVG container */
  svg:hover {
    /* Removed drop-shadow on hover to keep it clean */
    transform: scale(1.02);
    transition: all 0.3s ease;
  }

  @keyframes flickerText {
    0%, 18%, 22%, 25%, 53%, 57%, 100% {
      text-shadow:
      0 0 10px rgba(0, 240, 255, 0.5),
      0 0 20px rgba(0, 240, 255, 0.3),
      0 0 40px rgba(0, 240, 255, 0.1);
      opacity: 1;
    }
    20%, 24%, 55% {       
      text-shadow: none;
      opacity: 0.5;
    }
  }

  @keyframes flickerIcon {
    0%, 18%, 22%, 25%, 53%, 57%, 100% {
      filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.8)) drop-shadow(0 0 20px rgba(0, 240, 255, 0.4));
      opacity: 1;
    }
    20%, 24%, 55% {       
      filter: none;
      opacity: 0.5;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Waitlist;