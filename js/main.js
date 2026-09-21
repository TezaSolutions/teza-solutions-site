// Teza Solutions — main.js
document.addEventListener('DOMContentLoaded',()=>{
  // (le menu mobile est géré par header.js après injection du header)

  // ── APPARITION AU DEFILEMENT ──────────────────────────────────────────
  // ⛔ LE SEUIL EN POURCENTAGE RENDAIT LES PAGES LEGALES INVISIBLES.
  // `threshold:.12` exige que 12 % du bloc soit visible. Sur les pages de
  // politique, tout le texte vit dans UN SEUL bloc `.prose.reveal` de
  // 2 483 px : dans une fenetre de 577 px, au mieux 146 px sont visibles,
  // soit 5,9 %. Le seuil n'etait JAMAIS atteint, meme en defilant — le
  // bloc restait a `opacity:0` et la page paraissait VIDE.
  // Mesure faite sur en/privacy-policy.html, en ligne depuis juillet.
  //
  // `threshold:0` declenche des qu'UN pixel entre : c'est le comportement
  // voulu (« ca apparait quand ca arrive a l'ecran »), et il ne depend
  // plus de la hauteur du bloc.
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }else{
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  }

  // ⛔ FILET : si l'animation n'a pas joue apres 1,2 s, on affiche quand
  // meme. Un texte legal qui reste invisible parce qu'une animation a
  // echoue, c'est une page que Meta refuse et un client qui ne peut pas
  // lire ses droits. L'effet visuel ne doit JAMAIS empecher la lecture.
  setTimeout(()=>{document.querySelectorAll('.reveal:not(.in)').forEach(el=>el.classList.add('in'))},1200);

  // formulaire contact (Web3Forms)
  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',async(e)=>{
      e.preventDefault();
      const hp=form.querySelector('#website');
      if(hp&&hp.value.trim()!=='')return;
      const ok=document.getElementById('form-ok'),err=document.getElementById('form-err'),btn=document.getElementById('form-btn');
      if(ok)ok.hidden=true;if(err)err.hidden=true;
      if(btn){btn.disabled=true;btn.dataset.label=btn.textContent;btn.textContent=btn.dataset.sending||'Envoi en cours...';}
      try{
        const r=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
        const d=await r.json();
        if(d.success){form.reset();if(ok)ok.hidden=false;}else{if(err)err.hidden=false;}
      }catch(_){if(err)err.hidden=false;}
      finally{if(btn){btn.disabled=false;btn.textContent=btn.dataset.label;}}
    });
  }
});
