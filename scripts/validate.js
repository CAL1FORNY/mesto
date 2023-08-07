const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_type_visible',
};

const showValidationError = (formItem, inputItem, errorMessage, settings) => {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.add(settings.inputErrorClass);
  errorItem.textContent = errorMessage;
  errorItem.classList.add(settings.errorClass);
};

const hideValidationError = (formItem, inputItem, settings) => {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.remove(settings.inputErrorClass);
  errorItem.classList.remove(settings.errorClass);
  errorItem.textContent = '';
};

const checkInputValidity = (formItem, inputItem, settings) => {
  if(inputItem.validity.valid === false){
    showValidationError(formItem, inputItem, inputItem.validationMessage, settings);
  } else{
    hideValidationError(formItem, inputItem, settings);
  }
};

const hasInvalidInput = inputList => {
  return inputList.some(item => {
    return !item.validity.valid;
  });
};

const disableSubmitButton = (buttonItem, settings) => {
  buttonItem.setAttribute('disabled', true);
  buttonItem.classList.add(settings.inactiveButtonClass);
}

const enableSubmitButton = (buttonItem, settings) => {
  buttonItem.removeAttribute('disabled');
  buttonItem.classList.remove(settings.inactiveButtonClass);
}

const toggleButtonState = (formItem, buttonItem, settings) => {
  const inputList = Array.from(formItem.querySelectorAll(settings.inputSelector));
  if(hasInvalidInput(inputList)){
    disableSubmitButton(buttonItem, settings);
  }else{
    enableSubmitButton(buttonItem, settings);
  }
}

const setEventListeners = (formItem, settings) => {
  const inputList = Array.from(formItem.querySelectorAll(settings.inputSelector));
  const buttonItem = formItem.querySelector(settings.submitButtonSelector);
  toggleButtonState(formItem, buttonItem, settings);
  inputList.forEach(inputItem => {
    inputItem.addEventListener('input', () => {
      checkInputValidity(formItem, inputItem, settings);
      toggleButtonState(formItem, buttonItem, settings);
    });
  });
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(formItem => {
    setEventListeners(formItem, settings);
  });
}

enableValidation(validationSettings);


