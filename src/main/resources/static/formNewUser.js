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

    let rolesForNewUser = Array.from(formNewUser.roles.selectedOptions)
        .map(option => {
            return {
                id: parseInt(option.value),
                role: option.textContent.trim().toUpperCase()
            };
        });

    try {
        const response = await fetch("http://localhost:8080/api/admin/users/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: formEdit.id.value,
                userName: formEdit.userName.value,
                surName: formEdit.surName.value,
                email: formEdit.email.value,
                password: formDelete.password.value,
                age: formEdit.age.value,
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        newUserForm.reset();
        getAllUsers();
        $('#usersTable').click();
    } catch (error) {
        console.error('Error creating new user:', error);
    }
});