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
    //    dropDown.appendChild(number);


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
            dropDown.setAttribute('action', 'index.html');
            dropDownLabel.setAttribute('for', 'dropdown');

            input.classList.add('m-auto', 'px-4', 'py-2', 'bg-secondary', 'text-light');
            input.setAttribute('type', 'submit');
            input.setAttribute('value', 'Add to cart');
            input.setAttribute('onclick', 'addToCart()');

            iColor.classList.add('form-control', 'col-6');
            iColor.setAttribute('id', 'dropdown');

            //            number.classList.add('col-6');
            //            number.setAttribute('id', 'number');

            for (let x in apiData[i].colors) {
                const singleColor = document.createElement('option');
                iColor.appendChild(singleColor);

                singleColor.innerHTML = apiData[i].colors[x];
                singleColor.classList.add('bg-success', 'text-light', 'p-2', 'm-2');

            };
            //
            //                            for (i = 1; i < 20; i++) {
            //                            const itemNumber = document.createElement('option');
            //                            number.appendChild(itemNumber);
            //                            
            //                            itemNumber.innerHTML = i;
            //                            
            //                        };

            iPrice.innerHTML = '<h4>' + apiData[i].price / 100 + '$' + '</h4>';
            iPrice.classList.add('h-25');
            iPrice.setAttribute('id', 'price');
        }
    }


}

appearItem();

const cartStorage = {
    key: '123123123',
    content: []
};
document.getElementById('cart').innerHTML = 'Items in your cart ' + localStorage.length;

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




    cartStorage.content.push(storeItem);
    localStorage.setItem(localStorage.length, JSON.stringify(cartStorage));


};

function displayCart() {

    const cartList = document.getElementById('cartList');

    const listItem = document.createElement('div');
    const itemPicture = document.createElement('div');
    const itemColor = document.createElement('div');
    const itemPrice = document.createElement('div');
    const itemDelete = document.createElement('div');
    const deleteButton = document.createElement('button');

    listItem.classList.add('row');
    itemPicture.classList.add('col-3');
    itemColor.classList.add('col-3');
    itemColor.classList.add('m-auto');
    itemPrice.classList.add('col-3');
    itemPrice.classList.add('m-auto');
    itemDelete.classList.add('col-3');
    itemDelete.classList.add('m-auto');
    listItem.classList.add('gb-light');
    deleteButton.classList.add('btn-danger')
    deleteButton.classList.add('btn')
    deleteButton.classList.add('text-light')



    cartList.appendChild(listItem);



    for (let i = 0; i < localStorage.length; i++) {

        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let value = localStorage[data];
        console.log(value);

        listItem.appendChild(itemPicture);
        listItem.appendChild(itemColor);
        listItem.appendChild(itemPrice);
        listItem.appendChild(itemDelete);
        itemDelete.appendChild(deleteButton);

        itemPicture.innerHTML = `<img class='img-fluid' src=${data.content[i].img}>`;
        itemColor.innerHTML = data.content[i].color;
        itemPrice.innerHTML = data.content[i].price;
        deleteButton.innerHTML = 'Remove';

    }

}

displayCart();



//makeRequest = () => {
//    return new Promise((resolve, reject) => {
//        let apiRequest = new XMLHttpRequest();
//        apiRequest.open('GET', 'http://localhost:3000/api/teddies/');
//        apiRequest.send();
//        apiRequest.onreadystatechange = () => {
//            if (apiRequest.readyState === 4) {
//                if (apiRequest.status === 200) {
//                    //if ready state and status return success codes resolve promise with response.
//                    resolve(JSON.parse(apiRequest.response));
//                }
//                else {
//                    //if unsuccessfull reject with error message.
//                    reject('Something Went Wrong - API Request Failed!!!');
//                }
//            }
//        }
//    });
//}
//
//createCard = (response) => {
//    const main = document.querySelector('p');
//    for (let i in response) {
//        //create elements for the card
//        const card = document.createElement('Article');
//        const img = response[i].imageUrl;
//        const newImg = document.createElement('IMG');
//        const newA = document.createElement('a');
//
//        //add the bootstrap classes and attributes
//        card.classList.add('col-12', 'col-sm-6', 'card', 'p-3', 'm-0');
//        //id is passed in a querystring
//        newA.setAttribute('href', 'item.html?id=' + response[i]._id);
//        newA.textContent = 'View More Details';
//        newImg.classList.add('img');
//        newImg.setAttribute('width', '100%');
//        newImg.setAttribute('src', img);
//
//        //items description added
//        card.innerHTML += '<h2>' + response[i].name + '</h2>';
//        card.innerHTML += '<p>' + response[i].description + '</p>';
//        card.innerHTML += '<p>' + '$' + response[i].price / 100 + '</p>';
//
//        //append the completed elements to the card
//        card.appendChild(newImg);
//        card.appendChild(newA);
//        main.appendChild(card);
//    }
//}
//
//init = async () => {
//    try {
//        //call makeRequest for api request and await response
//        const requestPromise = makeRequest();
//        const response = await requestPromise;
//        //pass response to createCard function to display results
//        createCard(response);
//    } catch (error) {
//        //error message displayed if request fails.
//        document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '<h2>';
//    }
//}
//
//init();