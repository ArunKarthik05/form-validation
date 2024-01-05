var form = document.getElementById("main-form");
var submitButton = document.getElementById("submitButton");

var age = 0;
var fileName = "";
var fileSize = "";
var fileExtension = ".any";
var convertedImage = "";

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

function storeFormValues() {
  var userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

  var formValues = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    phoneNumber: document.getElementById("phone").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    education: document.getElementById("education").value,
    panCard: document.getElementById("pan").value,
    Occupation: document.getElementById("occupation").value,
    age: age,
    fileDetails: {
      fileName,
      fileSize,
      fileExtension: fileName
        .substring(fileName.lastIndexOf("."))
        .toLowerCase(),
    },
    convertedImage,
  };
  userDetails.push(formValues);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}
form.addEventListener("submit", function (e) {
  console.log("Submit");
  storeFormValues();
  e.preventDefault();
  form.reset();
});

function validateEmail(input) {
  var parentContainer = input.parentElement;
  var errorSpan = parentContainer.querySelector(".error-message");
  if (!input.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
    input.classList.add("invalid");
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      errorSpan.innerHTML = "*Invalid";
      parentContainer.appendChild(errorSpan);
    }
    submitButton.style.display = "none";
    return false;
  } else {
    input.classList.remove("invalid");
    if (errorSpan) {
      parentContainer.removeChild(errorSpan);
    }
  }
  submitButton.style.display = "block";
  input.classList.add("is-valid");
  return true;
}

function validatePhone(input) {
  var parentContainer = input.parentElement;
  var errorSpan = parentContainer.querySelector(".error-message");
  if (!/^[6-9]\d{9}$/.test(input.value)) {
    input.classList.add("invalid");
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      errorSpan.innerHTML = "*Invalid";
      parentContainer.appendChild(errorSpan);
    }
    submitButton.style.display = "none";
    return false;
  } else {
    input.classList.remove("invalid");
    if (errorSpan) {
      parentContainer.removeChild(errorSpan);
    }
  }
  submitButton.style.display = "block";
  return true;
}

function validateDOB(input) {
  //console.log(age + " years");
  var parentContainer = input.parentElement;
  var errorSpan = parentContainer.querySelector(".error-message");
  var dobYear = new Date(input.value).getFullYear();
  if (dobYear < 1950 || dobYear > 2010) {
    input.classList.add("invalid");
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      errorSpan.innerHTML = "*Invalid";
      parentContainer.appendChild(errorSpan);
    }
    submitButton.style.display = "none";
    return false;
  } else {
    input.classList.remove("invalid");
    if (errorSpan) {
      parentContainer.removeChild(errorSpan);
    }
  }
  submitButton.style.display = "block";
  var currentDate = new Date();
  age = currentDate.getFullYear() - dobYear;
  if (
    currentDate.getMonth() < birthdate.getMonth() ||
    (currentDate.getMonth() === birthdate.getMonth() &&
      currentDate.getDate() < birthdate.getDate())
  ) {
    age--;
  }
  //console.log(age + " years");
  return true;
}

function validatePassword(input) {
  var parentContainer = input.parentElement;
  var errorSpan = parentContainer.querySelector(".error-message");
  if (!input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,16}$/)) {
    input.classList.add("invalid");
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      errorSpan.innerHTML = "*Invalid";
      parentContainer.appendChild(errorSpan);
    }
    submitButton.style.display = "none";
    return false;
  } else {
    input.classList.remove("invalid");
    if (errorSpan) {
      parentContainer.removeChild(errorSpan);
    }
  }
  submitButton.style.display = "block";
  return true;
}

function validatePan(input) {
  var parentContainer = input.parentElement;
  var errorSpan = parentContainer.querySelector(".error-message");
  if (!input.value.match(/^[A-Z]{5}\d{4}[A-Z]$/)) {
    input.classList.add("invalid");
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      errorSpan.innerHTML = "*Invalid";
      parentContainer.appendChild(errorSpan);
    }
    submitButton.style.display = "none";
    return false;
  } else {
    input.classList.remove("invalid");
    if (errorSpan) {
      parentContainer.removeChild(errorSpan);
    }
  }
  submitButton.style.display = "block";
  return true;
}

