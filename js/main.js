/* main.js — ALL general website JavaScript */
(function(){
"use strict";
const $ = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>Array.from(c.querySelectorAll(s));

/* ---------- Toast ---------- */
function toast(msg){
  let wrap = $('#toast-wrap');
  if(!wrap){ wrap=document.createElement('div'); wrap.id='toast-wrap'; document.body.appendChild(wrap); }
  const t=document.createElement('div');
  t.className='toast'; t.setAttribute('role','status');
  t.innerHTML='<span style="flex:1">'+msg+'</span><button aria-label="Dismiss notification" style="opacity:.7">✕</button>';
  const btn=t.querySelector('button');
  const kill=()=>{ t.classList.add('hide'); setTimeout(()=>t.remove(),300); };
  btn.addEventListener('click',kill);
  wrap.appendChild(t);
  setTimeout(kill,3600);
}
window.showToast = toast;

/* ---------- Scroll reveal + back to top + smooth anchor ---------- */
function initReveal(){
  const els=$$('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('visible')); return; }
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} }),{threshold:.12});
  els.forEach(e=>io.observe(e));
}
function initToTop(){
  let b=$('#toTop');
  if(!b){ b=document.createElement('button'); b.id='toTop'; b.setAttribute('aria-label','Back to top');
    b.className='fixed bottom-6 end-6 z-50 w-11 h-11 rounded-full bg-[#3F5D45] text-white shadow-xl grid place-items-center';
    b.innerHTML='<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(b);
    b.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }
  window.addEventListener('scroll',()=>{ b.classList.toggle('show', window.scrollY>600); },{passive:true});
}

