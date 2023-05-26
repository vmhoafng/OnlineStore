import Validator from "../controllers/validator.js";
Validator({
  form: "#formLogin",
  errorSelector: ".form-message",
  rules: [
    Validator.isRequired("#usernameLogin", "Please enter a valid username"),
    Validator.isRequired("#passwordLogin", "Please enter a valid password"),
  ],
  onSubmit(data) {
    console.log(data);
    let inputs = document.querySelectorAll("input");
    let id = data.id;
    let password = data.password;
    let user = localStorage.getItem(id);
    let config = JSON.parse(user);
    let json = JSON.stringify(id);
    const userConfig = "currentUser";
    inputs.forEach((element) => {
      element.value = "";
      element.blur();
    });
    if (user == null) {
      alert("This account does not exist. Please try again.");
      inputs.forEach((element) => {
        element.value = null;
      });
      document.querySelector("input").focus();
    }
    if (password !== config.password) {
      alert("Nhập sai mật khẩu");
      return;
    }
    if (
      config.isAdmin == "true" &&
      id == config.id &&
      password == config.password
    ) {
      console.log(config.isAdmin);
      window.location = "https://vmhoafng.github.io/OnlineStore/src/admin";
      localStorage.setItem(userConfig, json);
    }

    if (id == config.id && password == config.password) {
      document.querySelector("#Form").click();
      localStorage.setItem(userConfig, json);
      window.location.reload();
    }
  },
});
