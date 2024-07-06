// admin.js

const URL = 'http://localhost:8080/api/admin/current/';
const navbarAdmin = document.getElementById('navbarAdmin');
const tableUserAdmin = document.getElementById('tableAdmin');

function getCurrentAdmin() {
    fetch(URL)
        .then((response) => response.json())
        .then((userAdmin) => {
            let rolesStringAdmin = userAdmin.roles.map(role => role.role.substring(5)).join(" ");
            let data = '';
            data += `<tr>
            <td>${userAdmin.id}</td>
            <td>${userAdmin.userName}</td> 
            <td>${userAdmin.surName}</td>
            <td>${userAdmin.email}</td>
            <td>${userAdmin.age}</td>
            <td>${rolesStringAdmin}</td>
            </tr>`;
            tableUserAdmin.innerHTML = data;
            navbarAdmin.innerHTML = `<b><span>${userAdmin.email}</span></b>
                                     <span>with roles:</span>
                                     <span>${rolesStringAdmin}</span>`;
        });
}

getCurrentAdmin();

async function getUserById(id) {
    let response = await fetch("/api/admin/" + id);
    return await response.json();
}

async function open_fill_modal(form, modal, id) {
    let user = await getUserById(id);

    if (form.id) form.id.value = user.id;
    if (form.userName) form.userName.value = user.userName;
    if (form.surName) form.surName.value = user.surName;
    if (form.age) form.age.value = user.age;
    if (form.email) form.email.value = user.email;
    if (form.password) form.password.value = user.password;

    // тут происходит заполнение и очистка ролей
    let rolesSelect = form.roles;
    if (rolesSelect) {
        rolesSelect.innerHTML = '';

        // Доступные роли для выбора
        const allRoles = [
            { id: 1, role: 'ROLE_USER' },
            { id: 2, role: 'ROLE_ADMIN' }
        ];

        allRoles.forEach(role => {
            let option = document.createElement('option');
            option.value = role.id;
            option.textContent = role.role;
            if (user.roles.some(userRole => userRole.role === role.role)) {
                option.selected = true;
            }
            rolesSelect.appendChild(option);
        });
    }

    modal.show();
}

// delete.js

let formDelete = document.forms["formDelete"];
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

        fetch("http://localhost:8080/api/admin/" + formDelete.id.value, {
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
                const modalDelete = bootstrap.Modal.getInstance(document.querySelector('#deleteModal'));
                modalDelete.hide();
                getAllUsers();
            });
    });
}
