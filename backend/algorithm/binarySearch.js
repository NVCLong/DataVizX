const binarySearch = (arr, target, key = 'value') => {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const midValue = arr[mid][key];

        if (midValue === target) {
            return arr[mid];
        } else if (midValue < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return null; // Not found
};

module.exports = binarySearch;
