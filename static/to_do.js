const inputToDo = document.querySelector(".inputToDo");
function updateIn(elem){
    let id_to_do = elem.getAttribute('to_do_id')
    console.log('dans la fonction',elem.value, id_to_do);
    fetch('/api/todo/add',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            id : id_to_do,
            newVal : elem.value
        })
    })
};
function checkedItem(item){
    let del;
    if(item.checked){
        let inputText = document.querySelector('input[value="' + item.id + '"]');
        inputText.style.textDecorationLine = 'line-through';
        inputText.style.opacity = '0.2';
        del = true
    }
    else{
        let inputText = document.querySelector('input[value="' + item.id + '"]');
        inputText.style.textDecorationLine =  '';
        inputText.style.opacity = '';
        del = false;
    }
    fetch('/api/todo/add',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            id : item.getAttribute('to_do_id'),
            val : item.name,
            del : del
        })
    })
}
console.log('hors fonction',inputToDo);