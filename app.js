// Factory function that creates a new user object to keep creation consistent
function createUser(name, dob, phone, email) {
    return {
      name: name,
      dob: dob,
      phone: phone,
      email: email
    };
  }
// Load from localstorage and/or initialize an empty array
var users = [];
if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users")); 
  // Convert stored JSON string back into array
}
// Get references to the form and list elements from the HTML
var form = document.getElementById("userForm");
var userList = document.getElementById("userList");

// Save to localstorage and render the list in an updated UI
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users)); 
  // Convert array back into JSON string
  renderUsers();
  // Update the UI
}

// Render the list of users
function renderUsers() {
  userList.innerHTML = ""; // Clear the list
  // Loop through the users array and create list items

  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    // Create a list item for each user
    var li = document.createElement("li");
    li.textContent = user.name + " | " + user.dob + " | " + user.phone + " | " + user.email;

    // Create edit and delete buttons
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = (function(index) {
      return function() {
        // Populate the form with the user's data so the user can change it
        var u = users[index];
        document.getElementById("name").value = u.name;
        document.getElementById("dob").value = u.dob;
        document.getElementById("phone").value = u.phone;
        document.getElementById("email").value = u.email;

        // Remove the user from the array so they can be re-added
        users.splice(index, 1);
        saveUsers();
        // Save and re-render the form
      };
    })(i); // Invoked function to capture the correct index
    // Create delete button
    var delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = (function(index) {
      return function() {
        users.splice(index, 1);
        // Remove the selected user
        saveUsers();
        // Save and re-render the form
      };
    })(i);


    // Add both buttons to the list item and add the item to the list
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    userList.appendChild(li);
  }
}

// Add event listener to the form when submitted
form.addEventListener("submit", function(event) {
    event.preventDefault();
    // Prevent the form from submitting normally

    // Get the values from the form fields
    var name = document.getElementById("name").value;
    var dob = document.getElementById("dob").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;


    // Create a new user and add it to the array using the factory function
    var newUser = createUser(name, dob, phone, email);
    users.push(newUser);
    // Add the new user to the array
    form.reset();
    // Clear the form
    saveUsers();
    // Save and re-render the form
  });

  // Render the users on page load
  renderUsers();