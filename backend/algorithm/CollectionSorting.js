class CollectionSorting {
    // Ascending order
    static quickSortAsc(arr, key) {
        console.log(arr)
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[0];
        const left = [];
        const right = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i][key] < pivot[key]) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [
            ...CollectionSorting.quickSortAsc(left, key),
            pivot,
            ...CollectionSorting.quickSortAsc(right, key),
        ];
    }

    static sortByAlphabetAsc(data, key) {
        return CollectionSorting.quickSortAsc(data, key);
    }

    // Descending order
    static quickSortDesc(arr, key) {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[0];
        const left = [];
        const right = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i][key] > pivot[key]) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [
            ...CollectionSorting.quickSortDesc(left, key),
            pivot,
            ...CollectionSorting.quickSortDesc(right, key),
        ];
    }

    static sortByAlphabetDesc(data, key) {
        return CollectionSorting.quickSortDesc(data, key);
    }
}

module.exports = CollectionSorting;
