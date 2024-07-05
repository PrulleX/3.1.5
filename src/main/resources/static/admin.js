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
            
            //мб что-то тут
            <td>${userAdmin.rolesStringAdmin}</td>
            </tr>`;
            tableUserAdmin.innerHTML = data;
            navbarAdmin.innerHTML = `<b><span>${userAdmin.email}</span></b>
                                     <span>with roles:</span>
                                     <span>${rolesStringAdmin}</span>`;
    });
}

getCurrentAdmin()

async function getUserById(id) {
    let response = await fetch("/api/admin/user/" + id);
    return await response.json();
}

async function open_modal(form, modal, id) {
    modal.show();
    let user = await getUserById(id);
    form.id.value = user.id;
    form.name.value = user.userName;
    form.surname.value = user.surName;
    form.email.value = user.email;
    form.password.value = user.password;
    form.age.value = user.age;

    //тут происходит заполнение и очистка ролей
    let rolesSelect = form.roles;
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