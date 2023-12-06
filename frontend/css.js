

const loginBtn = document.querySelector(".signin")
const allProductsBtn = document.querySelector(".create")
const emailInput = document.querySelector(".email_input")
const nameInput = document.querySelector(".name_input")
const passwordInput = document.querySelector(".password_input")
const productCard = document.querySelector(".card")

const login = async()=>{
    const email = emailInput.value
    const name = nameInput.value
    const password = passwordInput.value
    console.log({ email, password, name });

    const response = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name})
  });


  const content = await response.json();

  sessionStorage.setItem("session", content.accessToken)

//   console.log(content.accessToken);
}

const getAllProducts = async()=>{
    const session = sessionStorage.getItem("session")
    if(!session) return

    const response = await fetch('https://techtrove-backend.onrender.com/api/all-products', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${session}`
    },
    // body: JSON.stringify({email, password, name})
  });


  const content = await response.json();

  console.log(content.products);
  content.products.forEach((each, i)=>{
    
        productCard.innerHTML +=
        `<div>
            <h3>${each.name}</h3>
            <img src=${each.image} alt="ProductImage" />
        </div>`
    
  })

}


loginBtn.addEventListener("click", login)
allProductsBtn.addEventListener("click", getAllProducts)