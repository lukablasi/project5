const api = 'http://localhost:3000/api/teddies';

function makeRequest() {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', api);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    reject('Oooops, something went wrong');
                    document.querySelector('main').outerHTML = '<h1 class="text-center m-2"> Oooops, something went wrong... </h1>';
                    console.log('Oooops, something went wrong');
                }
            }
        }
    });
};



async function populateProducts() {
    const main = document.querySelector('.products');
    const response = makeRequest();
    const apiData = await response;
    for (let i in apiData) {
        const product = document.createElement('div');
        const card = document.createElement('div');
        const link = document.createElement('a');
        const img = document.createElement('IMG');
        const cardTitle = document.createElement('div');

        product.classList.add('col-12', 'col-md-6');
        card.classList.add('card');
        img.classList.add('card-img-top');
        cardTitle.classList.add('card-body', 'bg-success', 'text-center', 'text-light');

        img.setAttribute('src', apiData[i].imageUrl);
        link.setAttribute('href', 'product.html' + '?id=' + apiData[i]._id);


        cardTitle.innerHTML = '<h5>' + apiData[i].name + ' - ' + apiData[i].price / 100 + "$" + '</h5>';

        main.appendChild(product);
        product.appendChild(link);
        link.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardTitle);
    }

}

populateProducts();
updateCartNumber();

async function appearItem() {
    const item = document.querySelector('.item');
    const description = document.querySelector('.description');

    const response = makeRequest();
    const apiData = await response;

    const element = document.createElement('div');
    const card = document.createElement('div');
    const img = document.createElement('IMG');
    const cardTitle = document.createElement('div');
    const iName = document.createElement('div');
    const iDescription = document.createElement('div');
    const dropDown = document.createElement('form');
    const dropDownLabel = document.createElement('label');
    const iColor = document.createElement('select');
    const iPrice = document.createElement('div');
    const input = document.createElement('input');
    const number = document.createElement('select');



    item.appendChild(element);
    element.appendChild(card);
    card.appendChild(img);
    card.appendChild(cardTitle);
    description.appendChild(iName);
    description.appendChild(iDescription);
    description.appendChild(dropDown);
    dropDown.appendChild(dropDownLabel);
    dropDown.appendChild(iColor);
    description.appendChild(iPrice);
    dropDown.appendChild(input);

    const location = String(window.location.href);

    for (let i in apiData) {
        if (location.includes(apiData[i]._id)) {

            img.setAttribute('src', apiData[i].imageUrl);
            img.setAttribute('id', 'itempicture');
            img.classList.add('w-100');

            iName.innerHTML = '<h3>' + apiData[i].name + '</h3>';
            iName.classList.add('text-center', 'h-25');
            iName.setAttribute('id', 'name');

            iDescription.innerHTML = '<p>' + apiData[i].description + '</p>';
            iDescription.classList.add('h-25');

            dropDown.classList.add('h-25', 'form-group', 'row');
            dropDown.setAttribute('action', 'cart.html');
            dropDownLabel.setAttribute('for', 'dropdown');

            input.classList.add('m-auto', 'px-4', 'py-2', 'bg-secondary', 'text-light');
            input.setAttribute('type', 'submit');
            input.setAttribute('value', 'Add to cart');
            input.setAttribute('onclick', 'addToCart()');

            iColor.classList.add('form-control', 'col-6');
            iColor.setAttribute('id', 'dropdown');


            for (let x in apiData[i].colors) {
                const singleColor = document.createElement('option');
                iColor.appendChild(singleColor);

                singleColor.innerHTML = apiData[i].colors[x];
                singleColor.classList.add('bg-success', 'text-light', 'p-2', 'm-2');

            };
            
            iPrice.innerHTML = '<h4>' + apiData[i].price / 100 + '$' + '</h4>';
            iPrice.classList.add('h-25');
            iPrice.setAttribute('id', 'price');
        }
    }


}

appearItem();

function displayFinalPrice() {
    let finalPrice = document.getElementById('finalPrice');
    let itemsPrice;
    let totalItemsPrice = 0;
    finalPrice.classList.add('text-center');
    for (let i = 0; i < localStorage.length; i++) {
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        itemsPrice = Number(data.price.slice(0, -1)) * Number(data.quantity);
        totalItemsPrice = totalItemsPrice + itemsPrice;
        finalPrice.innerHTML = `Your cart total cost is ${totalItemsPrice}$`;
    }
};




