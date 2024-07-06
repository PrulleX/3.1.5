const allUserRoles = [
    {id: 1, role: 'ROLE_USER'},
    {id: 2, role: 'ROLE_ADMIN'}
];

const rolesSelect = document.getElementById('newRoles');
allUserRoles.forEach(role => {
    let option = document.createElement('option');
    option.value = role.id;
    option.textContent = role.role;
    rolesSelect.appendChild(option);
});

let newUserForm = document.getElementById("formNewUser");
newUserForm.addEventListener("submit", async event => {
    event.preventDefault();

    let rolesForNewUser = Array.from(newUserForm.newRoles.selectedOptions)
        .map(option => {
            return {
                id: parseInt(option.value),
                role: option.textContent.trim().toUpperCase()
            };
        });

    try {
        const response = await fetch("http://localhost:8080/api/admin/new", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: newUserForm.newUserName.value,
                surName: newUserForm.newSurName.value,
                email: newUserForm.newEmail.value,
                password: newUserForm.newPassword.value,
                age: newUserForm.newAge.value,
                roles: rolesForNewUser
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        newUserForm.reset();
        getAllUsers(); // Обновите список пользователей после создания нового пользователя
        document.querySelector('#users-table-tab').click(); // Переключитесь обратно на вкладку с таблицей пользователей
    } catch (error) {
        console.error('Error creating new user:', error);
    }
});