// Teza Solutions — main.js
document.addEventListener('DOMContentLoaded',()=>{
  // menu mobile
  const mb=document.getElementById('menuBtn'),mm=document.getElementById('mobileMenu');
  mb&&mb.addEventListener('click',()=>mm.classList.toggle('open'));

  // reveal au scroll
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }else{
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  }

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
