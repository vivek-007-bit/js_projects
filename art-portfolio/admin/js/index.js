
async function checkAuth() {

  try {

    const response =
      await fetch(

        "http://localhost:5000/api/auth/me",

        {
          method: "GET",

          credentials:
            "include"
        }
      );

    // NOT AUTHORIZED
    if (!response.ok) {

      window.location.href =
        "login.html";

      return;
    }

    // AUTHORIZED
    const data =
      await response.json();

    console.log(
      "Logged in user:",
      data.user
    );

  } catch (error) {

    console.log(error);

    window.location.href = "login.html";
  }
}

// RUN IMMEDIATELY
checkAuth();



//logout function
async function logout() {

    await fetch(

        "http://localhost:5000/api/auth/logout",

        {
            method: "POST",

            credentials:
                "include"
        }
    );

    window.location.href = "login.html";
}