"use strict";

//seccion de la tienda 
var addToShoppCarButtons = document.querySelectorAll('.button-add');
addToShoppCarButtons.forEach(function (addToCarButtons) {
  addToCarButtons.addEventListener('drop', addToCarClicked);
});
var shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer'); //funcion para agregar, trata de agregar la opcion de arrastrar

function addToCarClicked(event) {
  var button = event.target;
  var container = button.closest('.container-product');
  var title = container.querySelector('.title').textContent;
  var price = container.querySelector('.price').textContent;
  var image = container.querySelector('.image').src;
  añadirAlCarrito(title, price, image);
}

function añadirAlCarrito(title, price, image) {
  var elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');

  for (var i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText == title) {
      var elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
      elementQuantity.value++;
      UpdateTotal();
      return;
    }
  }

  var RowCarro = document.createElement('div');
  var shoppingCarContent = "\n    <div class=\"row shoppingCartItem\">\n        <div class=\"col-6\">\n            <div class=\"shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3\">\n                <img src=".concat(image, " class=\"shopping-cart-image\">\n                <h6 class=\"shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0\">").concat(title, "</h6>\n            </div>\n        </div>\n        <div class=\"col-2\">\n            <div class=\"shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3\">\n                <p class=\"item-price mb-0 shoppingCartItemPrice\">").concat(price, "</p>\n            </div>\n        </div>\n        <div class=\"col-4\">\n            <div\n                class=\"shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3\">\n                <input class=\"shopping-cart-quantity-input shoppingCartItemQuantity\" type=\"number\"\n                    value=\"1\">\n                <button class=\"button-OUT\" type=\"button\">Remover</button>\n            </div>\n        </div>\n    </div>");
  RowCarro.innerHTML = shoppingCarContent;
  shoppingCartItemsContainer.append(RowCarro);
  RowCarro.querySelector('.button-OUT').addEventListener('click', removeElement);
  RowCarro.querySelector('.shoppingCartItemQuantity').addEventListener('change', cantidadCambiada);
  UpdateTotal();
}

function UpdateTotal() {
  var TotalCarro = 0;
  var CarroTotal = document.querySelector('.shoppingCartTotal');
  var shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  shoppingCartItems.forEach(function (shoppingCartItem) {
    var shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
    var shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', ''));
    var shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
    var shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
    TotalCarro = TotalCarro + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  CarroTotal.innerHTML = "$".concat(TotalCarro.toFixed(2));
  /*if(TotalCarro == 0){
      window.alert("no has comprado nada");
  }
  if(TotalCarro != 0){
      window.alert("Gracias por comprar");
  }*/
}

function removeElement(event) {
  var buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  UpdateTotal();
}

function cantidadCambiada(event) {
  var ingreso = event.target;

  if (ingreso.value <= 0) {
    ingreso.value = 1;
  }

  UpdateTotal();
}