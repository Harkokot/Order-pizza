
function init(){

    //запрос на сервер для получения id пользователя и информации о товарах
    itemsInit();
    
}

function backetAdd(e){
    fetch("http://localhost:3000/itemAdd?client_id="+localStorage.getItem('client_id') + "&itemName=" + this.id,
        {
            method: 'GET'
        })
        .then(res => {
            if(res.status < 400){

            }
            else{
                //warning
            }
    });
}

function itemsInit(){
    //запрос на сервер для получения id пользователя и информации о товарах
    fetch("http://localhost:3000/getItems?client_id="+localStorage.getItem('client_id'),
        {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
        if(localStorage.getItem('client_id') == "null" || localStorage.getItem('client_id') == null){
            localStorage.setItem('client_id', res["client_id"]);
        console.log(localStorage.getItem('client_id'));
        }

        N = Math.ceil(res["PizzaInfo"].length / 3);
        arr = [];
        for(let i =0; i<N; i++)
        {
            arr.push([]);
            for(let j = 0; j<3; j++){
                if(i*3 + j+1<=res["PizzaInfo"].length){
                    arr[i].push(res["PizzaInfo"][i*3 + j]);
                }
            }
        }
        for(row of arr){
            const productRow = document.createElement('div');
            productRow.className = "productRow";
            for(piz of row){
                const pizza = document.createElement('div');
                pizza.className = "pizza"

                const pizzaImage = document.createElement('img');
                pizzaImage.src = "http://localhost:3000/" + piz['path'];
                pizzaImage.className = "pizzaImage";

                const pizzaName = document.createElement('p');
                pizzaName.className = "pizzaName";
                pizzaName.innerHTML = piz['name'];

                const pizzaDescription = document.createElement('p');
                pizzaDescription.className = "pizzaDescription";
                pizzaDescription.innerHTML = piz['info'];

                const addButton = document.createElement('button');
                addButton.className = "addButton";
                addButton.innerHTML = "+ Добавить в корзину";
                addButton.id = piz['name'];
                addButton.addEventListener('click', backetAdd);

                pizza.prepend(addButton);
                pizza.prepend(pizzaDescription);
                pizza.prepend(pizzaImage);
                pizza.prepend(pizzaName);
                productRow.append(pizza);
            }
            document.body.querySelector(".productField").append(productRow);
        }
    });
}