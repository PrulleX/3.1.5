const URLOfUsersTable = 'http://localhost:8080/api/admin/users/';

getAllUsers();

function getAllUsers() {
    fetch(URLOfUsersTable)
        .then(function (response) {
            return response.json()
        })
        .then(function (users) {
            let dataOfUsers = '';
            let rolesString = '';

            const tableOfUsers = document.getElementById('tableOfUsers');

            for (let user of users) {
                rolesString = user.roles.map(role => role.role.substring(5)).join(" ");

                dataOfUsers += `<tr>
                <td>${user.id}</td>
                <td>${user.userName}</td>
                <td>${user.surName}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${rolesString}</td>
                
                    <td>
                        <button type = "button"
                        class="btn btn-info"
                        style="background-color: #0b9595; color: #fff"
                        data-bs-toggle="modal"
                        data-target="#editModal"
                        onclick="editModal(${user.id})">
                            Edit
                            </button>
                            </td>
                        
                        
                        <td>
                        <button type="button" 
                        class="btn btn-danger" 
                        data-bs-toggle="modal" 
                        data-target="#deleteModal" 
                        onclick="deleteModal(${user.id})">
                               Delete
                               </button>
                               </td>
                               </tr>`;
            }
            tableUsers.innerHTML = dataOfUsers;
        })
}