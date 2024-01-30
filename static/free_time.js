const deleteFreeTime = (id) => {
    fetch(`/api/freeTime/delete/${id}`, {
        method: 'GET',
        headers:{
            'Content-type':'application/json'
        },
    }).then(res => {
        location.reload();
    })
}