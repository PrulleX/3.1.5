let formDelete = document.forms["formDelete"]
deleteUser();

async function deleteModal(id) {
    const modalDelete = new bootstrap.Modal(document.querySelector('#deleteModal'));
    await open_fill_modal(formDelete, modalDelete, id);
}

function deleteUser() {
    formDelete.addEventListener("submit", event => {
        event.preventDefault();

        let rolesForDelete = [];
        for (let i = 0; i < formDelete.roles.options.length; i++) {
            if(formDelete.roles.options[i].selected) rolesForDelete.push({
                id: formDelete.roles.options[i].value,
                role: "ROLE_" + formDelete.roles.options[i].text
            });
        }

        fetch("http://localhost:8080/api/admin/{id}" + formDelete.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: formDelete.id.value,
                userName: formDelete.userName.value,
                surName: formDelete.surName.value,
                email: formDelete.email.value,
                password: formDelete.password.value,
                age: formDelete.age.value,
                roles: rolesForDelete
            })
        })
            .then(() => {
                $('#deleteClose').click();
                getAllUsers();
            });
    });
}