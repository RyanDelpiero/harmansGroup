function formatRupiah(value) {
    if (isNaN(value)) return 'Rp 0';
    const numberString = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return 'Rp ' + numberString;
}


function checkLogin() {
    const loggedIn = localStorage.getItem('loggedIn');
    const role = localStorage.getItem('role');
    const welcomeMessage = document.getElementById('welcomeMessage');

    if (!loggedIn) {
        window.location.href = 'login.html';
    } else {
        if (role === 'admin') {
            welcomeMessage.innerText = 'Anda login sebagai Admin.';
        } else if (role === 'user') {
            welcomeMessage.innerText = 'Anda login sebagai User.';
        }
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');
    window.location.href = 'login.html';
}

// document.addEventListener('DOMContentLoaded', checkLogin);


document.addEventListener('DOMContentLoaded', checkLogin);


document.addEventListener('DOMContentLoaded', function () {
    const adminNameInput = document.getElementById('adminName');
    const currentDateTimeInput = document.getElementById('currentDateTime');
    const appTypeSelect = document.getElementById('appType');
    const additionalAppContainer = document.getElementById('additionalAppContainer');
    const cancellationNoteContainer = document.getElementById('cancellationNoteContainer');
    const addAppBalanceButton = document.getElementById('addAppBalance');
    const appBalancesTableBody = document.querySelector('#appBalancesTable tbody');
    const salesForm = document.getElementById('salesForm');
    const resultsDiv = document.getElementById('results');

    function updateDateTime() {
        const now = new Date();
        const formattedDateTime = now.toLocaleString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        currentDateTimeInput.value = formattedDateTime;
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();

    appTypeSelect.addEventListener('change', function () {
        if (appTypeSelect.value === 'lainnya') {
            additionalAppContainer.style.display = 'block';
        } else {
            additionalAppContainer.style.display = 'none';
        }

        if (appTypeSelect.value === 'pembatalan') {
            cancellationNoteContainer.style.display = 'block';
        } else {
            cancellationNoteContainer.style.display = 'none';
        }
    });

    addAppBalanceButton.addEventListener('click', function () {
        const appType = appTypeSelect.value;
        const newAppName = document.getElementById('newAppName').value;
        const appBalance = document.getElementById('appBalance').value;
        const cancellationNote = document.getElementById('cancellationNote').value;

        if (appType === '' || appBalance === '') {
            alert('Jenis Aplikasi dan Saldo Aplikasi harus diisi.');
            return;
        }

        let appTypeName = appType;
        if (appType === 'lainnya') {
            appTypeName = newAppName;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appTypeName}</td>
            <td>${formatRupiah(appBalance)}</td>
            <td>${cancellationNote}</td>
            <td><button type="button" class="delete-button">Hapus</button></td>
        `;

        const deleteButton = row.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            row.remove();
        });

        appBalancesTableBody.appendChild(row);
        document.getElementById('appBalance').value = '';
        document.getElementById('newAppName').value = '';
        document.getElementById('cancellationNote').value = '';
    });

    salesForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const initialCapital = parseFloat(document.getElementById('initialCapital').value) || 0;
        const moneyIncome = parseFloat(document.getElementById('moneyIncome').value) || 0;
        const adminName = adminNameInput.value;

        let totalBalance = 0;
        appBalancesTableBody.querySelectorAll('tr').forEach(function (row) {
            const appBalance = parseFloat(row.cells[1].textContent.replace(/[^0-9,-]+/g, "").replace(",", ".")) || 0;
            totalBalance += appBalance;
        });

        const returnedCapital = initialCapital - totalBalance;
        const salesMoney = moneyIncome - returnedCapital;

        resultsDiv.querySelector('#initialCapitalBalance').textContent = formatRupiah(initialCapital);
        resultsDiv.querySelector('#RealMoneyAdmin').textContent = formatRupiah(totalBalance);
        resultsDiv.querySelector('#returnedCapital').textContent = formatRupiah(returnedCapital);
        resultsDiv.querySelector('#salesMoney').textContent = formatRupiah(salesMoney);
        resultsDiv.querySelector('#displayAdminName').textContent = adminName;
    });
});
