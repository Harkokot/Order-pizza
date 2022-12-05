
function init(){
    itemsInit();
}

function itemsInit(){
    fetch("http://localhost:3000/getBascket?client_id="+localStorage.getItem('client_id'),
        {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            if(Object.keys(res).length == 0 || Object.keys(res['items']).length == 0){
                const itemName = document.createElement('p');
                itemName.className = "itemName";
                itemName.innerHTML = "Нет пиццы( где-то грустит один итальянец!";

                document.body.querySelector('.itemField').append(itemName);
            }
            else{
                for(el of Object.keys(res['items'])){
                    const item = document.createElement('div');
                    item.className = "bascketItem";

                    const quantity = document.createElement('p');
                    quantity.className = "quantity";
                    quantity.innerHTML = "Количество: " + res['items'][el];

                    const itemName = document.createElement('p');
                    itemName.className = "itemName";
                    itemName.innerHTML = el;

                    const deleteImage = document.createElement('img');
                    deleteImage.src = "./img/bin.svg";
                    deleteImage.className = "deleteImage";
                    deleteImage.id = el;
                    deleteImage.addEventListener('click', deleteFromBascket);

                    item.append(itemName);
                    item.append(quantity);
                    item.append(deleteImage);
                    document.body.querySelector('.itemField').append(item);
            }
        }
    })
}

function deleteFromBascket(e){
    fetch("http://localhost:3000/deleteItemFromBuscket?client_id="+localStorage.getItem('client_id')+"&itemName="+this.id,
        {
            method: 'GET'
        })
        .then(res => {
            if(res.status<400){
                location.reload()
            }
            else{

            }
    })
}