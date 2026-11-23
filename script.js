const products = [
  {id:1,name:'The Sunday Throw',category:'Home',price:68,rating:'4.9',reviews:28,badge:'Bestseller',image:'photo-1600210492486-724fe5c67fb0',alt:'Soft woven throw draped across a sofa'},
  {id:2,name:'Everyday Stoneware Set',category:'Kitchen',price:42,rating:'4.8',reviews:16,badge:'Small batch',image:'photo-1490312278390-ab64016e0aa9',alt:'Handmade neutral ceramic tableware'},
  {id:3,name:'Quiet Hours Candle',category:'Lifestyle',price:32,rating:'5.0',reviews:41,badge:'A little favorite',image:'photo-1603006905003-be475563bc59',alt:'Scented candle in a warm, quiet space'},
  {id:4,name:'The Market Tote',category:'Accessories',price:38,rating:'4.9',reviews:22,badge:'',image:'photo-1544816155-12df9643f363',alt:'Natural canvas carryall bag'},
  {id:5,name:'Sunday Morning Mug',category:'Kitchen',price:24,rating:'4.7',reviews:19,badge:'',image:'photo-1514228742587-6b1558fcca3d',alt:'Hand-finished ceramic mug'},
  {id:6,name:'Soft Landing Cushion',category:'Home',price:54,rating:'4.9',reviews:31,badge:'Bestseller',image:'photo-1584100936595-c0654b55a2e2',alt:'Textured neutral cushion on a chair'},
  {id:7,name:'Little Rituals Set',category:'Lifestyle',price:46,rating:'4.8',reviews:12,badge:'Gift-ready',image:'photo-1608571423902-eed4a5ad8108',alt:'A collection of small self-care essentials'},
  {id:8,name:'The Weekend Pouch',category:'Accessories',price:29,rating:'4.9',reviews:14,badge:'',image:'photo-1590874103328-eac38a683ce7',alt:'Simple everyday zip pouch'}
];
const grid=document.querySelector('#product-grid');
const empty=document.querySelector('.empty-state');
const toast=document.querySelector('.toast');
let activeCategory='All',searchTerm='',cart=0,toastTimer;
function renderProducts(){
  let shown=products.filter(p=>(activeCategory==='All'||p.category===activeCategory)&&p.name.toLowerCase().includes(searchTerm));
  const sort=document.querySelector('#sort-select').value;
  if(sort==='low')shown.sort((a,b)=>a.price-b.price);if(sort==='high')shown.sort((a,b)=>b.price-a.price);
  grid.innerHTML=shown.map(p=>`<article class="product-card"><div class="product-image-wrap">${p.badge?`<span class="product-badge">${p.badge}</span>`:''}<img class="product-image" src="https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=750&q=82" alt="${p.alt}" loading="lazy"><button class="quick-add" data-add="${p.id}">Add to bag <span>＋</span></button></div><div class="product-info"><div class="product-name-row"><h3 class="product-name">${p.name}</h3><span class="product-price">$${p.price}</span></div><div class="product-meta"><span>${p.category}</span><span><span class="rating">★★★★★</span> ${p.rating} (${p.reviews})</span></div></div></article>`).join('');
  empty.hidden=shown.length>0;
}
function setCategory(category){activeCategory=category;document.querySelectorAll('.filter-button').forEach(b=>b.classList.toggle('active',b.dataset.filter===category));renderProducts();document.querySelector('#shop').scrollIntoView({behavior:'smooth'});}
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2300);}
document.querySelectorAll('.filter-button').forEach(b=>b.addEventListener('click',()=>setCategory(b.dataset.filter)));
document.querySelectorAll('.category-tile').forEach(b=>b.addEventListener('click',()=>setCategory(b.dataset.category)));
document.querySelectorAll('[data-nav-category]').forEach(a=>a.addEventListener('click',()=>setCategory(a.dataset.navCategory)));
document.querySelector('#sort-select').addEventListener('change',renderProducts);
document.querySelector('.search-form').addEventListener('submit',e=>{e.preventDefault();searchTerm=document.querySelector('#search-input').value.trim().toLowerCase();activeCategory='All';document.querySelectorAll('.filter-button').forEach(b=>b.classList.toggle('active',b.dataset.filter==='All'));renderProducts();document.querySelector('#shop').scrollIntoView({behavior:'smooth'});});
document.querySelector('#search-input').addEventListener('input',e=>{searchTerm=e.target.value.trim().toLowerCase();activeCategory='All';document.querySelectorAll('.filter-button').forEach(b=>b.classList.toggle('active',b.dataset.filter==='All'));renderProducts();});
document.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add){cart++;document.querySelector('.cart-count').textContent=cart;document.querySelector('.cart-button').setAttribute('aria-label',`Shopping bag, ${cart} ${cart===1?'item':'items'}`);const product=products.find(p=>p.id===Number(add.dataset.add));showToast(`${product.name} added to your bag`);}});
document.querySelector('.cart-button').addEventListener('click',()=>showToast(cart?`Your bag has ${cart} ${cart===1?'item':'items'} — checkout is not enabled in this demo.`:'Your bag is waiting for something good.'));
document.querySelector('.menu-toggle').addEventListener('click',e=>{const nav=document.querySelector('.main-nav'),open=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open);});
document.querySelector('#view-all').addEventListener('click',()=>showToast('You’re all caught up on the good stuff.'));
document.querySelectorAll('.offer-form,.footer-signup').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();showToast('Thanks for stopping by! Email sign-up is a demo.');form.reset();}));
document.querySelectorAll('.review-controls button').forEach((b,i)=>b.addEventListener('click',()=>showToast(i?'More kind words coming soon.':'You’re at the first review.')));
renderProducts();
