// declare & create new db request
let db;
const request = indexedDB.open('budget', 1);

// pending objectStore
request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
};

// check for connection before reading from db
request.onsuccess = function (event) {
    db = event.target.result;
    if (navigator.onLine) {
        checkDatabase();
    }
};

// on error
request.onerror = function (event) {
    console.log(`Connection error: ${event.target.errorCode}`);
};

// create pending transaction, access objectStore, add method
function saveRecord(record) {
    const transaction = db.transaction(['pending'], 'readwrite');
    const store = transaction.objectStore('pending');
    store.add(record);
};

// open transaction, getAll records
function checkDatabase() {
    const transaction = db.transaction(['pending'], 'readwrite');
    const store = transaction.objectStore('pending');
    const getAll = store.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(() => {
                    const transaction = db.transaction(['pending'], 'readwrite');
                    const store = transaction.objectStore('pending');
                    store.clear();
                });
        }
    };
}

window.addEventListener('online', checkDatabase);