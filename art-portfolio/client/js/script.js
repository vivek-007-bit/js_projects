const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;

        const email = document.getElementById("email").value;

        const message = document.getElementById("message").value;

        const button = contactForm.querySelector("button");

        try {

            // LOADING STATE
            button.disabled = true;
            button.innerText = "Sending...";

            // SEND DATA TO BACKEND
            const response = await fetch("http://localhost:5000/api/email/send",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        message
                    })
                }
            );

            const data = await response.json();

            // SUCCESS
            if (response.ok) {

                alert(data.message);
                contactForm.reset();

            } else {

                alert(data.message);
            }

        } catch (error) {

            console.log(error);

            alert(
                "Something went wrong"
            );

        } finally {

            button.disabled = false;

            button.innerText =
                "Send";
        }
    }
);
