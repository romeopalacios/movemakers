document.addEventListener('DOMContentLoaded',()=>{
  const sheetsEndpoint='https://script.google.com/macros/s/AKfycbwZFeVB9n03fotukZS5KlRXE88lNcsLSAVbRSMdr_US4Qspfw4JOYJ9b8cyn6o6sUk/exec';
  const inventoryCatalog={
    'Bed':['Bed','Queen Bed','King Bed','Full Bed','Twin Bed','Platform (Queen) Bed','California King Bed','Bunk Bed','Platform (King) Bed','Double Bed','Toddler Bed','Single Bed','Canopy Bed','Settee Bed','Hospital Bed','Sleep Number Bed','Water Bed'],
    'Table':['Table','Coffee Table','End Table','Dining Table','Side Table','Kitchen Table','Dining, Medium Bedside Table','Folding Table','Console Table','Dining, Small Table','Patio Entry Table','Dining, Large Table','Kitchen, Small Table','Sofa Table','Card Table','Breakfast Table','Drop Leaf Table','Nesting Table','Massage, Folding Table','Marble Top Table','Massage Table','Conference Table','Kitchen w/ Glass Top Table','Nesting, Large'],
    'Chair':['Chair','Dining Chair','Office Chair','Kitchen Armchair','Medium Chair','Desk Armchair','Folding Chair','Patio Chair','Rocking Chair','Computer Chair','Recliner Armchair','Small Chair','High Chair','Arm Chair','Recliner Chair','Office (Small) Chair','Outdoor Armchair','Large Chair','Child Chair','Overstuffed Chair','Occasional Chair','Arm Upholstered Chair','Stackable Chair','Glider Chair','Wicker Chair','Bistro Chair','Club Chair','Office (Large) Chair','Wingback Chair','Breakfast Chair','Folding Lounge Chair','Lawn Chair','Dining w/ Arms Chair','Plastic Stackable Chair','Straight Chair','Papasan Chair','Executive Chair','Baby Bouncy Chair','Aluminum Chair','Boudoir Chair','Secretary Chair'],
    'Sofa':['Sofa','3 Seater Sofa','Loveseat Sofa','Sectional 2 Piece Sofa','Sectional 3 Piece Sofa','Sofa Bed','4 Seater Sofa','Sectional 4 Piece Sofa','Queen Sofa Bed'],
    'Picture':['Picture','Medium Picture','Large Picture','Small Picture'],
    'TV':['TV Flat 32\"-50\"','TV Flat 50\"-65\"','TV Stand','TV Cabinet, Medium','TV Flat 21\"-32\"','TV Cabinet, Large','TV Mount','TV Cabinet, Small','TV Flat 65\"-75\"'],
    'Mirror':['Mirror','Medium Mirror','Large Mirror','Small Mirror','Floor Mirror','Standing Vanity','Medium w/ Mirror','Extra Large Vanity','Small w/ Mirror','Large w/ Mirror'],
    'Armoire':['Armoire','Medium Armoire','Large Armoire','Small Armoire','Medium w/ Glass Doors','Large w/ Glass Doors','Small w/ Glass Doors'],
    'Air Conditioner':['Air Conditioner','Small Air Conditioner','Medium Air Conditioner','Large Air Conditioner'],
    'Aquarium':['Aquarium','Aquarium Stand, Small','20 Gallon Aquarium','10 Gallon Aquarium','Aquarium Stand, Large','55 Gallon Aquarium'],
    'BBQ':['Barbecue Grill','Barbecue Grill, Small'],
    'Bed Frame':['Bed Frame, Wood','Bed Frame, Metal'],
    'Bench':['Bench','Small Bench','Bedside Bench','Piano Work Bench','Regular Bench','Large Bench','Outdoor Work Bench','Fireside Bench'],
    'Bookcase':['Bookcase','Medium Bookcase','Small Bookcase','Large Bookcase','Straight Small Bookcase','Leaning Bookcase','Straight Medium Bookcase','Folding Bookcase','Extra Large Bookcase','Straight Large Bookcase'],
    'Box':['Box','Medium Box','Large Box','Small Wardrobe Box','Book Box','Dish Pack Box','Extra Large Box','China Box','Wardrobe Box','Fan Box','File - Legal Box','File - Letter Box','Hat Box'],
    'Box Spring':['Box Spring'],
    'Mattress':['Mattress Only','Queen Mattress Only','King Mattress Only','Full Mattress Only','Twin Mattress Only','Crib Mattress Only','Double Mattress'],
    'Buffet':['Buffet','Buffet, Bottom','Buffet, Small','Buffet, Top'],
    'Bureau':['Dresser, Glass'],
    'Cabinet':['File Cabinet, 2 Drawer (must be empty)','Cabinet, Small','Cabinet, Medium','China Cabinet','Curio File Cabinet, 3 Drawer (must be empty)','Cabinet, Jewelry','File Cabinet, 4 Drawer (must be empty)','Cabinet, Bar','File Cabinet, Small','Cabinet, Display Small','Cabinet, Large','Cabinet, Display Medium','China Cabinet, Large','Cabinet, Corner','Cabinet, Side','Cabinet, Cocktail','Cabinet, Pantry','China Cabinet, Medium','Cabinet, Utility','Cabinet, Kitchen','Cabinet, Stereo','File Cabinet, Large','File Cabinet, 5 Drawer (must be empty)','Cabinet, Display Large','Cabinet, Music'],
    'Chandelier':['Chandelier','Small Chandelier','Medium Chandelier','Large Chandelier'],
    'Chest':['Chest of Drawers','Chest, Small','Chest, Medium','Cedar Toy Chest','Chest, Large','Lingerie Chest','Night Stand, Glass'],
    'Clock':['Clock','Wall Clock','Grandfather Clock','Grandmother Clock'],
    'Credenza':['Credenza','Medium Credenza','Small Credenza','Large Credenza'],
    'Desk':['Desk','Computer Desk, Small','Desk, Regular','Desk, Office','Computer Desk, Medium','Computer Desk, Small','Corner Desk','Computer Desk, Large','Secretary Desk','Hutch Desk','Return, L-Shaped Desk','Executive Desk','Rolltop Desk','Office w/ Return Desk','Double Desk'],
    'Lamp':['Lamp','Table Lamp','Floor Lamp','Desk Lamp','Wall Lamp'],
    'Appliances':['Refrigerator','Washer','Washer/Dryer Combo','Double Refrigerator','Stove','Refrigerator, Large','Dishwasher']
  };
  const menu=document.querySelector('.menu-btn');
  const links=document.querySelector('.nav-links');
  if(menu&&links) menu.addEventListener('click',()=>links.classList.toggle('open'));

  document.querySelectorAll('.faq button').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq').classList.toggle('open')));
  document.querySelectorAll('.inventory-head').forEach(head=>head.addEventListener('click',()=>{
    const body=head.nextElementSibling; body.style.display=body.style.display==='none'?'grid':'none';
  }));

  const quoteForm=document.querySelector('form[data-quote-form]');
  const inventoryRows=document.querySelector('[data-inventory-rows]');
  if(inventoryRows){
    const addInventoryRow=()=>{
      const row=document.createElement('div');
      row.className='inventory-row';
      row.innerHTML='<div class="field"><label>Category</label><select data-inventory-category><option value="">Select category</option></select></div><div class="field"><label>Item</label><select data-inventory-item disabled><option value="">Choose a category first</option></select></div><div class="field"><label>Quantity</label><input data-inventory-quantity type="number" min="1" value="1" inputmode="numeric"></div><button type="button" class="inventory-remove" aria-label="Remove inventory item">×</button><input type="hidden" name="inventory[]" data-inventory-value disabled>';
      const category=row.querySelector('[data-inventory-category]');
      const item=row.querySelector('[data-inventory-item]');
      const quantity=row.querySelector('[data-inventory-quantity]');
      const output=row.querySelector('[data-inventory-value]');
      Object.keys(inventoryCatalog).forEach(name=>category.add(new Option(name,name)));
      const sync=()=>{output.value=category.value&&item.value?`${category.value}: ${item.value} (Qty: ${quantity.value||1})`:'';output.disabled=!output.value};
      category.addEventListener('change',()=>{
        item.innerHTML='<option value="">Select item</option>';
        (inventoryCatalog[category.value]||[]).forEach(name=>item.add(new Option(name,name)));
        item.disabled=!category.value;
        sync();
      });
      item.addEventListener('change',sync);
      quantity.addEventListener('input',sync);
      row.querySelector('.inventory-remove').addEventListener('click',()=>{row.remove();updateRemoveButtons()});
      inventoryRows.append(row);
      updateRemoveButtons();
    };
    const updateRemoveButtons=()=>{const buttons=inventoryRows.querySelectorAll('.inventory-remove');buttons.forEach(button=>button.disabled=buttons.length===1)};
    document.querySelector('[data-add-inventory]').addEventListener('click',addInventoryRow);
    addInventoryRow();
  }
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

  const quickQuote=document.querySelector('form[data-quick-quote]');
  if(quickQuote) quickQuote.addEventListener('submit',e=>{
    e.preventDefault();
    if(!quickQuote.reportValidity()) return;
    const params=new URLSearchParams(new FormData(quickQuote));
    window.location.href=`quote.html?${params.toString()}`;
  });

  if(quoteForm){
    const params=new URLSearchParams(window.location.search);
    ['origin_zip','destination_zip','move_date','home_size'].forEach(name=>{
      const value=params.get(name);
      const field=quoteForm.elements.namedItem(name);
      if(value&&field) field.value=value;
    });
  }

  if(quoteForm) quoteForm.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!validateStep()) return;
    const submit=quoteForm.querySelector('[data-submit]');
    const success=quoteForm.querySelector('.success');
    submit.disabled=true;
    submit.textContent='Sending request…';
    success.style.display='none';
    try{
      const buildSubmissionData=()=>{
        quoteForm.querySelectorAll('[data-inventory-other]').forEach(field=>{
          const value=field.value.trim();
          field.nextElementSibling.value=value?`${field.dataset.category}: ${value}`:'';
          field.nextElementSibling.disabled=!value;
        });
        const data=new FormData(quoteForm);
        data.delete('_gotcha');
        return data;
      };
      const formData=buildSubmissionData();
      const response=await fetch(quoteForm.action,{method:'POST',body:formData,headers:{Accept:'application/json'}});
      if(!response.ok) throw new Error('Submission failed');
      let savedToSheet=true;
      try{
        const sheetData=buildSubmissionData();
        const inventoryItems=sheetData.getAll('inventory[]').filter(Boolean);
        sheetData.delete('inventory[]');
        if(inventoryItems.length) sheetData.append('inventory[]',inventoryItems.join('; '));
        await fetch(sheetsEndpoint,{method:'POST',body:sheetData,mode:'no-cors'});
      }catch(error){savedToSheet=false}
      quoteForm.reset();
      success.style.display='block';
      success.style.background='#eef8f1';
      success.style.color='#25613c';
      success.textContent=savedToSheet?'Your move request was sent and added to the coordinator queue. A coordinator will contact you after reviewing the details.':'Your move request was sent, but the coordinator queue could not be updated. The team was still notified by email.';
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
