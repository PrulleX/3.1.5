function getCurrentUser() {
    fetch("/api/user")
        .then(res => res.json())
        .then(user => {
            const roles = user.roles.map(role => role.role.substring(5)).join(' ')
            $('#currentUserEmail').append(`<span>${user.email}</span>`)
            $('#currentUserRole').append(`<span>${roles}</span>`)
            const u = `$(
                    <tr>
                       <td>${user.id}</td>
                          <td>${user.userName}</td>
                          <td>${user.surName}</td>
                          <td>${user.email}</td>
                          <td>${user.age}</td>
                        <td>${roles}</td>
                    </tr>)`;
            $('#tableForTheOneUser').append(u)
        })
}

getCurrentUser()