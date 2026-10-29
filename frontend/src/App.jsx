import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, Check, ChefHat, Clock, Coffee, Facebook, Instagram, MapPin, Menu as MenuIcon, Minus, Plus, ShoppingBag, ShoppingCart, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { I18nProvider, useI18n } from './i18n'
import { api } from './api'
import { cafeConfig, WHATSAPP_NUMBER } from './config'
import { sampleMenu } from './data'

function AppShell() {
  const {t,lang,setLang}=useI18n()
  const [menuOpen,setMenuOpen]=useState(false)
  const [toast,setToast]=useState('')
  const [items,setItems]=useState(sampleMenu)
  const location=useLocation()
  useEffect(()=>{api.menu().then(data=>{if(Array.isArray(data)&&data.length)setItems(data)}).catch(()=>{})},[])
  useEffect(()=>{setMenuOpen(false);window.scrollTo(0,0)},[location.pathname])
  useEffect(()=>{if(!toast)return;const id=setTimeout(()=>setToast(''),4000);return()=>clearTimeout(id)},[toast])
  const whatsappUrl=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello '+cafeConfig.name+', I would like to ask about your menu.')}`
  return <div className={lang==='am'?'app amharic':'app'}>
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Home">
        <img src="/logo.png" alt={cafeConfig.name} className="brand-logo"/>
      </Link>
      <button className="mobile-menu icon-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen?<X/>:<MenuIcon/>}</button>
      <nav className={menuOpen?'main-nav open':'main-nav'}>
        <NavLink to="/">{t('home')}</NavLink><NavLink to="/menu">{t('menu')}</NavLink><NavLink to="/contact">{t('contact')}</NavLink>
        <button className="lang-toggle" onClick={()=>setLang(lang==='en'?'am':'en')}>{lang==='en'?'አማ':'EN'}</button>
      </nav>
    </header>
    <main><Routes>
      <Route path="/" element={<Home items={items}/>}/>
      <Route path="/menu" element={<MenuPage items={items}/>}/>
      <Route path="/contact" element={<ContactPage whatsappUrl={whatsappUrl}/>}/>
      <Route path="/qr" element={<QRPage/>}/>
      <Route path="/admin" element={<AdminPage notify={setToast} items={items} refreshMenu={()=>api.menu().then(setItems).catch(()=>{})}/>}/>
      <Route path="*" element={<section className="section"><h1>Page not found</h1><Link className="button" to="/">Return home</Link></section>}/>
    </Routes></main>
    <footer className="footer"><div className="footer-top"><Link to="/" className="brand"><img src="/logo.png" alt={cafeConfig.name} className="brand-logo-footer"/></Link><p>{t('footer')}</p><div className="social-links">{cafeConfig.instagram&&<a href={cafeConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a>}{cafeConfig.facebook&&<a href={cafeConfig.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook/></a>}{cafeConfig.tiktok&&<a href={cafeConfig.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><TikTokIcon/></a>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {cafeConfig.name}. All rights reserved.</span></div></footer>
    {toast&&<div className="toast" role="status"><Check size={18}/>{toast}</div>}
  </div>
}
function MessageCircleIcon(){return <span className="whatsapp-glyph">✆</span>}
function TikTokIcon(){return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>}
function Home({items}) {
  const {t}=useI18n()
  return <>
    <section className="hero"><div className="hero-image"></div><div className="hero-shade"></div><div className="hero-content"><span className="eyebrow"><span></span>{t('eyebrow')}</span><h1>{t('headline')}</h1><p>{t('intro')}</p><div className="hero-buttons"><Link className="button" to="/menu">{t('explore')} <ArrowRight size={17}/></Link><Link className="button button-outline" to="/contact">{t('contact')}</Link></div><div className="hero-meta"><span><Clock size={16}/>{cafeConfig.openingHours}</span><span><MapPin size={16}/>{cafeConfig.address}</span></div></div><div className="hero-vertical">SLOW DOWN · SIP · STAY AWHILE</div></section>
    <section className="section favorites-section"><div className="section-heading"><div><span className="eyebrow eyebrow-dark">FROM OUR KITCHEN</span><h2>{t('favorites')}</h2><p>{t('favoritesSub')}</p></div><Link className="text-link" to="/menu">{t('viewMenu')} <ArrowRight size={16}/></Link></div><div className="menu-grid">{items.slice(0,3).map(item=><MenuCard key={item.id} item={item}/>)}</div></section>
    <section className="story-section" id="story"><div className="story-photo"><img src="/logo.png" alt="Sozo Café Kebena interior" loading="lazy"/><div className="photo-note"><Coffee/><span>Made for good moments</span></div></div><div className="story-copy"><span className="eyebrow eyebrow-dark">OUR PHILOSOPHY</span><h2>{t('storyTitle')}</h2><p>{t('storyText')}</p><div className="value-row"><span className="value-icon"><ChefHat/></span><div><strong>{t('fresh')}</strong><p>{t('freshText')}</p></div></div><div className="value-row"><span className="value-icon"><Coffee/></span><div><strong>{t('local')}</strong><p>{t('localText')}</p></div></div><Link className="text-link" to="/contact">{t('contact')} <ArrowRight size={16}/></Link></div></section>
    <section className="cta-section"><span className="eyebrow">VISIT US TODAY</span><h2>Make a little time for yourself.</h2><p>Bring a friend, bring a book, or just bring your appetite.</p><Link className="button button-light" to="/contact">{t('contact')} <ArrowRight size={16}/></Link></section>
  </>
}
function MenuCard({item}) {
  return <article className="menu-card"><div className="menu-card-image"><img src={item.image||'/logo.png'} alt={item.name} loading="lazy"/><span className="category-pill">{item.category}</span></div><div className="menu-card-content"><div className="menu-card-title"><h3>{item.name}</h3><strong>{money(item.price)}</strong></div><p>{item.description}</p></div></article>
}
function MenuPage({items}) {
  const {t}=useI18n();const [category,setCategory]=useState('All');const [search,setSearch]=useState('')
  const categories=['All',...new Set(items.map(x=>x.category).filter(Boolean))]
  const filtered=items.filter(x=>(category==='All'||x.category===category)&&(x.name+' '+x.description).toLowerCase().includes(search.toLowerCase())&&x.available!==false)
  return <><section className="page-banner"><span className="eyebrow">FRESH FROM OUR KITCHEN</span><h1>{t('menuTitle')}</h1><p>{t('menuSub')}</p></section><section className="section menu-page"><div className="menu-tools"><div className="category-tabs">{categories.map(c=><button className={category===c?'active':''} key={c} onClick={()=>setCategory(c)}>{c==='All'?t('all'):t(`categories.${c}`)}</button>)}</div><input className="search-input" placeholder="Search menu..." value={search} onChange={e=>setSearch(e.target.value)}/></div>{filtered.length?<div className="menu-grid">{filtered.map(item=><MenuCard key={item.id} item={item}/>)}</div>:<p className="empty-state">No menu items found.</p>}</section></>
}

function ContactPage({whatsappUrl}) {
 const {t}=useI18n()
 return <><section className="page-banner"><span className="eyebrow">WE WOULD LOVE TO SEE YOU</span><h1>{t('contactTitle')}</h1><p>Questions, celebrations, or just saying hello — we're here.</p></section><section className="section contact-grid"><div className="contact-card"><span className="contact-icon"><MapPin/></span><h2>{t('location')}</h2><p>{cafeConfig.address}</p><a className="text-link" href={cafeConfig.googleMaps||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafeConfig.address)}`} target="_blank" rel="noreferrer">Open map <ArrowRight size={15}/></a></div><div className="contact-card"><span className="contact-icon"><Clock/></span><h2>{t('hours')}</h2><p>{cafeConfig.openingHours}</p><p>Hours may change on public holidays.</p></div><div className="contact-card"><span className="contact-icon"><MessageCircleIcon/></span><h2>Let's talk</h2><p>{cafeConfig.phone}</p><p>{cafeConfig.email}</p><a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">{t('whatsapp')}</a></div></section><section className="map-placeholder"><MapPin size={30}/><h2>Find your way to us</h2><p>Visit us at Sozo Café Kebena in Addis Ababa.</p><a className="text-link" href={cafeConfig.googleMaps||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafeConfig.address)}`} target="_blank" rel="noreferrer">Open Google Maps <ArrowRight size={15}/></a></section></>
}
function QRPage() {
 const {t}=useI18n();const url=typeof window!=='undefined'?`${window.location.origin}/menu`:''
 return <section className="qr-poster-section"><div className="qr-poster"><div className="qr-poster-header"><img src="/logo.png" alt="Sozo Café" className="qr-poster-logo"/><p className="qr-tagline">GOOD COFFEE • GREAT MOMENTS</p></div><div className="qr-poster-qr"><img src="/qr.png" alt="Scan QR Code" style={{width:'280px',height:'280px',display:'block'}}/></div><div className="qr-poster-text"><h2>Scan to View Our</h2><p className="qr-menu-text">Menu</p></div><div className="qr-poster-icons"><div className="qr-icon-item"><Coffee size={32}/><span>COFFEE</span></div><div className="qr-icon-item"><ChefHat size={32}/><span>FOOD</span></div><div className="qr-icon-item"><ShoppingBag size={32}/><span>DRINKS</span></div><div className="qr-icon-item"><Coffee size={32}/><span>PASTRIES</span></div></div><p className="qr-poster-footer">Fresh Flavors. Anytime.</p></div><button className="button print-button" onClick={()=>window.print()}>Print QR Poster</button></section>
}
function AdminPage({notify,items,refreshMenu}) {
 const [token,setToken]=useState(()=>sessionStorage.getItem('cafeAdminToken')||'');const [username,setUsername]=useState('admin');const [password,setPassword]=useState('');const [orders,setOrders]=useState([]);const [reservations,setReservations]=useState([]);const [tab,setTab]=useState('menu');const [error,setError]=useState('');const [newItem,setNewItem]=useState({name:'',description:'',category:'Coffee',price:'',image:''})
 async function login(e){e.preventDefault();setError('');try{const result=await api.adminLogin({username,password});sessionStorage.setItem('cafeAdminToken',result.token);setToken(result.token);setPassword('')}catch(err){setError(err.message)}}
 async function load(){try{setOrders([]);setReservations([])}catch(err){setError(err.message);if(err.message.includes('401'))logout()}}
 useEffect(()=>{if(token)load()},[token])
 function logout(){sessionStorage.removeItem('cafeAdminToken');setToken('');setOrders([]);setReservations([])}

 async function addMenu(e){e.preventDefault();try{await api.createMenuItem({...newItem,price:Number(newItem.price),available:true},token);setNewItem({name:'',description:'',category:'Coffee',price:'',image:''});refreshMenu();notify('Menu item added.')}catch(err){notify(err.message)}}
 async function removeMenu(id){if(!confirm('Delete this menu item?'))return;try{await api.deleteMenuItem(id,token);refreshMenu();notify('Menu item deleted.')}catch(err){notify(err.message)}}
 if(!token)return <section className="section admin-login-wrap"><form className="form-card admin-login" onSubmit={login}><span className="eyebrow eyebrow-dark">STAFF ACCESS</span><h1>Admin login</h1><p>Sign in to manage orders, reservations, and menu items.</p>{error&&<p className="error-text">{error}</p>}<div className="field"><label>Username</label><input value={username} onChange={e=>setUsername(e.target.value)} required autoComplete="username"/></div><div className="field"><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/></div><button className="button button-full">Sign in</button></form></section>
 return <section className="section admin-section"><div className="admin-heading"><div><span className="eyebrow eyebrow-dark">CONTROL CENTER</span><h1>Admin dashboard</h1></div><button className="button button-outline-dark" onClick={logout}>Sign out</button></div>{error&&<p className="error-text">{error}</p>}<div className="admin-tabs">{['menu'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x[0].toUpperCase()+x.slice(1)}</button>)}</div>
 {tab==='menu'&&<><form className="form-card admin-menu-form" onSubmit={addMenu}><h2>Add menu item</h2><div className="form-row"><div className="field"><label>Name</label><input value={newItem.name} onChange={e=>setNewItem({...newItem,name:e.target.value})} required/></div><div className="field"><label>Category</label><select value={newItem.category} onChange={e=>setNewItem({...newItem,category:e.target.value})}><option>Coffee</option><option>Food</option><option>Dessert</option><option>Juice</option></select></div><div className="field"><label>Price (ETB)</label><input type="number" min="0" step="0.01" value={newItem.price} onChange={e=>setNewItem({...newItem,price:e.target.value})} required/></div></div><div className="field"><label>Description</label><input value={newItem.description} onChange={e=>setNewItem({...newItem,description:e.target.value})} required/></div><div className="field"><label>Image URL</label><input type="url" value={newItem.image} onChange={e=>setNewItem({...newItem,image:e.target.value})} placeholder="https://..."/></div><button className="button">Add item <Plus size={16}/></button></form><div className="admin-list">{items.map(i=><article className="admin-row" key={i.id}><div><strong>{i.name}</strong><p>{i.category} · {money(i.price)}</p></div><button className="danger-button" onClick={()=>removeMenu(i.id)}>Delete</button></article>)}</div></>}
 </section>
}
function money(value){return new Intl.NumberFormat('en-ET',{style:'currency',currency:'ETB',maximumFractionDigits:2}).format(Number(value)||0)}
export default function App(){return <I18nProvider><AppShell/></I18nProvider>}