function addToCart() {
    const url = window.location.href;
    const id = url.split('=').pop();
    const selectColor = document.getElementById('dropdown').value;
    const img = document.getElementById('itempicture').src;
    const price = document.getElementById('price').textContent;
    const qty = document.querySelector('#number').value;

    let storeItem = {
        id: id,
        color: selectColor,
        img: img,
        price: price,
        quantity: qty,
    };
    
    let idValidator = localStorage.getItem(storeItem.id + storeItem.color);
    if (idValidator === null){
    localStorage.setItem(storeItem.id + storeItem.color, JSON.stringify(storeItem));
    } else {
        let quantityInACart = JSON.parse(idValidator);
        
        quantityInACart = quantityInACart.quantity;
        let quantityToSave = Number(quantityInACart) + Number(storeItem.quantity);
        
        storeItem.quantity = quantityToSave;
        localStorage.setItem(storeItem.id + storeItem.color, JSON.stringify(storeItem));
        
    }

};

function displayCart() {

    let itemsPrice;
    let totalItemsPrice = 0;

    const priceHolder = document.getElementById('priceHolder');
    
    let removeCartItemButtons = document.getElementsByClassName('btn-danger');
        

    for (let i = 0; i < localStorage.length; i++) {
        
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));

        const cartList = document.getElementById('cartList');

        const listItem = document.createElement('div');
        const itemPicture = document.createElement('div');
        const itemColor = document.createElement('div');
        const itemPrice = document.createElement('div');
        const quantity = document.createElement('div');
        const itemDelete = document.createElement('div');
        const deleteButton = document.createElement('button');

        cartList.appendChild(listItem);
        listItem.appendChild(itemPicture);
        listItem.appendChild(itemColor);
        listItem.appendChild(itemPrice);
        listItem.appendChild(quantity);
        listItem.appendChild(itemDelete);
        itemDelete.appendChild(deleteButton);

        listItem.classList.add('row');
        itemPicture.classList.add('col-3');
        itemColor.classList.add('col-2');
        itemColor.classList.add('m-auto');
        itemPrice.classList.add('col-2');
        itemPrice.classList.add('m-auto');
        quantity.classList.add('col-2');
        quantity.classList.add('m-auto');
        itemDelete.classList.add('col-3');
        itemDelete.classList.add('m-auto');
        listItem.classList.add('gb-light');
        deleteButton.classList.add('btn-danger')
        deleteButton.classList.add('btn')
        deleteButton.classList.add('text-light')

        itemPicture.innerHTML = `<img class='img-fluid' src=${data.img}>`;
        itemColor.innerHTML = data.color;
        itemPrice.innerHTML = data.price;
        quantity.innerHTML = `quantity: ${data.quantity}`;
        deleteButton.innerHTML = 'Remove';

        
        itemsPrice = Number(data.price.slice(0, -1)) * Number(data.quantity);
        totalItemsPrice = totalItemsPrice + itemsPrice;
        priceHolder.innerHTML = `Your cart total cost is ${totalItemsPrice}$`;
        
        

        let button = removeCartItemButtons[i];
        button.addEventListener('click', function(event) {
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        localStorage.removeItem(data.id + data.color);
        window.location.reload();
    });
    }

}

displayCart();

const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const firstAddress = document.getElementById('firstAddress');
const secondAddress = document.getElementById('secondAddress');
const city = document.getElementById('city');
const postCode = document.getElementById('postCode');

form.addEventListener('submit', (e) => {
    e.preventDefault();
   checkInputs();
   }) ;

function checkInputs() {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const firstAddressValue = firstAddress.value.trim();
    const secondAddressValue = secondAddress.value.trim();
    const cityValue = city.value.trim();
    const postCodeValue = postCode.value.trim();
    
    if (firstNameValue === '' || lastNameValue === '' || emailValue === '' || firstAddressValue === '' || secondAddressValue === '' || cityValue === '' || postCodeValue === '') {
        alert('Some required fields are missing!')
    } else {
        window.location.href = 'confirmation.html';
        
    }
};

function displayOrderNumber() {
    let dateStamp = Date.now().toString();
    let orderNumber = document.getElementById('orderNumber');
    if (localStorage.length > 0) {
    orderNumber.innerHTML = `${dateStamp} - ${localStorage.length}`;
    displayFinalPrice();
    } else {
        orderNumber.innerHTML = 'Go to home page.'
    };
    localStorage.clear();
};

function updateCartNumber() {
    let totalQuantity = 0;
    let itemQuantity;
    for (let i = 0; i < localStorage.length; i++) {

        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        
        itemQuantity = data.quantity;
        
        totalQuantity = totalQuantity + Number(itemQuantity);
        document.getElementById('cart').innerHTML = 'Items in your cart: ' + totalQuantity;
    }
};

