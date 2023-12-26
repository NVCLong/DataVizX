export default function bubbleSort(labels, data) {
    var n = data.length;
    var swapped;

    do {
        swapped = false;
        for (var i = 0; i < n - 1; i++) {
            if (data[i] > data[i + 1]) {
                // Swap data
                var tempData = data[i];
                data[i] = data[i + 1];
                data[i + 1] = tempData;

                // Swap labels
                var tempLabel = labels[i];
                labels[i] = labels[i + 1];
                labels[i + 1] = tempLabel;

                swapped = true;
            }
        }
    } while (swapped);
}