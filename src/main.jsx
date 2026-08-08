import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import {
  Search,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  Shield,
  Terminal,
  BookOpen,
  Code2,
  Menu,
  X,
  ChevronRight,
  FileText,
  Tag,
  Globe,
} from "lucide-react";
import { loadAllWriteups } from "./utils/mdLoader";
import { MarkdownRenderer, extractHeadings } from "./components/MarkdownRenderer";
import "./styles.css";

function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  const nav = [
    ["Home", "/"],
    ["Write-ups", "/writeups"],
    ["PortSwigger", "/portswigger"],
    ["TryHackMe", "/tryhackme"],
    ["CTFs", "/ctfs"],
    ["Bug Bounty", "/bug-bounty"],
    ["Pentesting", "/pentesting"],
    ["Research", "/research"],
    ["About", "/about"],
  ];

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">ϟ</span> SSS<span>Writeups</span>
        </Link>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          {nav.map(([n, p]) => (
            <Link
              key={p}
              className={loc.pathname === p ? "active" : ""}
              onClick={() => setOpen(false)}
              to={p}
            >
              {n}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <Github size={17} />
          </a>
          <Link to="/writeups">
            <Search size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="brand">
            <span className="brand-mark">ϟ</span> SSS<span>Writeups</span>
          </div>
          <p>Building, breaking, and documenting security knowledge for a better digital world.</p>
        </div>
        <div>
          <b>Navigation</b>
          <Link to="/">Home</Link>
          <Link to="/writeups">Write-ups</Link>
          <Link to="/portswigger">PortSwigger</Link>
          <Link to="/tryhackme">TryHackMe</Link>
        </div>
        <div>
          <b>Topics</b>
          <Link to="/ctfs">CTFs</Link>
          <Link to="/bug-bounty">Bug Bounty</Link>
          <Link to="/pentesting">Pentesting</Link>
          <Link to="/research">Research</Link>
        </div>
        <div>
          <b>Connect</b>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            X / Twitter
          </a>
        </div>
      </div>
      <div className="copyright">
        © 2026 SSSWriteups. Built for learning and sharing cybersecurity knowledge.
      </div>
    </footer>
  );
}

function Stats({ allWriteups }) {
  const total = allWriteups.length;
  const portswigger = allWriteups.filter((w) => w.platform.toLowerCase() === "portswigger").length;
  const tryhackme = allWriteups.filter((w) => w.platform.toLowerCase() === "tryhackme").length;
  const ctf = allWriteups.filter((w) => w.platform.toLowerCase().includes("ctf")).length;
  const research = allWriteups.filter((w) =>
    ["research", "bug bounty", "pentesting"].includes(w.platform.toLowerCase())
  ).length;

  const items = [
    [total.toString(), "Total Write-ups", BookOpen],
    [portswigger.toString(), "PortSwigger Labs", Shield],
    [tryhackme.toString(), "TryHackMe Rooms", Terminal],
    [ctf.toString(), "CTF Challenges", Code2],
    [research.toString(), "Research & Notes", FileText],
  ];

  return (
    <div className="stats">
      {items.map(([n, l, I]) => (
        <div className="stat" key={l}>
          <I size={20} />
          <strong>{n}</strong>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

function Card({ w }) {
  const platformClass = w.platform.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link className="card" to={"/writeups/" + w.id}>
      <div className="card-top">
        <span className={"platform " + platformClass}>{w.platform}</span>
        <span className="difficulty">{w.difficulty}</span>
      </div>
      <h3>{w.title}</h3>
      <p>{w.description}</p>
      <div className="tags">
        {w.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="card-meta">
        <span>{w.date}</span>
        <span>
          {w.time} read <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

function Home() {
  const allWriteups = useMemo(() => loadAllWriteups(), []);
  const latestWriteups = allWriteups.slice(0, 4);

  // Aggregated categories
  const categories = useMemo(() => {
    const cats = {};
    allWriteups.forEach((w) => {
      if (w.category) {
        cats[w.category] = (cats[w.category] || 0) + 1;
      }
    });
    return Object.entries(cats);
  }, [allWriteups]);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">CYBERSECURITY WRITE-UPS & RESEARCH</span>
          <h1>
            Breaking Down Security,
            <br />
            One <em>Write-Up</em> at a Time.
          </h1>
          <p>
            A personal collection of cybersecurity write-ups, CTF walkthroughs, penetration
            testing notes, and security research.
          </p>
          <div className="hero-buttons">
            <Link className="btn primary" to="/writeups">
              Explore Write-ups <ArrowRight size={17} />
            </Link>
            <Link className="btn" to="/about">
              About Me
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <div className="shield-art">⌁</div>
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="grid-lines" />
        </div>
      </section>
      <main>
        <Stats allWriteups={allWriteups} />
        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">LATEST WORK</span>
              <h2>Latest Write-ups</h2>
            </div>
            <Link to="/writeups" className="view">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          {latestWriteups.length > 0 ? (
            <div className="cards">
              {latestWriteups.map((w) => (
                <Card key={w.id} w={w} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>No write-ups found</h3>
              <p>Add Markdown files to the <code>content/</code> folder to automatically publish write-ups.</p>
            </div>
          )}
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">EXPLORE</span>
              <h2>By Category</h2>
            </div>
          </div>
          <div className="categories">
            {categories.length > 0 ? (
              categories.map(([cat, count], i) => (
                <Link to={"/writeups?category=" + encodeURIComponent(cat)} className="category" key={cat}>
                  <span>0{i + 1}</span>
                  <b>{cat}</b>
                  <small>{count} article{count > 1 ? "s" : ""} →</small>
                </Link>
              ))
            ) : (
              ["Web Security", "API Security", "PortSwigger", "TryHackMe", "CTFs", "Research"].map((x, i) => (
                <Link to="/writeups" className="category" key={x}>
                  <span>0{i + 1}</span>
                  <b>{x}</b>
                  <small>Explore topics →</small>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function Writeups({ filter }) {
  const allWriteups = useMemo(() => loadAllWriteups(), []);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Newest");

  const availableCategories = useMemo(() => {
    const set = new Set(allWriteups.map((w) => w.category).filter(Boolean));
    return Array.from(set);
  }, [allWriteups]);

  const filteredData = useMemo(() => {
    return allWriteups.filter((w) => {
      // Platform filter matching
      if (filter) {
        const filterLower = filter.toLowerCase();
        const platLower = w.platform.toLowerCase();
        if (filterLower === "ctf" && !platLower.includes("ctf")) return false;
        if (filterLower !== "ctf" && platLower !== filterLower) return false;
      }
      // Search query
      if (q) {
        const query = q.toLowerCase();
        const matchesTitle = w.title.toLowerCase().includes(query);
        const matchesDesc = w.description.toLowerCase().includes(query);
        const matchesCat = w.category.toLowerCase().includes(query);
        const matchesTags = w.tags.some((t) => t.toLowerCase().includes(query));
        const matchesContent = w.content.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesTags && !matchesContent) {
          return false;
        }
      }
      // Category dropdown filter
      if (cat !== "All" && w.category !== cat) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sort === "Newest") return new Date(b.date) - new Date(a.date);
      if (sort === "Oldest") return new Date(a.date) - new Date(b.date);
      return 0;
    });
  }, [allWriteups, filter, q, cat, sort]);

  const titleText = filter ? filter + " Write-ups" : "All Write-ups";

  return (
    <main className="page">
      <div className="page-head">
        <span className="eyebrow">{filter ? filter.toUpperCase() : "KNOWLEDGE BASE"}</span>
        <h1>{titleText}</h1>
        <p>A growing collection of practical cybersecurity notes, walkthroughs and research.</p>
      </div>

      <div className="filters">
        <div className="search">
          <Search size={17} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search write-ups by title, tag, or keyword..."
          />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="All">All Categories</option>
          {availableCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      {filteredData.length > 0 ? (
        <div className="cards">
          {filteredData.map((w) => (
            <Card key={w.id} w={w} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No write-ups found</h3>
          <p>Try adjusting your search criteria or add new Markdown files to the <code>content/</code> folder.</p>
        </div>
      )}
    </main>
  );
}

function Article() {
  const { id } = useParams();
  const allWriteups = useMemo(() => loadAllWriteups(), []);

  const w = useMemo(() => {
    if (!id) return null;
    return allWriteups.find(
      (x) => x.id === id || x.simpleId === id || x.path === id || encodeURIComponent(x.id) === id
    );
  }, [allWriteups, id]);

  if (!w) {
    return (
      <main className="page center-page">
        <div className="empty">
          <h2>Article Not Found</h2>
          <p>The requested write-up could not be located.</p>
          <Link to="/writeups" className="btn primary" style={{ marginTop: "15px" }}>
            Back to Write-ups <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const headings = extractHeadings(w.content);

  const related = allWriteups
    .filter((x) => x.id !== w.id && (x.platform === w.platform || x.category === w.category))
    .slice(0, 3);

  return (
    <main className="article-wrap">
      <article className="article">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/writeups">Write-ups</Link>
          <ChevronRight size={14} />
          <span>{w.title}</span>
        </div>

        <div className="article-head">
          <span className={"platform " + w.platform.toLowerCase().replace(/\s+/g, "-")}>
            {w.platform}
          </span>
          <h1>{w.title}</h1>
          <div className="article-meta">
            {w.difficulty} · {w.category} · {w.date} · {w.time} read
          </div>
          <div className="tags">
            {w.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        {headings.length > 0 && (
          <div className="toc">
            <b>On this page</b>
            {headings.map((h, i) => (
              <a key={i} href={"#" + h.id} style={{ paddingLeft: (h.level - 1) * 12 + "px" }}>
                {h.text}
              </a>
            ))}
          </div>
        )}

        <MarkdownRenderer content={w.content} />
      </article>

      <aside className="side">
        <b>About this write-up</b>
        <span>Platform: {w.platform}</span>
        <span>Difficulty: {w.difficulty}</span>
        <span>Category: {w.category}</span>
        <span>Date: {w.date}</span>

        <hr />

        <b>Related Articles</b>
        {related.length > 0 ? (
          related.map((x) => (
            <Link to={"/writeups/" + x.id} key={x.id}>
              {x.title}
            </Link>
          ))
        ) : (
          <span style={{ fontSize: "11px", color: "#6e7c8d" }}>No related articles yet.</span>
        )}
      </aside>
    </main>
  );
}

function About() {
  return (
    <main className="page about-page">
      <div className="about-card">
        <div className="about-header">
          <span className="eyebrow">PORTFOLIO</span>
          <h1>Saksham Singh Sachan</h1>
          <p className="subtitle">Cybersecurity Learner & CTF Player</p>
        </div>
        <div className="about-links">
          <a
            href="https://your-portfolio-website.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn portfolio-btn"
          >
            <Globe size={18} /> Portfolio Website
          </a>
          <a
            href="https://github.com/SakshamSinghSachan"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href="https://x.com/DeceptaTech"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <Twitter size={18} /> X (Twitter)
          </a>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writeups" element={<Writeups />} />
        <Route path="/writeups/:id" element={<Article />} />
        <Route path="/portswigger" element={<Writeups filter="PortSwigger" />} />
        <Route path="/tryhackme" element={<Writeups filter="TryHackMe" />} />
        <Route path="/ctfs" element={<Writeups filter="CTF" />} />
        <Route path="/bug-bounty" element={<Writeups filter="Bug Bounty" />} />
        <Route path="/pentesting" element={<Writeups filter="Pentesting" />} />
        <Route path="/research" element={<Writeups filter="Research" />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
