let carts = document.querySelectorAll('.add-cart')

let menus = [
    {
        name: 'Idly',
        tag: 'idly',
        price: 25,
        inCart: 0
    },
    {
        name: 'Medhu Vadai',
        tag: 'medhuvadai',
        price: 10,
        inCart: 0
    },
    {
        name: 'Dosa',
        tag: 'dosa',
        price: 80,
        inCart: 0
    },
    {
        name: 'Poori',
        tag: 'poori',
        price: 85,
        inCart: 0
    },
    {
        name: 'Noodles',
        tag: 'noodles',
        price: 90,
        inCart: 0
    },
    {
        name: 'Samosa',
        tag: 'samosa',
        price: 20,
        inCart: 0
    },
    {
        name: 'Pani pori',
        tag: 'panipori',
        price: 20,
        inCart: 0
    },
    {
        name: 'French Fries',
        tag: 'fries',
        price: 70,
        inCart: 0
    },
    {
        name: 'Chicken Tikka',
        tag: 'chickentikka',
        price: 130,
        inCart: 0
    }
]
for(let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(menus[i]);
        TotalCost(menus[i]);
    })
}

function cartNumbers(menu) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers',productNumbers+1);
    }
    else {
        localStorage.setItem('cartNumbers',1);
    }
    setItems(menu);
}

function setItems(menu) {
    let cartItems = localStorage.getItem('Menuincart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null) {
        if(cartItems[menu.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [menu.tag]: menu
            }
        }
        cartItems[menu.tag].inCart += 1;
    } else {
        menu.inCart = 1;
        cartItems = {
            [menu.tag]: menu
        }
    }
    document.cookie = menu.tag + "=" + JSON.stringify(cartItems[menu.tag]) + "; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/";
    localStorage.setItem('Menuincart', JSON.stringify
    (cartItems));
}

function TotalCost(menu) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost+menu.price);
    } else {
        localStorage.setItem("totalCost", menu.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("Menuincart");
    let cartCost = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");

    console.log(cartItems);

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="./static/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">
                Rs.${item.price}.00
            </div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                Rs.${item.inCart * item.price}.00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total</h4>
                <h4 class="basketTotal">Rs.${cartCost}.00</h4>
            </div>
        `;
    }
}
displayCart();