/* ---------- FAQ ---------- */
function initFAQ(){
  $$('.faq-item').forEach(item=>{
    const btn=item.querySelector('.faq-q');
    if(!btn) return;
    btn.addEventListener('click',()=>{
      const open=item.classList.contains('open');
      $$('.faq-item.open').forEach(o=>{o.classList.remove('open'); o.querySelector('.faq-q').setAttribute('aria-expanded','false');});
      if(!open){ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    });
  });
}

/* ---------- Seasonal menu data + switcher ---------- */
const SEASON_MENUS = {
  spring:{label:'Spring',accent:'#6F8B72',items:[
    {n:'Shaved Asparagus Salad',d:'Pea shoots, lemon crème, garden herbs',tags:['V','GF'],p:'$14'},
    {n:'Spring Pea Soup',d:'Mint oil, crème fraîche, grilled bread',tags:['V'],p:'$12'},
    {n:'Strawberry & Burrata',d:'Basil, aged balsamic, cracked pepper',tags:['V','GF','N'],p:'$16'},
    {n:'Herb Chicken Paillard',d:'Charred greens, spring onions',tags:['GF','DF'],p:'$28'}]},
  summer:{label:'Summer',accent:'#C98B5B',items:[
    {n:'Heirloom Tomato Plate',d:'Whipped feta, basil oil, sea salt',tags:['V','GF'],p:'$15'},
    {n:'Sweet Corn Risotto',d:'Parmesan, chive blossom',tags:['V','GF'],p:'$24'},
    {n:'Peach & Blackberry Tart',d:'Vanilla cream, oat crumble',tags:['V'],p:'$13'},
    {n:'Grilled Field Vegetables',d:'Rom­esco, herb oil',tags:['VG','DF','GF'],p:'$22'}]},
  autumn:{label:'Autumn',accent:'#8A6A3F',items:[
    {n:'Roasted Heirloom Carrots',d:'Whipped goat cheese and herbs',tags:['V','GF'],p:'$14'},
    {n:'Wood-Fired Seasonal Squash',d:'Brown butter and toasted seeds',tags:['V','GF','N'],p:'$18'},
    {n:'Wild Mushroom Risotto',d:'Aged parmesan, thyme',tags:['V','GF'],p:'$26'},
    {n:'Herb-Roasted Chicken',d:'Garden vegetables, pan jus',tags:['GF','DF'],p:'$29'},
    {n:'Stone Fruit Tart',d:'Vanilla cream (demo)',tags:['V'],p:'$13'}]},
  winter:{label:'Winter',accent:'#3F5D45',items:[
    {n:'Roasted Brassicas',d:'Citrus, hazelnut, brown butter',tags:['V','N'],p:'$15'},
    {n:'Potato & Leek Gratin',d:'Winter greens, gruyère',tags:['V'],p:'$21'},
    {n:'Citrus & Fennel Salad',d:'Olive oil, sea salt',tags:['VG','GF','DF'],p:'$14'},
    {n:'Hearth-Braised Roots',d:'Rosemary jus, charred onion',tags:['VG','GF','DF'],p:'$23'}]}
};
function dietBadge(t){
  const map={V:'Vegetarian',VG:'Vegan',GF:'Gluten-Free',DF:'Dairy-Free',N:'Contains Nuts'};
  const colors={V:'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',VG:'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',GF:'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',DF:'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',N:'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200'};
  return `<span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${colors[t]||''}">${map[t]||t}</span>`;
}
function initSeasonSwitcher(){
  const tabs=$$('.season-tab'); const grid=$('#seasonMenuGrid'); const note=$('#seasonNote');
  if(!tabs.length||!grid) return;
  function render(season){
    const data=SEASON_MENUS[season]; if(!data) return;
    tabs.forEach(t=>{ const on=t.dataset.season===season; t.classList.toggle('active',on); t.setAttribute('aria-selected',String(on)); });
    grid.style.opacity='0'; grid.style.transform='translateY(8px)';
    setTimeout(()=>{
      grid.innerHTML=data.items.map(i=>`
        <article class="rounded-2xl overflow-hidden bg-white dark:bg-[#2B3029] border border-[#ece2cf] dark:border-[#3c443c] card-lift">
          <div class="p-5">
            <div class="flex items-start justify-between gap-3">
              <h4 class="font-serif-d text-lg font-bold">${i.n}</h4>
              <span class="text-sm font-semibold text-[#8A6A3F] dark:text-[#C98B5B] whitespace-nowrap">${i.p} <span class="block text-[10px] font-normal opacity-70">demo</span></span>
            </div>
            <p class="text-sm mt-1 opacity-80">${i.d}</p>
            <div class="flex flex-wrap gap-1.5 mt-3">${i.tags.map(dietBadge).join('')}</div>
          </div>
        </article>`).join('');
      grid.style.transition='.35s'; grid.style.opacity='1'; grid.style.transform='none';
      if(note) note.textContent = data.label+' menu · Sample/demo items & pricing. Our menu changes with the land and producers.';
    },180);
  }
  tabs.forEach(t=>t.addEventListener('click',()=>render(t.dataset.season)));
  render('autumn');
}

/* ---------- Events: filter + modal ---------- */
const EVENTS=[
  {id:'e1',title:'Harvest Table Dinner',cat:'Seasonal Dinner',month:'October',date:'Oct 24, 2026',time:'7:00 PM',img:'images/dishes/dishes-new17.jpg',desc:'A five-course autumn menu around one long table — squash, mushrooms, orchard fruit.',menu:'Squash soup · Mushroom risotto · Orchard tart',seats:'8 seats left (demo)'},
  {id:'e2',title:"Farmers' Table Evening",cat:'Farm Dinner',month:'November',date:'Nov 07, 2026',time:'6:30 PM',img:'images/dishes/dishes-new18.jpg',desc:'Meet the producers. Growers join each course to share the story behind the plate.',menu:'Grower salad · Hearth chicken · Root dessert',seats:'12 seats left (demo)'},
  {id:'e3',title:'Winter Hearth Supper',cat:'Seasonal Dinner',month:'December',date:'Dec 12, 2026',time:'7:30 PM',img:'images/dishes/dishes-new19.jpg',desc:'Wood-fired winter cooking — brassicas, citrus, slow roots beside the hearth.',menu:'Citrus salad · Braised roots · Warm cake',seats:'Waitlist (demo)'},
  {id:'e4',title:'Chef Collaboration Night',cat:'Chef Collaboration',month:'November',date:'Nov 21, 2026',time:'7:00 PM',img:'images/dishes/dishes-new20.jpg',desc:'Guest chef joins Elena Morgan for one night of shared plates and late conversation.',menu:'4 shared plates · Paired dessert',seats:'6 seats left (demo)'},
  {id:'e5',title:'Orchard Late-Summer Feast',cat:'Special Event',month:'October',date:'Oct 10, 2026',time:'6:00 PM',img:'images/menu/hero-menu.jpg',desc:'An outdoor farewell to summer — tomatoes, corn, stone fruit under string lights.',menu:'Tomato plate · Corn risotto · Fruit tart',seats:'Sold out (demo)'},
  {id:'e6',title:'Cellar & Cheese Night',cat:'Special Event',month:'December',date:'Dec 20, 2026',time:'7:00 PM',img:'images/home/img7.avif',desc:'Aged cheese, preserves and cellar pours by candlelight — a slow close to the year.',menu:'Cheese board · Preserves · Warm cake',seats:'10 seats left (demo)'}
];
function initEvents(){
  const grid=$('#eventGrid'); if(!grid) return;
  const filters=$$('.event-filter');
  function card(e){
    return `<article data-cat="${e.cat}" data-month="${e.month}" class="event-card rounded-2xl overflow-hidden bg-white dark:bg-[#2B3029] border border-[#ece2cf] dark:border-[#3c443c] card-lift">
      <div class="zoom-img overflow-hidden aspect-[16/10]"><img loading="lazy" src="${e.img}" alt="${e.title}" class="w-full h-full object-cover"/></div>
      <div class="p-5">
        <div class="flex items-center gap-2 text-xs"><span class="px-2.5 py-1 rounded-full bg-[#C98B5B]/15 text-[#8A6A3F] dark:text-[#e6b98a] font-semibold">${e.cat}</span><span class="opacity-70">${e.month}</span></div>
        <h3 class="font-serif-d text-xl font-bold mt-2">${e.title}</h3>
        <p class="text-sm opacity-80 mt-1">${e.date} · ${e.time}</p>
        <p class="text-sm mt-2 opacity-80">${e.desc}</p>
        <p class="text-xs mt-2 font-semibold text-[#3F5D45] dark:text-[#9db8a1]">${e.seats}</p>
        <div class="flex gap-2 mt-4">
          <button data-event="${e.id}" class="event-open flex-1 py-2.5 rounded-full bg-[#3F5D45] text-white text-sm font-semibold hover:bg-[#334c38]">Details & Reserve</button>
        </div>
      </div></article>`;
  }
  function render(f='All'){
    grid.innerHTML = EVENTS.filter(e=>f==='All'||e.cat===f).map(card).join('');
    bindModal();
  }
  filters.forEach(b=>b.addEventListener('click',()=>{
    filters.forEach(x=>x.classList.remove('active','bg-[#3F5D45]','text-white'));
    b.classList.add('active','bg-[#3F5D45]','text-white');
    render(b.dataset.filter);
  }));
  render('All');

  function bindModal(){
    $$('.event-open').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.event)));
  }
  function openModal(id){
    const e=EVENTS.find(x=>x.id===id); if(!e) return;
    let bd=$('#event-modal-backdrop');
    if(bd) bd.remove();
    bd=document.createElement('div'); bd.id='event-modal-backdrop';
    bd.className='fixed inset-0 z-[90] bg-black/55 grid place-items-center p-4';
    bd.innerHTML=`<div id="event-modal-panel" role="dialog" aria-modal="true" aria-label="${e.title}" class="w-full max-w-lg rounded-2xl overflow-hidden bg-[#F6F1E7] dark:bg-[#2B3029] text-[#2F3028] dark:text-[#F6F1E7] shadow-2xl scale-95 opacity-0">
      <div class="relative h-52"><img src="${e.img}" alt="${e.title}" class="w-full h-full object-cover"/>
      <button id="eventClose" aria-label="Close event details" class="absolute top-3 end-3 w-9 h-9 grid place-items-center rounded-full bg-black/55 text-white hover:bg-black">✕</button></div>
      <div class="p-6">
        <p class="text-xs font-semibold tracking-widest uppercase text-[#8A6A3F] dark:text-[#C98B5B]">${e.cat} · ${e.month}</p>
        <h3 class="font-serif-d text-2xl font-bold mt-1">${e.title}</h3>
        <p class="text-sm mt-1 opacity-80">${e.date} · ${e.time}</p>
        <p class="text-[15px] mt-3 leading-relaxed">${e.desc}</p>
        <div class="mt-4 rounded-xl bg-white dark:bg-[#353b34] border border-[#ece2cf] dark:border-[#454c43] p-4 text-sm">
          <p class="font-semibold mb-1">Menu highlights (demo)</p><p class="opacity-80">${e.menu}</p>
          <p class="mt-2 text-xs opacity-70">Vegetarian, vegan & gluten-free options. Please inform our team of dietary requirements when reserving.</p>
        </div>
        <div class="flex gap-2 mt-5">
          <a href="booking.html" class="flex-1 text-center py-3 rounded-full bg-[#3F5D45] text-white text-sm font-semibold">Reserve — ${e.seats.split('(')[0].trim()}</a>
          <button id="eventClose2" class="px-5 py-3 rounded-full border text-sm font-semibold">Close</button>
        </div>
      </div></div>`;
    document.body.appendChild(bd);
    document.body.style.overflow='hidden';
    requestAnimationFrame(()=>{ const p=$('#event-modal-panel'); if(p){p.style.transform='scale(1)'; p.style.opacity='1';} });
    const close=()=>{ bd.style.opacity='0'; document.body.style.overflow=''; setTimeout(()=>bd.remove(),250); $('#eventGrid .event-open')?.focus?.(); };
    bd.addEventListener('click',(ev)=>{ if(ev.target===bd) close(); });
    $('#eventClose').addEventListener('click',close);
    $('#eventClose2').addEventListener('click',close);
    document.addEventListener('keydown', function esc(ev){ if(ev.key==='Escape'){ close(); document.removeEventListener('keydown',esc);} });
    $('#eventClose').focus();
  }
}

