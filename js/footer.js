/* footer.js — ONLY footer HTML + injection */
(function(){
  const html = `
  <footer class="bg-[#F6F1E7] dark:bg-[#151815] text-[#2F3028] dark:text-[#F6F1E7] border-t border-[#e5d9c3] dark:border-[#333a33] mt-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <a href="index.html" class="flex items-center gap-2.5 shrink-0" aria-label="Hearth and Harvest home">
          <span class="w-10 h-10 rounded-full bg-[#3F5D45] dark:bg-[#6F8B72] text-white grid place-items-center font-serif-d text-lg" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21c-5 0-8-3.5-8-8 0-5 4-9 10-10-.5 6-1.5 10-6 12 2.5 1 3 .5 4-1 1 1.5 1.5 2 4 1-4.5 3.5-1 6 6-1.2 0-2.5 0-4 0z" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 21v-8" stroke-linecap="round"/></svg>
          </span>
          <span class="leading-none">
            <span class="block font-serif-d text-lg md:text-xl font-bold text-[#2F3028] dark:text-[#F6F1E7]">Hearth <span class="text-[#C98B5B] font-accent italic">&</span> Harvest</span>
            <span class="block text-[10.5px] tracking-[0.18em] uppercase text-[#8A6A3F] dark:text-[#C9AE8A] mt-1">Farm-to-Table · Supper Club</span>
          </span>
        </a>
        <p class="font-accent italic text-lg text-[#3F5D45] dark:text-[#e8dcc6] mt-4">“From Local Soil to Shared Table.”</p>
        <p class="mt-3 text-sm leading-relaxed opacity-75">A seasonal farm-to-table restaurant and supper club cooking with local growers, fishermen and artisans — one table, many stories.</p>
      </div>
      <nav aria-label="Explore">
        <h3 class="text-sm tracking-[0.18em] uppercase text-[#8A6A3F] dark:text-[#C98B5B] font-semibold mb-4">Explore</h3>
        <ul class="space-y-2.5 text-[15px]">
          <li><a class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" href="index.html">Home</a></li>
          <li><a class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" href="menu.html">Menu</a></li>
          <li><a class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" href="events.html">Supper Club Events</a></li>
          <li><a class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" href="about.html">Our Story</a></li>
          <li><a class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" href="sourcing.html">Local Sourcing</a></li>
        </ul>
      </nav>
      <nav aria-label="Guest">
        <h3 class="text-sm tracking-[0.18em] uppercase text-[#8A6A3F] dark:text-[#C98B5B] font-semibold mb-4">Guest</h3>
        <ul class="space-y-2.5 text-[15px]">
          <li><a class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" href="booking.html">Reserve a Table</a></li>
          <li><a class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" href="dashboard.html">Guest Dashboard</a></li>
          <li><a class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" href="dashboard.html#prefs">Dietary Preferences</a></li>
          <li><a class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" href="events.html">Upcoming Events</a></li>
          <li><a class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]" href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <div>
        <h3 class="text-sm tracking-[0.18em] uppercase text-[#8A6A3F] dark:text-[#C98B5B] font-semibold mb-4">Visit</h3>
        <address class="not-italic text-[15px] space-y-2 opacity-80">
          <p>14 Orchard Lane, Willow Creek Valley</p>
          <p><a href="tel:+15550147890" class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]">(555) 014-7890</a></p>
          <p><a href="mailto:hello@hearthharvest.example" class="hover:text-[#3F5D45] dark:hover:text-[#C98B5B]">hello@hearthharvest.example</a></p>
          <p class="text-sm">Tue–Sun · 5pm–10pm<br/>Supper Club · Fri & Sat</p>
        </address>
        <div class="flex gap-2.5 mt-4">
          <a href="#" aria-label="Instagram" class="w-9 h-9 grid place-items-center rounded-full border border-[#ddcfb4] dark:border-white/20 hover:bg-[#C98B5B] hover:border-[#C98B5B] hover:text-white transition"><svg class="w-4.5 h-4.5 w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
          <a href="#" aria-label="Facebook" class="w-9 h-9 grid place-items-center rounded-full border border-[#ddcfb4] dark:border-white/20 hover:bg-[#C98B5B] hover:border-[#C98B5B] hover:text-white transition"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.2v3h2.5v7h2.8z"/></svg></a>
          <a href="#" aria-label="Pinterest" class="w-9 h-9 grid place-items-center rounded-full border border-[#ddcfb4] dark:border-white/20 hover:bg-[#C98B5B] hover:border-[#C98B5B] hover:text-white transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 20c1-3 1.5-6 2-8M11.5 12c-.5-2 .8-4 2.8-4 1.8 0 3 1.2 3 2.9 0 2.2-1.4 4.1-3.3 4.1-.7 0-1.4-.4-1.6-1"/></svg></a>
        </div>
      </div>
    </div>
    <div class="border-t border-[#e5d9c3] dark:border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#8A6A3F] dark:text-[#cbbfa5]">
        <p>© 2026 Hearth & Harvest. All Rights Reserved.</p>
        <p class="flex gap-5"><a href="#" class="hover:text-[#3F5D45] dark:hover:text-white">Privacy Policy</a><a href="#" class="hover:text-[#3F5D45] dark:hover:text-white">Terms & Conditions</a></p>
      </div>
    </div>
  </footer>`;
  function mount(){
    const el = document.getElementById('footer');
    if(el) el.innerHTML = html;
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
