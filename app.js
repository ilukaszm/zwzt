import { route } from "./router";
import { API_URL, redirectFn } from "./utils";
import "./app.css";

route("/", "home", function () {
  this.message = "";
  this.$on(".login-form", "submit", (e) => {
    e.preventDefault();

    const userDataForm = new FormData(e.currentTarget);

    const username = userDataForm.get("username");
    const password = userDataForm.get("password");

    const userData = { username, password };

    const logIn = async () => {
      try {
        const response = await fetch(`${API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          this.message = "Bad login or password!";
          this.$refresh();
          return;
        }

        redirectFn("/#/success");
      } catch (e) {
        this.message = "Oops! Something went wrong. Please try again later.";
        this.$refresh();
        throw new Error(e);
      }
    };

    logIn();
  });
});

route("/success", "success", function () {
  this.title = `You're logged in!`;
});

route("*", "404", function () {});