/* ---------- Booking stepper ---------- */
function initBooking(){
  const form=$('#bookingForm'); if(!form) return;
  const steps=$$('.book-step'); const dots=$$('.step-dot'); const bar=$('#stepBar');
  let cur=0;
  const state={exp:'',date:'',time:'',name:'',email:'',guests:'2',diet:[],notes:''};
  function paint(){
    steps.forEach((s,i)=>s.classList.toggle('hidden',i!==cur));
    dots.forEach((d,i)=>{ d.classList.toggle('step-on',i===cur); d.classList.toggle('step-done',i<cur); });
    if(bar) bar.style.width=((cur+1)/steps.length*100)+'%';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function valid(){
    if(cur===0 && !state.exp){ toast('Please choose an experience.'); return false; }
    if(cur===1){ const d=$('#bDate').value; if(!d){toast('Please choose a date.');return false;} state.date=d; }
    if(cur===2 && !state.time){ toast('Please choose a time.'); return false; }
    if(cur===3){
      const n=$('#bName').value.trim(), e=$('#bEmail').value.trim(), g=$('#bGuests').value;
      if(n.length<2){toast('Please enter your name.');return false;}
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){toast('Please enter a valid email.');return false;}
      state.name=n; state.email=e; state.guests=g; state.notes=$('#bNotes').value.trim();
    }
    return true;
  }
  $$('.exp-card').forEach(c=>c.addEventListener('click',()=>{
    $$('.exp-card').forEach(x=>x.classList.remove('ring-2','ring-[#3F5D45]'));
    c.classList.add('ring-2','ring-[#3F5D45]'); state.exp=c.dataset.exp;
  }));
  $$('.time-chip').forEach(c=>c.addEventListener('click',()=>{
    $$('.time-chip').forEach(x=>x.classList.remove('bg-[#3F5D45]','text-white'));
    c.classList.add('bg-[#3F5D45]','text-white'); state.time=c.dataset.time;
  }));
  $$('.diet-chip input').forEach(i=>i.addEventListener('change',()=>{
    state.diet=$$('.diet-chip input:checked').map(x=>x.value);
  }));
  $('#bNext')?.addEventListener('click',()=>{ if(!valid())return; if(cur<steps.length-1){cur++;paint(); if(cur===5) fillSummary();} });
  $('#bBack')?.addEventListener('click',()=>{ if(cur>0){cur--;paint();} });
  function fillSummary(){
    const s=$('#bookSummary');
    if(s) s.innerHTML=`<div class="rounded-xl bg-white dark:bg-[#353b34] border p-4 text-sm space-y-1.5">
      <p><strong>Experience:</strong> ${state.exp}</p><p><strong>Date:</strong> ${state.date}</p>
      <p><strong>Time:</strong> ${state.time}</p><p><strong>Guest:</strong> ${state.name} · ${state.email} · ${state.guests} guests</p>
      <p><strong>Dietary:</strong> ${state.diet.join(', ')||'None noted'}</p>${state.notes?`<p><strong>Notes:</strong> ${state.notes}</p>`:''}</div>`;
  }
  $('#bConfirm')?.addEventListener('click',()=>{
    toast('Reservation request submitted. We’ll confirm shortly.');
    localStorage.setItem('hh-last-booking', JSON.stringify({...state,at:new Date().toISOString()}));
  });
  paint();
}

