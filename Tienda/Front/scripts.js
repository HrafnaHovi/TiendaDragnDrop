const carrito = document.getElementById('car');
const productos = document.getElementsByClassName('container-product');

for(var i=0; i<productos.length; i++){
    productos[i].setAttribute("id","container-product"+i)
    productos[i].addEventListener("dragstart",(ev => inicio(ev)))
}
function inicio(ev){
    ev.dataTransfer.setData("id",ev.target.id);
}

carrito.addEventListener('dragover', e =>{
    e.preventDefault();
})
carrito.addEventListener('drop', ev =>{
    addToCarClicked(ev);
})

const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer'
);

//funcion para agregar, trata de agregar la opcion de drag 
function addToCarClicked(ev){

    var data = ev.dataTransfer.getData('id');
    const title = document.getElementById(data).textContent;
    const price = document.getElementById(data).textContent;
    const da = price.split('$')
    const de = title.split(' ');
    const titulo = `${de[24]} ${de[25]} ${de[26]}`;

    añadirAlCarrito(titulo,da[1].split(' ')[0]);
}

function añadirAlCarrito(title,price) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
    for(let i = 0; i<elementsTitle.length;i++){
        if(elementsTitle[i].innerHTML == title){
            let elementQuantity = elementsTitle[i].parentElement.parentElement.
            parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            UpdateTotal();
            return;
        }
    }
    console.log(elementsTitle);
    const RowCarro = document.createElement('div');
    const shoppingCarContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${title}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">$${price}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="button-OUT" type="button">Remover</button>
            </div>
        </div>
    </div>`
    RowCarro.innerHTML = shoppingCarContent;
    shoppingCartItemsContainer.append(RowCarro);

    RowCarro
    .querySelector('.button-OUT')
    .addEventListener('click',removeElement);

    RowCarro
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change',cantidadCambiada);


    UpdateTotal();
}

function UpdateTotal(){
    let TotalCarro = 0;
    const CarroTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach(shoppingCartItem =>{
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
            );

        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$','')
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        TotalCarro = TotalCarro + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    CarroTotal.innerHTML = `$${TotalCarro.toFixed(2)}`;

    
}

function FinalizarCompra(){
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
    if(elementsTitle.length > 0){
        window.alert("Gracias por comprar");
    }else{
    window.alert("No hay nada en el carrito");
    }
    location. reload();
}

function removeElement(event){
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    UpdateTotal();
}

function cantidadCambiada(event){
    const ingreso = event.target;
    if(ingreso.value <=0){
        ingreso.value = 1;
    }
    UpdateTotal();
}



