document.addEventListener('DOMContentLoaded', () => {
    // Tambah pengguna awal jika belum ada
    if (!localStorage.getItem('users')) {
        const initialUsers = [
            { username: 'admin', password: 'admin', role: 'admin' },
            { username: 'user', password: 'user', role: 'user' }
        ];
        localStorage.setItem('users', JSON.stringify(initialUsers));
        console.log('Initial users added:', initialUsers); // Debugging
    } else {
        console.log('Users already exist:', JSON.parse(localStorage.getItem('users'))); // Debugging
    }

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        login(username, password, role);
    });
});

function login(username, password, role) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Loaded users:', users); // Debugging

    const authenticatedUser = users.find(user => user.username === username && user.password === password && user.role === role);
    console.log('Authenticated user:', authenticatedUser); // Debugging

    if (authenticatedUser) {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('role', role);
        
        // Simpan riwayat login
        const loginHistory = JSON.parse(localStorage.getItem('loginHistory')) || [];
        loginHistory.push({ user: username, role: role, time: new Date().toLocaleString() });
        localStorage.setItem('loginHistory', JSON.stringify(loginHistory));

        window.location.href = 'index.html';
    } else {
        alert('Username atau password salah');
    }
}

function addUser(username, password, role) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    console.log('User added:', { username, password, role }); // Debugging
}

function deleteUser(username) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('User deleted:', username); // Debugging
}
