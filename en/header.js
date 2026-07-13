// Shared EN header — injected into #header-mount
function initTezaHeader(){
  var page=document.body.getAttribute('data-page')||'';
  function act(p){return p===page?' class="active"':'';}
  var html=`
<header>
  <div class="nav">
    <a href="/en/" class="brand"><img src="/assets/teza-icon-marine.jpg" alt="Teza Solutions">Teza Solutions</a>
    <nav class="nav-links">
      <a href="/en/"${act('home')}>Home</a>
      <a href="/en/services.html"${act('services')}>Services</a>
      <a href="/en/about.html"${act('about')}>About</a>
      <a href="/en/faq.html"${act('faq')}>FAQ</a>
      <a href="/en/blog.html"${act('blog')}>Blog</a>
      <a href="/en/contact.html"${act('contact')}>Contact</a>
    </nav>
    <div class="nav-cta">
      <a href="${document.body.getAttribute('data-alt')||'/'}" class="lang-switch" aria-label="Passer en français">FR</a>
      <a href="/en/contact.html" class="btn btn-primary">Book a call</a>
      <button class="menu-btn" id="menuBtn" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a href="/en/">Home</a>
    <a href="/en/services.html">Services</a>
    <a href="/en/about.html">About</a>
    <a href="/en/faq.html">FAQ</a>
    <a href="/en/blog.html">Blog</a>
    <a href="/en/contact.html">Contact</a>
    <a href="${document.body.getAttribute('data-alt')||'/'}">Français</a>
    <a href="/en/contact.html" class="btn btn-primary" style="margin-top:14px;justify-content:center">Book a call</a>
  </div>
</header>`;
  var m=document.getElementById('header-mount');
  if(m){m.outerHTML=html;}
  var mb=document.getElementById('menuBtn'),mm=document.getElementById('mobileMenu');
  if(mb&&mm){mb.addEventListener('click',function(){mm.classList.toggle('open');});}
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initTezaHeader);}else{initTezaHeader();}
