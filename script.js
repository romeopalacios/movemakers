document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-btn');
  const links=document.querySelector('.nav-links');
  if(menu&&links) menu.addEventListener('click',()=>links.classList.toggle('open'));

  document.querySelectorAll('.faq button').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq').classList.toggle('open')));
  document.querySelectorAll('.inventory-head').forEach(head=>head.addEventListener('click',()=>{
    const body=head.nextElementSibling; body.style.display=body.style.display==='none'?'grid':'none';
  }));

  const quoteForm=document.querySelector('form[data-quote-form]');
  const steps=[...document.querySelectorAll('.form-step')];
  const progress=[...document.querySelectorAll('.progress-item')];
  let current=0;
  const show=i=>{current=i;steps.forEach((s,idx)=>s.classList.toggle('active',idx===i));progress.forEach((p,idx)=>p.classList.toggle('active',idx===i));window.scrollTo({top:document.querySelector('.form-panel')?.offsetTop-110||0,behavior:'smooth'})};
  const validateStep=()=>{
    const fields=[...steps[current].querySelectorAll('input,select,textarea')];
    const invalid=fields.find(field=>!field.checkValidity());
    if(invalid){invalid.reportValidity();invalid.focus();return false}
    return true;
  };
  document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{if(validateStep()&&current<steps.length-1)show(current+1)}));
  document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>{if(current>0)show(current-1)}));

  if(quoteForm) quoteForm.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!validateStep()) return;
    const submit=quoteForm.querySelector('[data-submit]');
    const success=quoteForm.querySelector('.success');
    submit.disabled=true;
    submit.textContent='Sending request…';
    success.style.display='none';
    try{
      const response=await fetch(quoteForm.action,{method:'POST',body:new FormData(quoteForm),headers:{Accept:'application/json'}});
      if(!response.ok) throw new Error('Submission failed');
      quoteForm.reset();
      success.style.display='block';
      success.style.background='#eef8f1';
      success.style.color='#25613c';
      success.textContent='Your move request was sent. A coordinator will contact you after reviewing the details.';
      submit.textContent='Request received';
    }catch(error){
      success.style.display='block';
      success.style.background='#fff0ed';
      success.style.color='#9f2f1f';
      success.textContent='We could not send your request. Please check your connection and try again.';
      submit.disabled=false;
      submit.textContent='Submit Quote Request';
    }
  });

  document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();
    const success=form.querySelector('.success')||document.querySelector('.success');
    if(success){success.style.display='block'; success.textContent='Demo submitted. Connect this form to your preferred CRM/webhook before launch.'}
  }));
});
