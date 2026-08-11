const books=[
 {id:1,title:'Fiqih untuk Pemula',cat:'islam',label:'FIQIH\nUNTUK PEMULA',price:65000},
 {id:2,title:'Catatan Seorang Pembaca',cat:'novel',label:'CATATAN\nSEORANG PEMBACA',price:72000},
 {id:3,title:'Jalan Menuntut Ilmu',cat:'islam',label:'JALAN\nMENUNTUT ILMU',price:58000},
 {id:4,title:'Seni Bertumbuh',cat:'self',label:'SENI\nBERTUMBUH',price:69000},
 {id:5,title:'Kisah di Balik Halaman',cat:'novel',label:'KISAH DI BALIK\nHALAMAN',price:75000},
 {id:6,title:'Adab dan Akhlak',cat:'islam',label:'ADAB &\nAKHLAK',price:62000},
 {id:7,title:'Pelan-Pelan Menjadi Hebat',cat:'self',label:'PELAN-PELAN\nMENJADI HEBAT',price:70000},
 {id:8,title:'Perpustakaan Senja',cat:'novel',label:'PERPUSTAKAAN\nSENJA',price:68000}
];
let cart=[];
const grid=document.getElementById('bookGrid');
const format=n=>'Rp'+n.toLocaleString('id-ID');
function renderBooks(category='all'){
 grid.innerHTML=books.filter(b=>category==='all'||b.cat===category).map(b=>`
 <article class="product"><div class="cover">${b.label.replace('\n','<br>')}</div>
 <div class="category">${b.cat==='self'?'Pengembangan Diri':b.cat==='islam'?'Islami':'Novel'}</div>
 <h3>${b.title}</h3><div class="price">${format(b.price)}</div>
 <button class="add" onclick="addToCart(${b.id})">+ Tambah ke keranjang</button></article>`).join('');
}
function addToCart(id){const b=books.find(x=>x.id===id);cart.push(b);renderCart();openCart()}
function removeFromCart(i){cart.splice(i,1);renderCart()}
function renderCart(){
 document.getElementById('cartCount').textContent=cart.length;
 const box=document.getElementById('cartItems');
 box.innerHTML=cart.length?cart.map((b,i)=>`<div class="cart-row"><span>${b.title}<br><small>${format(b.price)}</small></span><button class="remove" onclick="removeFromCart(${i})">Hapus</button></div>`).join(''):'<p style="color:#888">Keranjang masih kosong.</p>';
 document.getElementById('cartTotal').textContent=format(cart.reduce((s,b)=>s+b.price,0));
}
function openCart(){document.getElementById('cartPanel').classList.add('open');document.getElementById('overlay').classList.add('show')}
function closeCart(){document.getElementById('cartPanel').classList.remove('open');document.getElementById('overlay').classList.remove('show')}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderBooks(btn.dataset.category)}));
document.getElementById('cartBtn').onclick=openCart;
document.getElementById('closeCart').onclick=closeCart;
document.getElementById('overlay').onclick=closeCart;
document.getElementById('checkout').onclick=()=>alert(cart.length?'Terima kasih! Fitur pembayaran dapat dihubungkan ke payment gateway nanti.':'Keranjang masih kosong.');
renderBooks();
renderCart();
