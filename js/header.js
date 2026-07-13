// Header partagé FR — injecté dans #header-mount
// Détecte la page active via data-page sur le body
function initTezaHeader(){
  var page=document.body.getAttribute('data-page')||'';
  function act(p){return p===page?' class="active"':'';}
  var html=`
<header>
  <div class="nav">
    <a href="/" class="brand"><img src="/assets/teza-icon-marine.jpg" alt="Teza Solutions">Teza Solutions</a>
    <nav class="nav-links">
      <a href="/"${act('accueil')}>Accueil</a>
      <a href="/services.html"${act('services')}>Services</a>
      <a href="/a-propos.html"${act('apropos')}>À propos</a>
      <a href="/faq.html"${act('faq')}>FAQ</a>
      <a href="/blog.html"${act('blog')}>Blogue</a>
      <a href="/contact.html"${act('contact')}>Contact</a>
    </nav>
    <div class="nav-cta">
      <a href="${document.body.getAttribute('data-alt')||'/en/'}" class="lang-switch" aria-label="Switch to English">EN</a>
      <a href="/contact.html" class="btn btn-primary">Réserver un appel</a>
      <button class="menu-btn" id="menuBtn" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a href="/">Accueil</a>
    <a href="/services.html">Services</a>
    <a href="/a-propos.html">À propos</a>
    <a href="/faq.html">FAQ</a>
    <a href="/blog.html">Blogue</a>
    <a href="/contact.html">Contact</a>
    <a href="${document.body.getAttribute('data-alt')||'/en/'}">English</a>
    <a href="/contact.html" class="btn btn-primary" style="margin-top:14px;justify-content:center">Réserver un appel</a>
  </div>
</header>`;
  var m=document.getElementById('header-mount');
  if(m){m.outerHTML=html;}
  // ré-attacher le menu mobile (le bouton vient d'être injecté)
  var mb=document.getElementById('menuBtn'),mm=document.getElementById('mobileMenu');
  if(mb&&mm){mb.addEventListener('click',function(){mm.classList.toggle('open');});}
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initTezaHeader);}else{initTezaHeader();}

