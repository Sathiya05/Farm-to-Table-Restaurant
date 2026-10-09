/* navbar.js — ONLY navbar HTML + injection + navbar behavior */
(function(){
  function themeIcon(){
    const dark = document.documentElement.classList.contains('dark');
    return dark
      ? '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
  }
  const html = `
  <header id="siteHeader" class="sticky top-0 z-50 bg-[#F6F1E7]/95 dark:bg-[#20251F]/95 backdrop-blur border-b border-[#e5d9c3] dark:border-[#3a423a] transition-shadow">
    <nav aria-label="Primary" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-[76px] gap-2">
        <a href="index.html" class="flex items-center gap-2.5 shrink-0" aria-label="Hearth and Harvest home">
          <span class="w-10 h-10 rounded-full bg-[#3F5D45] dark:bg-[#6F8B72] text-white grid place-items-center font-serif-d text-lg" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21c-5 0-8-3.5-8-8 0-5 4-9 10-10-.5 6-1.5 10-6 12 2.5 1 3 .5 4-1 1 1.5 1.5 2 4 1-4.5 3.5-1 6 6-1.2 0-2.5 0-4 0z" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 21v-8" stroke-linecap="round"/></svg>
          </span>
          <span class="leading-none">
            <span class="block font-serif-d text-lg md:text-xl font-bold text-[#2F3028] dark:text-[#F6F1E7]">Hearth <span class="text-[#C98B5B] font-accent italic">&</span> Harvest</span>
            <span class="block whitespace-nowrap text-[9.5px] sm:text-[10.5px] tracking-[0.1em] sm:tracking-[0.18em] uppercase text-[#8A6A3F] dark:text-[#C9AE8A]">Farm-to-Table · Supper Club</span>
          </span>
        </a>

        <!-- Desktop center: full site links (Dashboard sits where Login was) -->
        <div class="hidden xl:flex items-center gap-4 2xl:gap-6 text-sm font-medium">
          <div class="relative group/nav">
            <button data-nav-group="index.html, home2.html" class="inline-flex items-center gap-1.5 py-2 text-[#2F3028] dark:text-[#F6F1E7] hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" aria-haspopup="true" aria-expanded="false">Home
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="nav-drop absolute start-0 top-full pt-2">
              <div class="w-48 rounded-xl bg-white dark:bg-[#2B3029] shadow-xl border border-[#ece2cf] dark:border-[#3c443c] p-2">
                <a data-nav="index.html" href="index.html" class="block px-3 py-2 rounded-lg hover:bg-[#F6F1E7] dark:hover:bg-[#353b34]">Home 1</a>
                <a data-nav="home2.html" href="home2.html" class="block px-3 py-2 rounded-lg hover:bg-[#F6F1E7] dark:hover:bg-[#353b34]">Home 2</a>
              </div>
            </div>
          </div>
          <a data-nav="about.html" href="about.html" class="py-2 hover:text-[#3F5D45] dark:hover:text-[#C98B5B]">About</a>
          <a data-nav="menu.html" href="menu.html" class="py-2 hover:text-[#3F5D45] dark:hover:text-[#C98B5B]">Menu</a>
          <a data-nav="events.html" href="events.html" title="Supper Club Events" class="py-2 hover:text-[#3F5D45] dark:hover:text-[#C98B5B]">Supper Club</a>
          <a data-nav="contact.html" href="contact.html" class="py-2 hover:text-[#3F5D45] dark:hover:text-[#C98B5B]">Contact</a>
          <div class="relative group/nav">
            <button data-nav-group="dashboard.html, admin-dashboard.html" class="inline-flex items-center gap-1.5 py-2 text-[#2F3028] dark:text-[#F6F1E7] hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" aria-haspopup="true" aria-expanded="false">Dashboard
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="nav-drop absolute start-0 top-full pt-2">
              <div class="w-56 rounded-xl bg-white dark:bg-[#2B3029] shadow-xl border border-[#ece2cf] dark:border-[#3c443c] p-2 text-sm">
                <a data-nav="dashboard.html" href="dashboard.html" class="block px-3 py-2 rounded-lg hover:bg-[#F6F1E7] dark:hover:bg-[#353b34]">User Dashboard</a>
                <a data-nav="admin-dashboard.html" href="admin-dashboard.html" class="block px-3 py-2 rounded-lg hover:bg-[#F6F1E7] dark:hover:bg-[#353b34]">Admin Dashboard</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop right: toggles + Login (swapped) + Reserve CTA -->
        <div class="hidden xl:flex items-center gap-2">
          <button id="themeToggle" aria-label="Toggle dark mode" title="Toggle theme" class="w-10 h-10 grid place-items-center rounded-full border border-[#ddcfb4] dark:border-[#4a534a] text-[#3F5D45] dark:text-[#F6F1E7] hover:bg-[#3F5D45] hover:text-white transition"></button>
          <button id="rtlToggle" aria-label="Toggle right-to-left layout" title="Toggle RTL / LTR" class="w-10 h-10 grid place-items-center rounded-full border border-[#ddcfb4] dark:border-[#4a534a] text-[#3F5D45] dark:text-[#F6F1E7] hover:bg-[#C98B5B] hover:text-white hover:border-[#C98B5B] transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4"/></svg>
          </button>
          <a data-nav="login.html" href="login.html" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#ddcfb4] dark:border-[#4a534a] text-sm font-semibold hover:border-[#3F5D45] hover:text-[#3F5D45] dark:hover:text-[#C98B5B] transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21v-1a7 7 0 0114 0v1"/></svg>
            Login
          </a>
          <a href="contact.html" class="btn-primary text-sm font-semibold px-5 py-2.5 rounded-full">Reserve a Table</a>
        </div>

        <div class="flex xl:hidden items-center gap-2">
          <button id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu" class="w-10 h-10 grid place-items-center rounded-full bg-[#3F5D45] text-white">
            <svg id="hamOpen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            <svg id="hamClose" class="w-5 h-5 hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>
      </div>
    </nav>

    <div id="mobileMenu" class="xl:hidden overflow-hidden max-h-0 opacity-0" aria-hidden="true">
      <div class="px-4 pb-5 pt-1 border-t border-[#e5d9c3] dark:border-[#3a423a] bg-[#F6F1E7] dark:bg-[#20251F]">
        <div class="py-1">
          <button id="mHomeBtn" data-nav-group="index.html, home2.html" aria-expanded="false" aria-controls="mHomeSub" class="w-full flex items-center justify-between py-3 font-semibold">Home
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
          <div id="mHomeSub" class="hidden ps-3 pb-1 text-[15px]">
            <a data-nav="index.html" href="index.html" class="block py-2">Home 1</a>
            <a data-nav="home2.html" href="home2.html" class="block py-2">Home 2</a>
          </div>
          <a data-nav="about.html" href="about.html" class="block py-3 font-semibold border-t border-[#e8ddc6] dark:border-[#333a33]">About</a>
          <a data-nav="menu.html" href="menu.html" class="block py-3 font-semibold border-t border-[#e8ddc6] dark:border-[#333a33]">Menu</a>
          <a data-nav="events.html" href="events.html" class="block py-3 font-semibold border-t border-[#e8ddc6] dark:border-[#333a33]">Supper Club Events</a>
          <a data-nav="contact.html" href="contact.html" class="block py-3 font-semibold border-t border-[#e8ddc6] dark:border-[#333a33]">Contact</a>
          <button id="mDashBtn" data-nav-group="dashboard.html, admin-dashboard.html" aria-expanded="false" aria-controls="mDashSub" class="w-full flex items-center justify-between py-3 font-semibold border-t border-[#e8ddc6] dark:border-[#333a33]">Dashboard
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
          <div id="mDashSub" class="hidden ps-3 pb-1 text-[15px]">
            <a data-nav="dashboard.html" href="dashboard.html" class="block py-2">User Dashboard</a>
            <a data-nav="admin-dashboard.html" href="admin-dashboard.html" class="block py-2">Admin Dashboard</a>
          </div>
        </div>
        <div class="flex items-center gap-2 pt-3 border-t border-[#e8ddc6] dark:border-[#333a33]">
          <button id="themeToggleM" aria-label="Toggle dark mode" title="Toggle theme" class="w-10 h-10 shrink-0 grid place-items-center rounded-full border border-[#ddcfb4] dark:border-[#4a534a] text-[#3F5D45] dark:text-[#F6F1E7] hover:bg-[#3F5D45] hover:text-white transition"></button>
          <button id="rtlToggleM" aria-label="Toggle right-to-left layout" title="Toggle RTL / LTR" class="flex-1 py-2.5 rounded-full border border-[#ddcfb4] dark:border-[#4a534a] text-sm font-semibold hover:border-[#C98B5B] hover:text-[#C98B5B] transition">RTL / LTR</button>
        </div>
        <div class="flex items-center gap-2 pt-2">
          <a data-nav="login.html" href="login.html" class="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-[#ddcfb4] dark:border-[#4a534a] text-sm font-semibold hover:border-[#3F5D45] hover:text-[#3F5D45] dark:hover:text-[#C98B5B] transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21v-1a7 7 0 0114 0v1"/></svg>
            Login
          </a>
          <a href="contact.html" class="flex-1 text-center py-2.5 rounded-full bg-[#3F5D45] text-white text-sm font-semibold">Reserve a Table</a>
        </div>
      </div>
    </div>
  </header>`;

  function mount(){
    const slot = document.getElementById('navbar');
    if(!slot) return;
    slot.innerHTML = html;

    // sticky shadow on scroll (header itself is sticky via CSS)
    const header = document.getElementById('siteHeader');
    const onScroll = ()=>{
      if(window.scrollY > 8) header.classList.add('shadow-lg');
      else header.classList.remove('shadow-lg');
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    // theme init (persisted)
    const savedTheme = localStorage.getItem('site-theme');
    if(savedTheme === 'dark') document.documentElement.classList.add('dark');
    if(savedTheme === 'light') document.documentElement.classList.remove('dark');

    const paint = ()=>{
      const b1=document.getElementById('themeToggle'), b2=document.getElementById('themeToggleM');
      if(b1) b1.innerHTML = themeIcon();
      if(b2) b2.innerHTML = themeIcon();
    };
    paint();

    function toggleTheme(){
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
      paint();
    }
    const t1=document.getElementById('themeToggle'), t2=document.getElementById('themeToggleM');
    if(t1) t1.addEventListener('click', toggleTheme);
    if(t2) t2.addEventListener('click', toggleTheme);

    // RTL init (persisted)
    const savedDir = localStorage.getItem('site-direction');
    if(savedDir === 'rtl') document.documentElement.dir = 'rtl';
    else document.documentElement.dir = 'ltr';
    function toggleDir(){
      const next = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.dir = next;
      localStorage.setItem('site-direction', next === 'rtl' ? 'rtl' : 'ltr');
    }
    const r1=document.getElementById('rtlToggle'), r2=document.getElementById('rtlToggleM');
    if(r1) r1.addEventListener('click', toggleDir);
    if(r2) r2.addEventListener('click', toggleDir);

    // Active nav (desktop links, dropdown parents, mobile menu)
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('[data-nav]').forEach(a=>{
      if(a.getAttribute('data-nav').toLowerCase() === page){
        a.classList.add('nav-active');
        const group = a.closest('[class*="group/"]');
        if(group){ const btn = group.querySelector(':scope > button'); if(btn) btn.classList.add('nav-active'); }
      }
    });
    document.querySelectorAll('[data-nav-group]').forEach(b=>{
      const list = b.getAttribute('data-nav-group').split(',').map(s=>s.trim().toLowerCase());
      if(list.includes(page)) b.classList.add('nav-active');
    });
    // open mobile submenu that contains the active page
    document.querySelectorAll('#mobileMenu .nav-active').forEach(el=>{
      const sub = el.parentElement;
      if(sub && sub.classList.contains('hidden')){
        sub.classList.remove('hidden');
        const btn = sub.id ? document.querySelector('[aria-controls="'+sub.id+'"]') : null;
        if(btn) btn.setAttribute('aria-expanded','true');
      }
    });

    // Mobile menu
    const ham = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    const oI = document.getElementById('hamOpen'), cI = document.getElementById('hamClose');
    let open=false;
    function setMenu(v){
      open=v;
      if(v){ menu.style.maxHeight = menu.scrollHeight + 'px'; menu.style.opacity='1'; menu.setAttribute('aria-hidden','false'); }
      else { menu.style.maxHeight='0px'; menu.style.opacity='0'; menu.setAttribute('aria-hidden','true'); }
      ham.setAttribute('aria-expanded', String(v));
      ham.setAttribute('aria-label', v?'Close menu':'Open menu');
      oI.classList.toggle('hidden', v); cI.classList.toggle('hidden', !v);
    }
    if(ham) ham.addEventListener('click', (e)=>{ e.stopPropagation(); setMenu(!open); });
    document.addEventListener('click', (e)=>{ if(open && !menu.contains(e.target) && !ham.contains(e.target)) setMenu(false); });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && open) setMenu(false); });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>setMenu(false)));

    // Mobile submenus
    const hb=document.getElementById('mHomeBtn'), hs=document.getElementById('mHomeSub');
    const db=document.getElementById('mDashBtn'), ds=document.getElementById('mDashSub');
    if(hb) hb.addEventListener('click', ()=>{
      const show = hs.classList.toggle('hidden');
      hb.setAttribute('aria-expanded', String(!show));
      menu.style.maxHeight = menu.scrollHeight + 'px';
    });
    if(db) db.addEventListener('click', ()=>{
      const show = ds.classList.toggle('hidden');
      db.setAttribute('aria-expanded', String(!show));
      menu.style.maxHeight = menu.scrollHeight + 'px';
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
