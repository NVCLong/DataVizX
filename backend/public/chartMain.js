document.addEventListener('DOMContentLoaded', () => {
    // Fetch data and display chart
    fetchDataAndDisplayChart();
    // Add event listener to the button
    const sortButton = document.getElementById('sortButton');
    sortButton.addEventListener('click', () => {
        // Fetch data, sort, and display chart
        fetchDataSortAndDisplayChart();
    });
});

let myChart;

function fetchDataAndDisplayChart() {
    fetch('/collection-raw-data/display')
        .then(res => res.json())
        .then(data => {
            console.log("Fetched data successfully");
            if (myChart) {
            }
            displayChart(data);
            console.log(data);
        })
        .catch(err => console.error("Failed to fetch data: " + err));
}

function fetchDataSortAndDisplayChart() {
    fetch('/collection-raw-data/display')
        .then(res => res.json())
        .then(data => {
            // Remove existing canvas element if it exists
            if (myChart) {
                myChart.destroy();
            }
            // Sort the data before displaying the chart using selection sort
            const sortedData = selectionSortChartData(data);
            console.log("Sorted data successfully");
            // destroyChart();
            displayChart(sortedData);

        })
        .catch(err => console.error("Failed to fetch data: " + err));
}

function selectionSortChartData(data) {
    try {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('Invalid data format or empty data array.');
        }

        // Assuming data is an array of chart objects with chartName and values properties
        const chart = data[0];

        if (!chart.name || !chart.values || !Array.isArray(chart.values)) {
            throw new Error('Invalid chart data format.');
        }

        // Implement selection sort on the 'values' array based on the 'value' property
        const values = chart.values;

        for (let i = 0; i < values.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < values.length; j++) {
                if (values[j].value < values[minIndex].value) {
                    minIndex = j;
                    console.log("Sorted data successfully");
                }
            }
            // Swap values[minIndex] and values[i]
            [values[minIndex], values[i]] = [values[i], values[minIndex]];
        }

        return data;
    } catch (error) {
        console.error('Error sorting chart data:', error);
        // Return the unsorted data in case of an error
        return data;
    }
}


function displayChart(data) {


    const chart = data[0];

    const values = chart.values.map(entry => entry.value);
    const categories = chart.values.map(entry => entry.category);

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: chart.name,
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}