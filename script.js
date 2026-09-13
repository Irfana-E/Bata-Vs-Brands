const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu')});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open menu')}));

const sections=[...document.querySelectorAll('main section[id]')];
const navAnchors=[...document.querySelectorAll('.site-nav > a[href^="#"]')];
const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;navAnchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))})},{rootMargin:'-45% 0px -48% 0px',threshold:0});
sections.forEach(s=>io.observe(s));

const note=document.getElementById('product-note');
const cards=[...document.querySelectorAll('.mini-card')];
function filterCards(category){cards.forEach(card=>{const tags=(card.dataset.tags||'').split(/\s+/);card.classList.toggle('is-hidden',category!=='all'&&!tags.includes(category))});note.textContent=category==='all'?'Showing all available collection highlights.':`Showing ${category.charAt(0).toUpperCase()+category.slice(1)} collection highlights. Scroll down to enquire.`;document.querySelector('#mini-grid').scrollIntoView({behavior:'smooth',block:'center'})}
document.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>filterCards(btn.dataset.category)));
document.querySelector('[data-show-all]')?.addEventListener('click',()=>filterCards('all'));

const lightbox=document.getElementById('lightbox');
const lightboxImage=lightbox?.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(btn=>btn.addEventListener('click',()=>{const img=btn.querySelector('img');lightboxImage.src=img.src;lightboxImage.alt=img.alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}));
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImage.src=''}
lightbox?.addEventListener('click',e=>{if(e.target===lightbox||e.target.classList.contains('lightbox-close'))closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

const backTop=document.querySelector('.back-top');
window.addEventListener('scroll',()=>backTop.classList.toggle('show',window.scrollY>600),{passive:true});
backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

document.getElementById('year').textContent=new Date().getFullYear();
