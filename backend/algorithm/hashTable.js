class hashTable {
    static searchByHashTable(collections, searchString) {

        const hashTable = {};

        collections.forEach((collection) => {
            if (collection.name.toLowerCase().includes(searchString.toLowerCase())) {
                const key = this.hashFuction(collection.name);
                if (!hashTable[key]) {
                    hashTable[key] = [];
                }
                hashTable[key].push(collection);
            }
        });

        const key = this.hashFuction(searchString);
        return hashTable[key] || [];
    }

    static hashFuction(key) {
        return key.charCodeAt(0);
    }
}

module.exports = hashTable;