/* ---------- Login demo ---------- */
function initLogin(){
  const f=$('#loginForm'); if(!f) return;
  f.addEventListener('submit',(e)=>{
    e.preventDefault();
    const em=$('#loginEmail').value.trim().toLowerCase(), pw=$('#loginPass').value;
    if(em==='guest@hearthharvest-demo.com'&&pw==='demo123'){ toast('Demo login successful. Welcome back!'); localStorage.setItem('hh-role','guest'); setTimeout(()=>location.href='dashboard.html',700); }
    else if(em==='admin@hearthharvest-demo.com'&&pw==='admin123'){ toast('Demo admin login successful.'); localStorage.setItem('hh-role','admin'); setTimeout(()=>location.href='admin-dashboard.html',700); }
    else toast('Demo credentials not recognised. Try the demo logins shown.');
  });
}

/* ---------- Guest dashboard ---------- */
function initGuestDash(){
  if(!$('#guestDash')) return;
  // dietary persistence
  const boxes=$$('#prefs input[type=checkbox]'); const notes=$('#prefNotes');
  try{
    const saved=JSON.parse(localStorage.getItem('hh-prefs')||'{}');
    boxes.forEach(b=>{ if(saved.checks&&saved.checks.includes(b.value)) b.checked=true; });
    if(notes&&saved.notes) notes.value=saved.notes;
  }catch{}
  $('#prefSave')?.addEventListener('click',()=>{
    const checks=boxes.filter(b=>b.checked).map(b=>b.value);
    localStorage.setItem('hh-prefs',JSON.stringify({checks,notes:notes?notes.value:''}));
    toast('Preferences saved successfully.');
    const badge=$('#prefSummary'); if(badge) badge.textContent = checks.length?checks.join(' · '):'No restrictions noted';
  });
  // sidebar mobile
  const sb=$('#dashSide'), ov=$('#dashOver');
  $('#dashBurger')?.addEventListener('click',()=>{ sb.classList.remove('-translate-x-full'); ov.classList.remove('hidden'); });
  ov?.addEventListener('click',()=>{ sb.classList.add('-translate-x-full'); ov.classList.add('hidden'); });
  // tasting form
  $('#tasteForm')?.addEventListener('submit',(e)=>{
    e.preventDefault();
    const g=$('#tGuests').value, d=$('#tDate').value, t=$('#tTime').value;
    if(!g||!d||!t){ toast('Please complete guests, date and time.'); return; }
    toast('Reservation request submitted.');
    e.target.reset();
  });
  $$('[data-logout]').forEach(b=>b.addEventListener('click',()=>{ localStorage.removeItem('hh-role'); toast('Signed out (demo).'); setTimeout(()=>location.href='login.html',600); }));
}

