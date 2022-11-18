import Validator from "../controllers/validator.js";
Validator({
  form: "#formRegister",
  errorSelector: ".form-message",
  rules: [
    Validator.isRequired("#usernameRegister", "Please enter a valid username"),
    Validator.isRequired("#passwordRegister", "Please enter a valid password"),
    Validator.isPassword("#passwordRegister", 8),
    Validator.isRequired(
      "#password_confirmationRegister",
      "Please confirm your password"
    ),
    Validator.isPasswordConfirm(
      "#password_confirmationRegister",
      function () {
        return document.querySelector("#formRegister #passwordRegister").value;
      },
      "Your password is not correct"
    ),
  ],
  onSubmit(data) {
    let inputs = document.querySelectorAll("input");
    let id = data.id;
    let password = data.password;
    let getUsers = localStorage.getItem(id);
    let user = {
      id,
      password,
      isAdmin: false,
      addresses: "",
      phoneNumber: "",
      cart: [],
      receipt: [],
    };
    inputs.forEach((element) => {
      element.value = "";
      element.blur();
    });
    if (getUsers == null) {
      localStorage.setItem("currentUser", JSON.stringify(user.id));
      localStorage.setItem(id, JSON.stringify(user));
      window.location.reload();
    } else {
      alert('This "Username" is exist. Please try another one.');
      inputs.forEach((element) => {
        element.value = null;
      });
      document.querySelector("#usernameRegister").focus();
    }
  },
});
