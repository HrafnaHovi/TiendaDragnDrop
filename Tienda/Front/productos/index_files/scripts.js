let products = [];
let total = 0;

function add(product,price){
    console.log(product,price);
    products.push(product);
    total = total + price;
    document.getElementById("cleckout").innerHTML = `$${total}`
}

function pay(){
    window.alert(products.join(", \n"));
}