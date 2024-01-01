// utils/ChartSorting.js

class ChartSorting {
    // Ascending order
    static quickSortAsc(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[0];
        const left = [];
        const right = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i].value < pivot.value) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [
            ...ChartSorting.quickSortAsc(left),
            pivot,
            ...ChartSorting.quickSortAsc(right),
        ];
    }

    static sortByValueAndCategoryAsc(data) {
        return ChartSorting.quickSortAsc(data);
    }

    // Descending order
    static quickSortDesc(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[0];
        const left = [];
        const right = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i].value > pivot.value) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [
            ...ChartSorting.quickSortDesc(left),
            pivot,
            ...ChartSorting.quickSortDesc(right),
        ];
    }

    static sortByValueAndCategoryDesc(data) {
        return ChartSorting.quickSortDesc(data);
    }
}

module.exports = ChartSorting;
