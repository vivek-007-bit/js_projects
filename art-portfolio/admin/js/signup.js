const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        // INPUT VALUES
        const name = document.getElementById("fullName").value;

        const email = document.getElementById("signupEmail").value;

        const password = document.getElementById("signupPassword").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        // CHECK PASSWORD MATCH
        if (
            password !== confirmPassword
        ) {

            alert(
                "Passwords do not match"
            );

            return;
        }

        try {

            const response =
                await fetch( "http://localhost:5000/api/auth/signup",

                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            name,
                            email,
                            password
                        })
                    }
                );

            const data =
                await response.json();

            alert(data.message);

            // REDIRECT
            if (response.ok) {

                window.location.href = "login.html";
            }

        } catch (error) {

            console.log(error);

            alert(
                "Signup failed"
            );
        }
    }
);
