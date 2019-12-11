class IndexedDBStorage {
    constructor() {
        this._request = indexedDB.open("OE_Database", 1);

        this._request.onerror = () => {
            console.error("Error", this._request.error);
        };

        this._request.onsuccess = () => {
            console.log("Success!");
            this._db = this._request.result;
        };

        this._request.onupgradeneeded = () => {
            console.log("Upgrading...");
            this._db = this._request.result;
            this._db.createObjectStore("appeals", {keyPath: "id", autoIncrement: true});
            this._db.createObjectStore("news", {keyPath: "id", autoIncrement: true});
        };
    }

    add(key, value) {
        if (this._db) {
            let transaction = this._db.transaction(key, "readwrite");
            let objStore = transaction.objectStore(key);

            objStore.clear();
            value.forEach(val => objStore.add(val));
        }
    }

    get(key, callback) {
        if (this._db) {
            let transaction = this._db.transaction(key, "readwrite");
            let objStore = transaction.objectStore(key);
            let request = objStore.getAll();

            request.onsuccess = function () {
                callback(request.result);
            };
        }
    }

    remove(key) {
        if (this._db) {
            let transaction = this._db.transaction(key, "readwrite");
            let objStore = transaction.objectStore(key);
            objStore.clear();
        }
    }
}

class ObjectStorage {
    constructor() {
        this._storage = new IndexedDBStorage();
    }

    get storage() {
        return this._storage;
    }
}
const storage = new ObjectStorage().storage;