function fileValidate() {
  var fileInput = document.getElementById("fileInput");
  var errorContainer = document.getElementById("errorContainer");

  if (fileInput.files.length === 0) {
    errorContainer.textContent = "Please choose a file.";
    submitButton.style.display = "none";
    return false;
  }

  var reader = new FileReader();
  reader.onload = function (e) {
    convertedImage = e.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);

  fileName = fileInput.files[0].name;
  fileSize = fileInput.files[0].size / (1024 * 1024); // Size in MB
  fileSize = fileSize.toFixed(2);

  fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

  if (!fileExtension.match(/^.*\.(jpeg|jpg|png)$/i)) {
    errorContainer.textContent =
      "Invalid file extension. Only .png and .jpeg are allowed.";
    submitButton.style.display = "none";
    return false;
  }

  var maxSizeMB = 2.0;
  //console.log("Size" + fileSize);
  if (fileSize > maxSizeMB) {
    errorContainer.textContent = "File size exceeds the maximum limit of 2MB.";
    submitButton.style.display = "none";
    return false;
  }
  errorContainer.textContent = "";
  submitButton.style.display = "block";
  return true;
}
// ----------------------Search-----------
var searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
});
function handleSearch() {
  //console.log("working");
  var searchInput = document.getElementById("searchInput").value.trim();
  if (/[a-zA-Z]/.test(searchInput)) {
    handleUserSearch(searchInput);
  } else if (/^([01](\.\d{1,2})?|2(\.00)?)$/.test(searchInput)) {
    handleFileSearch(searchInput);
  } else if (/^(?:[1-9]\d{2,}|[4-9]\d{1,})$/.test(searchInput)) {
    handleAgeSearch(searchInput);
  }
}

function handleUserSearch(searchInput) {
  var storedData = localStorage.getItem("userDetails");
  console.log(storedData);
  if (storedData) {
    // Step 4: Parse JSON data
    var userData = JSON.parse(storedData);
    // Step 5: Find the matching username
    var foundUser = userData.find((user) => user.username === searchInput);
    //console.log(foundUser);
    if (foundUser) {
      document.getElementById("searchForm").style.display = "none";
      document.getElementById("icon").style.display = "none";
      var innerContainer = document.getElementById("form-inner-container");
      document.getElementById("main-form").style.display = "none";
      var userDetailsDiv = document.createElement("div");
      userDetailsDiv.classList.add("user-details");
      userDetailsDiv.id = "data";
      userDetailsDiv.innerHTML = `
        <div class="rounded">
        <img class="profile-pic" src="${convertedImage}" alt="Profile-pic">
        </div>
        <p><strong>Name:</strong> ${foundUser.name}</p>
        <p><strong>Username:</strong> ${foundUser.username}</p>
        <p><strong>Email:</strong> ${foundUser.email}</p>
        <p><strong>DOB:</strong> ${foundUser.dob}</p>
        <p><strong>Age:</strong> ${foundUser.age}</p>
        <p><strong>Gender:</strong> ${foundUser.gender}</p>
        <p><strong>Ph no:</strong> ${foundUser.phoneNumber}</p>
        <p><strong>Education:</strong> ${foundUser.education}</p>
        ${
          foundUser.Occupation &&
          `<p><strong>Occupation:</strong> ${foundUser.Occupation}</p>`
        }
        
        <!-- Add more fields as needed -->
  
      <button class="submit" onclick="handleBack()">Go back</button>`;
      // Step 8: Append the div to the body or another container
      innerContainer.appendChild(userDetailsDiv);
    } else {
      var warningDiv = document.createElement("div");
      warningDiv.classList.add("alert", "alert-danger");
      warningDiv.textContent = "User not found!";
      warningDiv.style.position = "absolute";
      warningDiv.style.top = "4%";
      warningDiv.style.left = "30%";
      warningDiv.style.width = "30%";
      warningDiv.style.textAlign = "center";
      document.body.appendChild(warningDiv);

      // Automatically hide the warning div after 5 seconds
      setTimeout(function () {
        warningDiv.style.display = "none";
      }, 5000);
    }
  } else {
    var warningDiv = document.createElement("div");
    warningDiv.classList.add("alert", "alert-danger");
    warningDiv.textContent = "No data found..Please add some values! ";
    warningDiv.style.position = "absolute";
    warningDiv.style.top = "4%";
    warningDiv.style.left = "30%";
    warningDiv.style.width = "30%";
    warningDiv.style.textAlign = "center";
    document.body.appendChild(warningDiv);

    // Automatically hide the warning div after 5 seconds
    setTimeout(function () {
      warningDiv.style.display = "none";
    }, 5000);
  }
}

