
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        // INPUT VALUES
        const email = document.getElementById("loginEmail").value;

        const password = document.getElementById("loginPassword").value;

        try {

            const response =
                await fetch(

                    "http://localhost:5000/api/auth/login",

                    {
                        method: "POST",

                        credentials:
                            "include",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            email,
                            password
                        })
                    }
                );

            const data =
                await response.json();

            //alert(data.message);

            // REDIRECT
            if (response.ok) {

                window.location.href =
                    "index.html";
            }

        } catch (error) {

            console.log(error);

            alert(
                "Login failed"
            );
        }
    }
);