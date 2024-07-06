let formEdit = document.forms["formEdit"];
editUser();

async function editModal(id) {
    const modalEdit = new bootstrap.Modal(document.querySelector('#editModal'));
    await open_fill_modal(formEdit, modalEdit, id);
}

function editUser() {
    formEdit.addEventListener("submit", event => {
        event.preventDefault();

        let rolesForEdit = [];
        for (let i = 0; i < formEdit.roles.options.length; i++) {
            if (formEdit.roles.options[i].selected) {
                rolesForEdit.push({
                    id: formEdit.roles.options[i].value,
                    role: "ROLE_" + formEdit.roles.options[i].text
                });
            }
        }

        let password = formEdit.password.value.trim();
        let requestBody = {
            id: formEdit.id.value,
            userName: formEdit.userName.value,
            surName: formEdit.surName.value,
            email: formEdit.email.value,
            password: formEdit.password.value,
            age: formEdit.age.value,
            roles: rolesForEdit
        };

        if (password !== "") {
            requestBody.password = password;
        }

        fetch("/api/admin/" + formEdit.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(() => {
                $('#editClose').click();
                getAllUsers();
            });
    });
}
