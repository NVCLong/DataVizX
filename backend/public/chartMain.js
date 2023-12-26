import selectionSortDataAsc from "./algorithms/selectionSort.js";


document.addEventListener("DOMContentLoaded", () => {
    // Fetch data and display chart
    fetchDataSortAndDisplayChart();
    // Add event listener to the button
    const sortButton = document.getElementById("sortButton");
    sortButton.addEventListener("click", () => {
        // Fetch data, sort, and display chart
        fetchDataSortAndDisplayChart();

    });
});

// let myChart;

function fetchDataAndDisplayChart() {
    fetch("/collection-raw-data/display")
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched data successfully");
            if (myChart) {
            }
            displayChart(data);
            console.log(data);
        })
        .catch((err) => console.error("Failed to fetch data: " + err));
}

function fetchDataSortAndDisplayChart() {
    fetch("/collection-raw-data/display/6584823284cbac5e414cb8c7")
        .then((res) => res.json())
        .then((data) => {
            // Remove existing canvas element if it exists
            if (myChart) {
                // myChart.destroy();
                console.log("Destroyed existing chart");
            }
            // Sort the data before displaying the chart using selection sort
            const sortedData = selectionSortDataAsc(data);
            console.log("Sorted data successfully");
            console.log(data);
            // destroyChart();
            displayChart(sortedData);
        })
        .catch((err) => console.error("Failed to fetch data: " + err));
}

function displayChart(data) {
    const chart = data[0];

    const values = chart.values.map((entry) => entry.value);
    const categories = chart.values.map((entry) => entry.category);

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: categories,
            datasets: [
                {
                    label: chart.name,
                    data: values,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}
