import { useMemo, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Eye,
  FileDown,
  Filter,
  Fullscreen,
  Home,
  Languages,
  LogOut,
  MessageSquare,
  Send,
  Search,
  Settings,
  Shield,
  SlidersHorizontal,
  UserRound,
  Wallet,
  X,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from 'recharts';

const navigation = [
  { label: 'Accueil', icon: Home, to: '/' },
  { label: 'Aides', icon: CircleHelp },
  { label: 'Agents', icon: Shield },
  { label: 'Transactions', icon: ClipboardList, to: '/transactions' },
  { label: 'Statistiques', icon: Activity },
  { label: 'Appels de fonds', icon: Wallet, to: '/appels-de-fonds' },
  { label: 'Relevé de compte', icon: SlidersHorizontal },
  { label: 'SMS', icon: MessageSquare, to: '/sms' },
  { label: 'Paramètres', icon: Settings },
];

const sparkData = [
  { value: 32 }, { value: 25 }, { value: 43 }, { value: 37 }, { value: 59 },
  { value: 36 }, { value: 46 }, { value: 38 }, { value: 53 }, { value: 42 }, { value: 47 }, { value: 35 },
];

const monthData = [
  { day: '01', value: 180 }, { day: '03', value: 180 }, { day: '05', value: 180 },
  { day: '07', value: 180 }, { day: '09', value: 180 }, { day: '11', value: 180 },
  { day: '13', value: 180 }, { day: '15', value: 180 }, { day: '17', value: 180 },
  { day: '19', value: 180 }, { day: '21', value: 0 }, { day: '23', value: 180 },
  { day: '25', value: 180 }, { day: '27', value: 180 }, { day: '29', value: 180 }, { day: '30', value: 0 },
];

const summaryCards = [
  { title: 'Journalière', transactions: '3', sales: '750', tone: 'sky' },
  { title: 'Hebdomadaire', transactions: '3', sales: '750', tone: 'blue' },
  { title: 'Mensuelle', transactions: '109', sales: '128 000 FCFA', tone: 'navy' },
  { title: 'Annuelle', transactions: '102', sales: '130 000', tone: 'plum' },
];

const channelCards = [
  { title: 'Wave', transactions: '103', sales: '102000' },
  { title: 'Orange Money', transactions: '9', sales: '2250' },
];

const transactions = [
  ['Administrateur', 'Babacar thiam', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '28 sept. 2026 21:46'],
  ['Administrateur', 'Mouhamed Sarr', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '28 sept. 2026 19:35'],
  ['Administrateur', 'Hassane Diop', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '28 sept. 2026 15:55'],
  ['Administrateur', 'Amadou Bah', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '27 sept. 2026 09:01'],
  ['Administrateur', 'Papa amath Gueye', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '26 sept. 2026 21:24'],
  ['Administrateur', 'Ndeyebinta mane', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '25 sept. 2026 19:39'],
  ['Administrateur', 'Moustapha dieye', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '24 sept. 2026 14:03'],
  ['Administrateur', 'Ablaye Ndao', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '24 sept. 2026 11:39'],
  ['Administrateur', 'Papa Moussa SY', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '23 sept. 2026 23:49'],
  ['Administrateur', 'Sedar Yaya Senghor', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Orange Money', '22 sept. 2026 14:41'],
  ['Administrateur', 'Aboubacar Soumare', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '20 sept. 2026 15:15'],
  ['Administrateur', 'Ousmane Baldé', '-', 'NON', 'Activation C...', '250', 'xof', '250', 'Wave', '19 sept. 2026 22:57'],
];

const fundCalls = [
  ['2026-09-25 20:00', '2026-09-29 10:00', '60000', 'Wave Senegal', ''],
];

function Header() {
  return (
    <header className="topbar">
      <div className="topbar-spacer" />
      <div className="topbar-actions">
        <span className="balance">Solde : <strong>70 000 CFA</strong></span>
        <button aria-label="Plein écran" className="icon-button"><Fullscreen size={17} /></button>
        <button aria-label="Filtrer" className="icon-button"><Filter size={17} /></button>
        <button className="language"><Languages size={16} /> FR <ChevronRight size={13} /></button>
        <button aria-label="Profil" className="profile-button"><UserRound size={17} /><ChevronRight size={13} /></button>
      </div>
    </header>
  );
}

function Sidebar() {
  const location = useLocation();
  const smsOpen = location.pathname.startsWith('/sms');

  return (
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">P</span>AYTECH</div>
      <nav className="sidebar-nav">
        {navigation.map((item) => {
          const Icon = item.icon;
          if (item.label === 'SMS') {
            return <div key={item.label} className="sms-menu"><NavLink to="/sms" className={({ isActive }) => `nav-item ${isActive || smsOpen ? 'active' : ''}`}><Icon size={16} strokeWidth={2.2} /><span>{item.label}</span><ChevronDown className="nav-chevron" size={15} /></NavLink>{smsOpen ? <div className="sms-subnav"><NavLink to="/sms/achat" className={({ isActive }) => `subnav-item ${isActive || location.pathname === '/sms' ? 'active' : ''}`}><MessageSquare size={15} /><span>Achat de SMS</span></NavLink><NavLink to="/sms/contact" className={({ isActive }) => `subnav-item ${isActive ? 'active' : ''}`}><UserRound size={15} /><span>Contact</span></NavLink><NavLink to="/sms/envoi" className={({ isActive }) => `subnav-item ${isActive ? 'active' : ''}`}><Send size={15} /><span>Envoi SMS</span></NavLink></div> : null}</div>;
          }
          return item.to ? (
            <NavLink key={item.label} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={16} strokeWidth={2.2} /><span>{item.label}</span>{item.label === 'Aides' || item.label === 'Agents' || item.label === 'Paramètres' ? <ChevronRight className="nav-chevron" size={15} /> : null}
            </NavLink>
          ) : (
            <button key={item.label} className="nav-item inactive"><Icon size={16} strokeWidth={2.2} /><span>{item.label}</span>{['Aides', 'Agents', 'Paramètres'].includes(item.label) ? <ChevronRight className="nav-chevron" size={15} /> : null}</button>
          );
        })}
      </nav>
      <button className="logout"><LogOut size={16} /><span>Déconnexion</span></button>
    </aside>
  );
}

function Sparkline({ dark = false }: { dark?: boolean }) {
  return (
    <div className="sparkline">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sparkData} margin={{ top: 3, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid stroke={dark ? '#263345' : '#2581a2'} strokeDasharray="2 3" vertical />
          <Line type="monotone" dataKey="value" stroke="#03a7b2" strokeWidth={2.2} dot={{ r: 2.5, fill: '#03a7b2', strokeWidth: 0 }} activeDot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function SummaryCard({ card }: { card: typeof summaryCards[number] }) {
  return (
    <article className={`summary-card ${card.tone}`}>
      <div className="card-heading"><span>{card.title}</span><strong>(XOF)</strong></div>
      <div className="card-stat">Transactions: <b>{card.transactions}</b></div>
      <div className="card-stat">Ventes: <b>{card.sales}</b></div>
      <Sparkline />
    </article>
  );
}

function Dashboard() {
  return (
    <section className="page dashboard-page">
      <div className="summary-grid">{summaryCards.map((card) => <SummaryCard key={card.title} card={card} />)}</div>
      <div className="channel-grid">
        {channelCards.map((card) => <article className="channel-card" key={card.title}><div className="card-heading"><span>{card.title}</span><strong>(XOF)</strong></div><div className="card-stat">Transactions: <b>{card.transactions}</b></div><div className="card-stat">Ventes: <b>{card.sales}</b></div><Sparkline dark /></article>)}
      </div>
      <article className="area-card">
        <h1>MOIS DE SEPTEMBRE</h1>
        <div className="area-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={monthData} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}><defs><linearGradient id="tealFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16a5a7" stopOpacity={0.78} /><stop offset="100%" stopColor="#42b9b2" stopOpacity={0.78} /></linearGradient></defs><CartesianGrid stroke="#d6d9dc" strokeDasharray="2 2" /><XAxis dataKey="day" tick={{ fontSize: 11, fill: '#8b9195' }} /><YAxis ticks={[0, 50, 100, 150, 200]} tickFormatter={(value) => value === 0 ? '0K' : `${value / 1000}K`} tick={{ fontSize: 11, fill: '#8b9195' }} /><Tooltip /><Area type="monotone" dataKey="value" stroke="#079aa2" strokeWidth={2.5} fill="url(#tealFill)" dot={{ r: 3, fill: '#079aa2', strokeWidth: 0 }} /></AreaChart></ResponsiveContainer></div>
      </article>
    </section>
  );
}

function Transactions() {
  const [query, setQuery] = useState('');
  const filteredTransactions = useMemo(() => transactions.filter((row) => row.join(' ').toLowerCase().includes(query.toLowerCase())), [query]);
  const headings = ['Caisse', 'Payeur', 'Agence', 'Promo', 'Produit', 'Montant XOF', 'Devise paiement', 'Montant paiement', 'Par', 'Date', ''];
  return (
    <section className="page table-page">
      <div className="page-title-row"><div className="title-with-badges"><h1>Liste des transactions</h1><span className="status-badge green">Prod <i /></span><span className="status-badge green">Success <i /></span><span className="status-badge blue"><i /> Voir Remboursements</span></div><label className="search-box"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Recherche..." /></label></div>
      <div className="filters-row"><label>Début<input type="date" defaultValue="2026-04-01" /></label><label>Fin<input type="date" defaultValue="2026-09-28" /></label><button className="go-button">go</button></div>
      <div className="data-table-wrap"><table className="data-table transactions-table"><thead><tr>{headings.map((heading) => <th key={heading}>{heading || <Activity size={14} />}</th>)}</tr></thead><tbody>{filteredTransactions.map((row, index) => <tr key={`${row[1]}-${index}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cellIndex === 4 ? <><span className="play-dot">▶</span>{cell}</> : cell}</td>)}<td><Eye size={15} /></td></tr>)}</tbody></table></div>
    </section>
  );
}

function FundCalls() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="page table-page fund-page">
      <div className="fund-title-row"><h1>Appels de fonds</h1><button className="primary-button">Demande de fonds</button></div>
      <div className="fund-toolbar"><button className="export-button"><FileDown size={15} /> Exporter</button><label className="date-range"><CalendarDays size={15} /><input type="text" value="09/28/2026 - 10/04/2026" readOnly /></label></div>
      <div className="data-table-wrap"><table className="data-table funds-table"><thead><tr>{['Date Demande', 'Date validation', 'Montant', 'Methode', 'Periode', ''].map((heading) => <th key={heading}>{heading || <Activity size={14} />}</th>)}</tr></thead><tbody>{fundCalls.map((row, index) => <tr key={`${row[0]}-${index}`} className="clickable-row" onClick={() => setShowDetails(true)}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}<td><Eye size={15} /></td></tr>)}<tr className="total-row"><td colSpan={6}>1 Appel(s) de fond(s)</td></tr></tbody></table></div>
      <footer className="copyright">Copyright © 2026 <span>PAYTECH</span>, All rights reserved.</footer>
      {showDetails ? <div className="modal-backdrop" onClick={() => setShowDetails(false)}><div className="fund-modal" role="dialog" aria-modal="true" aria-labelledby="fund-modal-title" onClick={(event) => event.stopPropagation()}><div className="modal-header"><h2 id="fund-modal-title">Demande appel de fond</h2><button className="modal-close" onClick={() => setShowDetails(false)} aria-label="Fermer"><X size={18} /></button></div><div className="modal-body"><div className="detail-row"><span>Téléphone</span><strong>773000009</strong></div><div className="detail-row"><span>Date demande</span><strong>2026-09-25 20:00</strong></div><div className="detail-row amount-row"><span>Montant à recevoir</span><strong>60 000 XOF</strong></div><div className="detail-row"><span>Par</span><strong>Wave Senegal</strong></div><div className="detail-row"><span>Date validation</span><strong>2026-09-29 10:00</strong></div><div className="detail-row"><span>État</span><strong className="validated-badge">★ Validé</strong></div></div></div></div> : null}
    </section>
  );
}

function SmsPage() {
  const location = useLocation();
  const activeTab = location.pathname.endsWith('/contact') ? 'contact' : location.pathname.endsWith('/envoi') ? 'envoi' : 'achat';
  const tabs = [{ id: 'achat', label: 'Achat de SMS', icon: MessageSquare, to: '/sms/achat' }, { id: 'contact', label: 'Contact', icon: UserRound, to: '/sms/contact' }, { id: 'envoi', label: 'Envoi SMS', icon: Send, to: '/sms/envoi' }];
  return <section className="page sms-page"><div className="sms-tabs">{tabs.map((tab) => { const TabIcon = tab.icon; return <NavLink key={tab.id} to={tab.to} className={`sms-tab ${activeTab === tab.id ? 'active' : ''}`}><TabIcon size={15} />{tab.label}</NavLink>; })}</div>{activeTab === 'achat' ? <><div className="sms-page-heading"><h1>Achat de SMS <span>Nombre SMS : 0</span></h1><button className="primary-button">Achat de sms</button></div><div className="sms-alert"><AlertTriangle size={18} /><div><strong>Demande de retrait limitée</strong><p>Vous avez demandé un retrait de <b>100 000 FCFA</b>. La limite autorisée pour votre compte administrateur PAYTECH est de <b>60 000 FCFA</b>.</p></div></div><div className="data-table-wrap"><table className="data-table sms-table"><thead><tr>{['Date d’achat', 'Nombre', 'Montant', 'TVA', 'Total', 'État', ''].map((heading) => <th key={heading}>{heading || <Activity size={14} />}</th>)}</tr></thead><tbody><tr><td>25 sept. 2026 20:00</td><td>600</td><td>60 000</td><td>0</td><td>60 000 FCFA</td><td><span className="success-state">Transaction réussie</span></td><td><Eye size={15} /></td></tr><tr className="total-row"><td colSpan={7}>1 Achat SMS</td></tr></tbody></table></div></> : <div className="empty-sms-panel"><h1>{activeTab === 'contact' ? 'Contact' : 'Envoi SMS'}</h1><p>Cette section est prête à recevoir vos informations.</p></div>}<footer className="copyright">Copyright © 2026 <span>PAYTECH</span>, All rights reserved.</footer></section>;
}

function App() {
  return <BrowserRouter><div className="app-shell"><Sidebar /><main className="main-content"><Header /><Routes><Route path="/" element={<Dashboard />} /><Route path="/transactions" element={<Transactions />} /><Route path="/appels-de-fonds" element={<FundCalls />} /><Route path="/sms/*" element={<SmsPage />} /><Route path="*" element={<Dashboard />} /></Routes></main></div></BrowserRouter>;
}

export default App;
