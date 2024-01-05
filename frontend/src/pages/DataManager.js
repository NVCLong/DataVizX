import axios from 'axios';

export class DataManager{


  async portData (userData) {
    const baseUrl = "http://localhost:3000";
    // e.preventDefault();
    try {
      axios.post(`${baseUrl}/collection/add`, {
        name: "user1",
        categories: userData.categories,
        values: userData.values
      }, {
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*"
        }
      })
        .then(response => {
          // Handle success
          console.log('Response:', response.data);
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
      console.log("userInput categories",userData.categories)
      console.log("userInput values", userData.values)
      

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
 
};

