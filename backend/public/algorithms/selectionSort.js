// class sortingAlgorithms {
    // selectionSortDataAsc(data) {
    //     try {
    //         if (!Array.isArray(data) || data.length === 0) {
    //             throw new Error("Invalid data format or empty data array.");
    //         }

    //         const chart = data[0];

    //         if (!chart.name || !chart.values || !Array.isArray(chart.values)) {
    //             throw new Error("Invalid chart data format.");
    //         }

    //         // Implement selection sort on the 'values' array based on the 'value' property
    //         const values = chart.values;

    //         for (let i = 0; i < values.length - 1; i++) {
    //             let minIndex = i;
    //             for (let j = i + 1; j < values.length; j++) {
    //                 if (values[j].value < values[minIndex].value) {
    //                     minIndex = j;
    //                 }
    //             }
    //             // Swap values[minIndex] and values[i]
    //             [values[minIndex], values[i]] = [values[i], values[minIndex]];
    //         }

    //         return data;
    //     } catch (error) {
    //         console.error("Error sorting chart data:", error);
    //         // Return the unsorted data in case of an error
    //         return data;
    //     }
    // }

export default function selectionSortDataDesc(data) {
        try {
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("Invalid data format or empty data array.");
            }

            const chart = data[0];

            if (!chart.name || !chart.values || !Array.isArray(chart.values)) {
                throw new Error("Invalid chart data format.");
            }

            // Implement selection sort on the 'values' array based on the 'value' property
            const values = chart.values;

            for (let i = 0; i < values.length - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < values.length; j++) {
                    if (values[j].value > values[minIndex].value) {
                        minIndex = j;
                    }
                }
                // Swap values[minIndex] and values[i]
                [values[minIndex], values[i]] = [values[i], values[minIndex]];
            }

            return data;
        } catch (error) {
            console.error("Error sorting chart data:", error);
            // Return the unsorted data in case of an error
            return data;
        }
    }
// }

// export default sortingAlgorithms;
