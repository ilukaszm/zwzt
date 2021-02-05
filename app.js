import { route } from "./router";
import { API_URL } from "./utils";

route("/", "home", function () {
  this.message = "";
  this.$on(".login-form", "submit", (e) => {
    e.preventDefault();

    const userDataForm = new FormData(e.currentTarget);

    const username = userDataForm.get("username");
    const password = userDataForm.get("password");

    const userData = { username, password };

    const logIn = async () => {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        this.message = "Bad login or password!";
        this.$refresh();
        throw new Error(message);
      }

      window.location.replace("#/success");
    };

    logIn();
  });
});

route("/success", "success", function () {
  this.title = `You're log in!`;
});

route("*", "404", function () {});
