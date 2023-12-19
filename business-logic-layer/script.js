document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission
  
    // Fetch input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Fetch the text file with usernames and passwords
    fetch('../data-access-layer/data.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(fileContent => {
        // Split the file content into an array of lines
        const lines = fileContent.split('\n');
        
        // Check if any line matches the provided username and password
        const validCredentials = lines.some(line => {
          const [storedUsername, storedPassword] = line.split(',');
          return storedUsername.trim() === username && storedPassword.trim() === password;
        });
  
        // Display a message based on the validation result
        if (validCredentials) {
          alert('Login successful!');
        } else {
          alert('Invalid username or password');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error fetching credentials');
      });
  });