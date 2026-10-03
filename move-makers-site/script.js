document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-btn');
  const links=document.querySelector('.nav-links');
  if(menu&&links) menu.addEventListener('click',()=>links.classList.toggle('open'));

  document.querySelectorAll('.faq button').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq').classList.toggle('open')));
  document.querySelectorAll('.inventory-head').forEach(head=>head.addEventListener('click',()=>{
    const body=head.nextElementSibling; body.style.display=body.style.display==='none'?'grid':'none';
  }));

  const steps=[...document.querySelectorAll('.form-step')];
  const progress=[...document.querySelectorAll('.progress-item')];
  let current=0;
  const show=i=>{current=i;steps.forEach((s,idx)=>s.classList.toggle('active',idx===i));progress.forEach((p,idx)=>p.classList.toggle('active',idx===i));window.scrollTo({top:document.querySelector('.form-panel')?.offsetTop-110||0,behavior:'smooth'})};
  document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{if(current<steps.length-1)show(current+1)}));
  document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>{if(current>0)show(current-1)}));

  document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();
    const success=form.querySelector('.success')||document.querySelector('.success');
    if(success){success.style.display='block'; success.textContent='Demo submitted. Connect this form to your preferred CRM/webhook before launch.'}
  }));
});
