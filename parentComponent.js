import React, { useState } from 'react';
import UserManagement from './UserManagement'; // Adjust the path based on your project structure

const ParentComponent = () => {
    const [users, setUsers] = useState([]);

    const addUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const updateUser = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.email === updatedUser.email ? updatedUser : user
            )
        );
    };

    const deleteUser = (userToDelete) => {
        console.log('Deleting user:', userToDelete); // Log the user being deleted
        setUsers((prevUsers) =>
            prevUsers.filter((user) => user.email !== userToDelete.email)
        );
    };

    return (
        <UserManagement
            users={users}
            addUser={addUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
        />
    );
};

export default ParentComponent;
