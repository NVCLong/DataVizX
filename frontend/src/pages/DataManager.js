export class DataManager{


  async portData (userData) {
    const baseUrl = "http://localhost:3000";
    // e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/collection/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*"
        },
        body: JSON.stringify({
          name: "user1",
          categories: userData.categories,
          values: userData.values
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("userInput categories",userData.categories)
      console.log("userInput values", userData.values)

      console.log("Login response:", data);
      // Process the login response here
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
 
};

