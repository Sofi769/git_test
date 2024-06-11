document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    
    const loadData = () => {
        const data = JSON.parse(localStorage.getItem('userData')) || [];
        data.forEach(user => {
            addUserToTable(user.firstName, user.lastName, user.age);
        });
    };

    const addUserToTable = (firstName, lastName, age) => {
        const row = dataTable.insertRow();
        row.insertCell(0).innerText = firstName;
        row.insertCell(1).innerText = lastName;
        row.insertCell(2).innerText = age;
    };

    const saveDataToLocalStorage = (firstName, lastName, age) => {
        const data = JSON.parse(localStorage.getItem('userData')) || [];
        data.push({ firstName, lastName, age });
        localStorage.setItem('userData', JSON.stringify(data));
    }

    userForm.addEventListener('submit', event => {
        event.preventDefault();

        const firstName = event.target.firstName.value.trim();
        const lastName = event.target.lastName.value.trim();
        const age = parseInt(event.target.age.value.trim());

        if (firstName && lastName && age >= 18 && age <= 100) {
            addUserToTable(firstName, lastName, age);
            saveDataToLocalStorage(firstName, lastName, age);
            userForm.reset();
        } else if (age < 0) {
            alert("You can't register because you have not been even born!");
        } else if (age > 100) {
            alert("You are TOO OLD to register (I'm sorryyyy)");
        } else {
            alert('Please enter valid data. Age must be 18 or older.');
        }
    });

    loadData();
});