/* ---------- Admin dashboard ---------- */
function initAdmin(){
  if(!$('#adminDash')) return;
  const sb=$('#adminSide'), ov=$('#adminOver');
  $('#adminBurger')?.addEventListener('click',()=>{ sb.classList.remove('-translate-x-full'); ov.classList.remove('hidden'); });
  ov?.addEventListener('click',()=>{ sb.classList.add('-translate-x-full'); ov.classList.add('hidden'); });
  // reservation status demo
  $$('[data-status]').forEach(btn=>btn.addEventListener('click',()=>{
    const row=btn.closest('tr'); const pill=row?.querySelector('[data-pill]');
    if(pill){ pill.textContent=btn.dataset.status;
      pill.className='text-[11px] font-bold px-2.5 py-1 rounded-full '+({Confirmed:'bg-green-100 text-green-800',Pending:'bg-amber-100 text-amber-800',Completed:'bg-stone-200 text-stone-700',Cancelled:'bg-red-100 text-red-700'}[btn.dataset.status]||'bg-stone-100');
      toast('Reservation '+btn.dataset.status.toLowerCase()+' (demo).');
    }
  }));
  // menu remove demo
  $$('[data-remove-dish]').forEach(b=>b.addEventListener('click',()=>{ b.closest('tr')?.remove(); toast('Menu item removed (demo).'); }));
  $('#addDish')?.addEventListener('click',()=>toast('Add Menu Item is a frontend demo — connect a backend for production.'));
  $$('[data-event-act]')?.forEach(b=>b.addEventListener('click',()=>toast('Event '+b.dataset.eventAct+' (demo).')));
  $$('[data-logout]').forEach(b=>b.addEventListener('click',()=>{ localStorage.removeItem('hh-role'); setTimeout(()=>location.href='login.html',400); }));
}

/* ---------- Contact ---------- */
function initContact(){
  const f=$('#contactForm'); if(!f) return;
  f.addEventListener('submit',(e)=>{ e.preventDefault();
    const n=$('#cName').value.trim(), em=$('#cEmail').value.trim(), m=$('#cMsg').value.trim();
    if(n.length<2||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)||m.length<5){ toast('Please complete name, valid email and message.'); return; }
    toast('Message sent. We reply within two days.'); f.reset();
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  initReveal(); initToTop(); initFAQ(); initSeasonSwitcher(); initEvents(); initBooking(); initLogin(); initGuestDash(); initAdmin(); initContact();
});
})();