function handleFileSearch(searchInput) {
  searchInput = parseFloat(searchInput);
  var storedData = localStorage.getItem("userDetails");
  //console.log(storedData);
  if (storedData) {
    var userData = JSON.parse(storedData);
    var matchingUsers = userData.filter(function (user) {
      var fileSize = parseFloat(user.fileDetails.fileSize);
      // console.log(fileSize + " <= " + searchInput);
      return fileSize <= searchInput;
    });
    // matchingUsers.forEach(function (user, index) {
    //   console.log("User " + index + ":", user);
    // });
    if (matchingUsers.length > 0) {
      handleDisplayDetails(matchingUsers);
    } else {
      alert("No users found below the given filesize");
    }
  }
}

function handleAgeSearch(searchInput) {
  searchInput = parseFloat(searchInput);
  searchInput /= 365;
  searchInput = Math.ceil(searchInput);
  //console.log(searchInput);
  var storedData = localStorage.getItem("userDetails");
  //console.log(storedData);
  if (storedData) {
    var userData = JSON.parse(storedData);
    var matchingUsers = userData.filter(function (user) {
      return user.age <= searchInput;
    });
    handleDisplayDetails(matchingUsers);
    //console.log(matchingUsers);
  } else {
    alert("No users found within the given age");
  }
}

function handleBack() {
  var searchValue = document.getElementById("searchInput").value;
  // ------------Username------------
  var searchForm = document.getElementById("searchForm");
  searchForm.style.display = "block";
  searchForm.reset();
  document.getElementById("icon").style.display = "block";
  document.getElementById("main-form").style.display = "block";

  var innerContainer = document.getElementById("form-inner-container");
  var dataElements = document.getElementsByClassName("user-details");
  Array.from(dataElements).forEach(function (dataElement) {
    innerContainer.removeChild(dataElement);
  });
  var formContainer = document.getElementById("form-container");
  var submitBtn = document.getElementById("Added");
  formContainer.removeChild(submitBtn);
}

function handleDisplayDetails(matchingUsers) {
  //console.log("in");
  matchingUsers.forEach(function (foundUser, i) {
    document.getElementById("searchForm").style.display = "none";
    document.getElementById("icon").style.display = "none";
    var innerContainer = document.getElementById("form-inner-container");
    document.getElementById("main-form").style.display = "none";
    var userDetailsDiv = document.createElement("div");
    userDetailsDiv.classList.add("user-details");
    innerContainer.style.display = "block";
    userDetailsDiv.id = "data";
    userDetailsDiv.innerHTML = `
        <p class="heading-user">User ${i + 1}</p>
        <p><strong>Name:</strong> ${foundUser.name}</p>
        <p><strong>Username:</strong> ${foundUser.username}</p>
        <p><strong>Email:</strong>${foundUser.email}</p>
        <p><strong>DOB:</strong> ${foundUser.dob}</p>
        <p><strong>Age:</strong> ${foundUser.age} (${
      foundUser.age * 365
    }days)</p>
        <p><strong>Gender:</strong> ${foundUser.gender}</p>
        <p><strong>Ph no:</strong> ${foundUser.phoneNumber}</p>
        <p><strong>Education:</strong> ${foundUser.education}</p>
        ${
          foundUser.Occupation &&
          `<p><strong>Occupation:</strong> ${foundUser.Occupation}</p>`
        }
    `;

    // Step 8: Append the div to the body or another container
    innerContainer.appendChild(userDetailsDiv);
  });
  var formContainer = document.getElementById("form-container");
  var BtnDiv = document.createElement("div");
  BtnDiv.id = "Added";
  BtnDiv.innerHTML = `<button class="submit" onclick="handleBack()">Go back</button>`;
  formContainer.appendChild(BtnDiv);
}
