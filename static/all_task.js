const deleteTask = (id) => {
    console.log("deleteeeeeeeeeeeeeee")
    fetch(`/api/task/delete/${id}`, {
        method: 'GET',
        headers:{
            'Content-type':'application/json'
        },
    }).then(res => {
        location.reload();
    })
}
const updateTask = (id) => {
    console.log(id);
    fetch(`/modificationTache/${id}`, {
        method: 'GET',
        headers:{
            'Content-type':'application/json'
        },
    
    }).then(res => {
        location.assign(`/modificationTache/${id}`);    
    })
}