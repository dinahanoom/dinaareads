const books=[{'title': 'Bulughul Maram', 'author': 'Ibnu Hajar Al-Asqalani', 'cat': 'Hadits', 'price': 85000, 'color': 'brown', 'arabic': 'بُلُوغُ الْمَرَام'}, {'title': 'Fathul Qarib', 'author': 'Ibnu Qasim Al-Ghazi', 'cat': 'Fiqih', 'price': 75000, 'color': 'green', 'arabic': 'فَتْحُ الْقَرِيب'}, {'title': 'Riyadhus Shalihin', 'author': 'Imam An-Nawawi', 'cat': 'Hadits', 'price': 95000, 'color': 'olive', 'arabic': 'رِيَاضُ الصَّالِحِينَ'}, {'title': 'Tafsir Jalalain', 'author': 'Al-Mahalli & As-Suyuthi', 'cat': 'Tafsir', 'price': 120000, 'color': 'navy', 'arabic': 'تَفْسِيرُ الْجَلَالَيْن'}, {'title': 'Aqidatul Awam', 'author': 'Syekh Ahmad Al-Marzuqi', 'cat': 'Akidah', 'price': 65000, 'color': 'maroon', 'arabic': 'عَقِيدَةُ الْعَوَام'}, {'title': 'Safinatun Najah', 'author': 'Syekh Salim bin Sumair', 'cat': 'Fiqih', 'price': 60000, 'color': 'teal', 'arabic': 'سَفِينَةُ النَّجَاة'}, {'title': 'Al-Adzkar', 'author': 'Imam An-Nawawi', 'cat': 'Hadits', 'price': 90000, 'color': 'purple', 'arabic': 'الْأَذْكَار'}, {'title': 'Tafsir Ibnu Katsir', 'author': 'Ibnu Katsir', 'cat': 'Tafsir', 'price': 145000, 'color': 'gold', 'arabic': 'تَفْسِيرُ ابْنِ كَثِير'}];
let cart=[];
const rupiah=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
const grid=document.querySelector('#grid'),search=document.querySelector('#search');
function render(){
 const cat=document.querySelector('.filters .active').dataset.cat,q=search.value.toLowerCase();
 const list=books.filter(b=>(cat==='Semua'||b.cat===cat)&&(b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q)));
 grid.innerHTML=list.map((b,i)=>`<article class="card"><div class="cover" style="background-image:url('images/kitab-${books.indexOf(b)+1}.svg')"><span>${b.arabic}</span></div><div class="body"><div class="cat">${b.cat.toUpperCase()}</div><h3>${b.title}</h3><div class="author">${b.author}</div><div class="bottom"><b class="price">${rupiah(b.price)}</b><button class="add" onclick="add(${books.indexOf(b)})">+ Keranjang</button></div></div></article>`).join('')||'<p>Kitab tidak ditemukan.</p>';
}
function add(i){cart.push(books[i]);update();openCart()}
function remove(i){cart.splice(i,1);update()}
function update(){document.querySelector('#count').textContent=cart.length;document.querySelector('#items').innerHTML=cart.length?cart.map((b,i)=>`<div class="item"><span><b>${b.title}</b><br>${rupiah(b.price)}</span><button onclick="remove(${i})">Hapus</button></div>`).join(''):'<p style="color:#888">Keranjang masih kosong.</p>';document.querySelector('#total').textContent=rupiah(cart.reduce((s,b)=>s+b.price,0))}
function openCart(){document.querySelector('#cart').classList.add('open');document.querySelector('#overlay').classList.add('show')}
function closeCart(){document.querySelector('#cart').classList.remove('open');document.querySelector('#overlay').classList.remove('show')}
document.querySelectorAll('.filters button').forEach(x=>x.onclick=()=>{document.querySelector('.filters .active').classList.remove('active');x.classList.add('active');render()});
search.oninput=render;document.querySelector('#cartBtn').onclick=openCart;document.querySelector('#close').onclick=closeCart;document.querySelector('#overlay').onclick=closeCart;
document.querySelector('#checkout').onclick=()=>alert(cart.length?'Pesanan siap diproses!':'Keranjang masih kosong.');
render();
