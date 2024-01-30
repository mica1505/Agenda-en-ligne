const cancelUpdate = () => {
    fetch('/api/user/me', {
        method: 'GET',
        headers: {
            'Content-type':'application/json'
        },
    })
    .then(res => res.json())
    .then(user => {
        const lastName = document.querySelector('#nom')
        const firstName = document.querySelector('#prenom')
        const date_birth = document.querySelector('input#date')
        const email = document.querySelector('#email')
        const user_name = document.querySelector('#identifiant')
        const mPasse = document.querySelector('#mPasse');
        const confirm_mPasse = document.querySelector('#confirm_mPasse');
 
        lastName.value = user.last_name;
        firstName.value = user.first_name;
        date_birth.value = user.date_birth_parse;
        email.value = user.email;
        user_name.value = user.user_name;
        mPasse.value = '';
        confirm_mPasse.value = '';
    })
}
const deleteUser = () => {
    fetch('/api/user/delete/', {
        method: 'GET',
        headers:{
            'Content-type':'application/json'
        },
    }).then(() => {
        fetch('/api/user/logout', {
            method: 'GET',
            headers:{
                'Content-type':'application/json'
            },
        }).then(() => {
            const modal = document.querySelector('.modal');
            modal.style.display = "none";
            location.reload();
        })
    })
}
const openModalRemove = (e) => {
    const modal = document.querySelector('.modal');
    modal.style.display = "flex";
}
const closeModalRemove = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = "none";
}