// Toggle password
function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

// CEK LOGIN
if(location.pathname.includes("login.html")){
  const user = localStorage.getItem("loggedInUser");
  if(user){
    // Kalau sudah login, langsung ke home
    window.location.href = "home.html";
  }
}

// LOGIN BUTTON
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const msg = document.getElementById("loginMsg");

  if(!u || !p){
    msg.innerText = "Isi username & password!";
    return;
  }

  // Simpan user login
  localStorage.setItem("loggedInUser", u);

  // Redirect ke home
  window.location.href = "home.html";
});

// CEK LOGIN DI HOME.HTML
if(location.pathname.includes("home.html")){
  const user = localStorage.getItem("loggedInUser");
  if(!user){
    window.location.href = "login.html";
  }
}

// ================== CART ==================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(id,name,price){
  const item = cart.find(i=>i.id===id);
  if(item) item.qty++;
  else cart.push({id,name,price,qty:1});
  saveCart(); renderCart();
}

// SAVE CART
function saveCart(){ localStorage.setItem("cart",JSON.stringify(cart)); }

// RENDER CART
function renderCart(){
  const box=document.getElementById("cartItems");
  const totalBox=document.getElementById("cartTotal");
  if(!box||!totalBox) return;
  box.innerHTML=""; let total=0;
  if(!cart.length){ box.innerHTML="<p>Keranjang kosong</p>"; totalBox.innerText="Rp 0"; return;}
  cart.forEach(item=>{
    total+=item.price*item.qty;
    box.innerHTML+=`
      <div class="cart-item">
        <span>${item.name} x${item.qty}</span>
        <div class="qty-control">
          <button onclick="changeQty(${item.id},-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id},1)">+</button>
        </div>
        <strong>Rp ${(item.price*item.qty).toLocaleString()}</strong>
      </div>`;
  });
  totalBox.innerText="Rp "+total.toLocaleString();
}

// CHANGE QTY
function changeQty(id,delta){
  const item=cart.find(i=>i.id===id);
  if(!item)return;
  item.qty+=delta;
  if(item.qty<=0) cart=cart.filter(i=>i.id!==id);
  saveCart(); renderCart();
}

// CLEAR CART
function clearCart(){
  if(!cart.length) return;
  if(!confirm("Kosongkan keranjang?")) return;
  cart=[]; saveCart(); renderCart();
}

// CHECKOUT WA
function checkoutWA(){
  if(!cart.length){ alert("Keranjang kosong!"); return; }
  let msg="Halo min, saya mau pesan:%0A";
  let total=0;
  cart.forEach(i=>{ msg+=`• ${i.name} x${i.qty} = Rp ${(i.price*i.qty).toLocaleString()}%0A`; total+=i.price*i.qty; });
  msg+=`%0A*Total: Rp ${total.toLocaleString()}*`;
  window.open("https://wa.me/6283879414716?text="+msg,"_blank");
}

// INIT
document.addEventListener("DOMContentLoaded",renderCart);