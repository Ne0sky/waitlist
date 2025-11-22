import { useState, useEffect } from 'react';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [activeTab, setActiveTab] = useState('problem');

  // Keep your API URL exactly as is
  const API_URL = "https://uu4qwx2iv5.execute-api.us-east-1.amazonaws.com/join";

  // Global Style Reset for full-screen dark mode
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      if (response.ok) {
        setStatus('success');
        setEmail('');
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
      {/* Background Grid Effect */}
      <div style={styles.gridBackground}></div>
      <div style={styles.glowOrb}></div>

      {/* NAV / HEADER */}
      <nav style={styles.nav}>
        <div style={styles.logo}>CS <span style={{color: '#00F0FF'}}>.</span></div>
        <div style={styles.betaBadge}>PRIVATE BETA</div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.mainTitle}>
            Connect the <span style={styles.gradientText}>Hive Mind.</span>
          </h1>
          <p style={styles.heroSub}>
            <strong>CogSector</strong> is the first Multi-Repo RAG designed for Windsurf & Cursor. 
            Stop context-switching. Start engineering with full organizational awareness.
          </p>

          {/* EMAIL FORM */}
          {status === 'success' ? (
            <div style={styles.successCard}>
              <span style={{fontSize: '24px'}}>🚀</span>
              <div>
                <strong>Protocol Initiated.</strong>
                <div style={{fontSize: '14px', opacity: 0.8}}>We will signal you when access is granted.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="email"
                placeholder="engineer@corp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
                disabled={status === 'loading'}
              />
              <button 
                type="submit" 
                style={status === 'loading' ? styles.buttonDisabled : styles.button}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'INITIATING...' : 'REQUEST ACCESS'}
              </button>
            </form>
          )}
          {status === 'error' && <p style={styles.error}>Connection failed. Retrying recommended.</p>}
        </div>

        {/* HERO IMAGE / VISUAL */}
        <div style={styles.heroVisual}>
           {/* Placeholder for a cool architecture diagram */}
           <img 
            src="/logo_cogsector.jpg" 
            alt="System Architecture" 
            style={styles.heroImage}
           />
           <div style={styles.codeOverlay}>
             <code>&gt; connecting to repo: auth-service... OK</code><br/>
             <code>&gt; connecting to repo: payment-api... OK</code><br/>
             <code>&gt; context_window: OPTIMIZED</code>
           </div>
        </div>
      </header>

      {/* TABS SECTION */}
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
          <button 
            style={activeTab === 'tech' ? styles.tabActive : styles.tab} 
            onClick={() => setActiveTab('tech')}
          >
            03. THE STACK
          </button>
        </div>

        <div style={styles.tabContent}>
          {activeTab === 'problem' && (
            <div style={styles.tabPane}>
              <div style={styles.textBlock}>
                <h3>The "Single-Repo" Blind Spot</h3>
                <p>Your AI editor is brilliant, but it has amnesia. It knows <code>Repo A</code> perfectly, but it's completely blind to the API definitions in <code>Repo B</code>.</p>
                <p>This forces you to manually search, copy-paste context, and break your flow.</p>
              </div>
              <img src="https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_1280.jpg" style={styles.tabImage} alt="Problem" />
            </div>
          )}

          {activeTab === 'solution' && (
            <div style={styles.tabPane}>
              <div style={styles.textBlock}>
                <h3>Knowledge-as-a-Service</h3>
                <p><strong>CogSector</strong> builds a central "Knowledge Core" that indexes every repository in your organization.</p>
                <p>When you ask Windsurf a question, we intercept it via <strong>MCP (Model Context Protocol)</strong>, fetch the relevant code from <em>any</em> repo, and feed it to the agent.</p>
              </div>
              <img src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg" style={styles.tabImage} alt="Solution" />
            </div>
          )}

          {activeTab === 'tech' && (
            <div style={styles.tabPane}>
              <div style={styles.textBlock}>
                <h3>Built for Scale</h3>
                <ul style={styles.techList}>
                  <li>⚡ <strong>Tree-sitter</strong> Smart Chunking</li>
                  <li>🧠 <strong>Qwen3-Embedding</strong> Models</li>
                  <li>🔍 <strong>Vector + Reranking</strong> Search Pipeline</li>
                  <li>🛡️ <strong>Role-Based</strong> Security Permissions</li>
                </ul>
              </div>
              <img src="https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg" style={styles.tabImage} alt="Tech Stack" />
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>COGSECTOR © 2025</p>
        <p style={{opacity: 0.5, fontSize: '0.8rem'}}>System Status: ONLINE</p>
      </footer>
    </div>
  );
};

// --- FUTURISTIC STYLES ---
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
  buttonDisabled: {
    padding: '15px 30px',
    background: '#333',
    color: '#666',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
  },
  successCard: {
    background: 'rgba(0, 240, 255, 0.1)',
    border: '1px solid #00F0FF',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    color: '#00F0FF',
  },
  heroVisual: {
    flex: '1',
    minWidth: '300px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    borderRadius: '10px',
    border: '1px solid #333',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  },
  codeOverlay: {
    position: 'absolute',
    bottom: '-20px',
    left: '-20px',
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid #333',
    padding: '15px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    color: '#00F0FF',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },
  
  // TABS SECTION
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
  tabImage: {
    flex: 1,
    minWidth: '300px',
    borderRadius: '8px',
    border: '1px solid #333',
    opacity: 0.8,
  },
  techList: {
    listStyle: 'none',
    padding: 0,
    lineHeight: '2.5',
    color: '#aaa',
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

// Animation for tab switching
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

export default Waitlist;