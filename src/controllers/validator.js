//Đối tượng Validator
function Validator(option) {
  var seclectorRules = {};
  //Hàm thực hiện validate
  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      option.errorSelector
    );
    var errorMessage;
    //Lấy ra các rule của selector
    var rules = seclectorRules[rule.seclector];
    // Lặp qua từng rule và kiểm tra
    for (var i = 0; i < rules.length; ++i) {
      errorMessage = rules[i](inputElement.value);
      // Nếu có lỗi thì dừng kiểm tra
      if (errorMessage) break;
    }
    if (errorMessage) {
      errorElement.innerHTML = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerHTML = "";
      inputElement.parentElement.classList.remove("invalid");
    }
    return !!errorMessage;
  }
  // Lấy element của form cần validate
  var formElement = document.querySelector(option.form);
  if (formElement) {
    //Khi submit form
    formElement.onsubmit = (e) => {
      e.preventDefault();
      var isFormValid = false;
      option.rules.forEach((rule) => {
        var inputElement = formElement.querySelector(rule.seclector);
        var isValid = validate(inputElement, rule);
        if (isValid) {
          isFormValid = true;
        }
      });
      if (!isFormValid) {
        if (typeof option.onSubmit === "function") {
          var enableInput = formElement.querySelectorAll("[name] ");
          var formValues = Array.from(enableInput).reduce((values, input) => {
            return (values[input.name] = input.value) && values;
          }, {});
          option.onSubmit(formValues);
        } else {
        }
      }
    };
    // Lặp qua mỗi rule và xử lý(lắng nghe sự kiện)
    option.rules.forEach((rule) => {
      //Lưu lại các rule trong ô input
      if (Array.isArray(seclectorRules[rule.seclector])) {
        seclectorRules[rule.seclector].push(rule.test);
      } else {
        seclectorRules[rule.seclector] = [rule.test];
      }
      var inputElement = formElement.querySelector(rule.seclector);
      if (inputElement) {
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };
      }
    });
  }
}
//Định nghĩa rule
//1. Khi có lỗi => trả ra message lỗi
//2. Khi không có lỗi => undefined
Validator.isRequired = function (seclector, message) {
  return {
    seclector,
    test(value) {
      return value.trim() ? undefined : message;
    },
  };
};
Validator.isEmail = function (seclector, message) {
  return {
    seclector,
    test(value) {
      var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return regex.test(value) ? undefined : message;
    },
  };
};
Validator.isPassword = function (seclector, min, message) {
  return {
    seclector,
    test(value) {
      return value.length >= min
        ? undefined
        : message || `Password required at least ${min} characters`;
    },
  };
};
Validator.isPasswordConfirm = function (seclector, confirm, message) {
  return {
    seclector,
    test(value) {
      return value === confirm()
        ? undefined
        : message || "Your password and Confirm password are not the same";
    },
  };
};

const validateValue = (list, obj, messageInvalid, messageMissing) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === obj.id || obj.id === null) {
      console.error(messageInvalid);
      return false;
    }
  }
  for (let i = 0; i < Object.keys(obj).length - 1; i++) {
    if (Object.values(obj)[i] === null) {
      console.error(messageMissing, Object.keys(obj)[i]);
      return false;
    }
  }
};
export { validateValue };
