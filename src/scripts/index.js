import 'normalize.css';
import '../scss/style.scss';
import { smoothScroll } from './modules/smoothScroll.js';
import { mobileMenu } from './modules/mobileMenu.js';
import './modules/forms';
import IMask from 'imask';
import forms from './modules/forms';

const url = "https://jsonplaceholder.typicode.com/posts";

forms(url);
mobileMenu();

document.querySelectorAll('.anchor').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offset = -150;
        const targetY = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
        const duration = 700;
        smoothScroll(targetY, duration);
    });
});

document.querySelector('.header__logo').addEventListener('click', function () {
    const duration = 700;
    smoothScroll(0, duration);
});

const packageModule = (() => {
    const packageField = document.getElementById("package");

    function handleLinkClick(event) {
        event.preventDefault();
        packageField.value = event.target.getAttribute("data-package");
    }

    const buttons = document.querySelectorAll(".package-btn");
    buttons.forEach((button) => button.addEventListener("click", handleLinkClick));
})();

const formValidationModule = (() => {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const companyNameInput = document.getElementById('companyName');
    const businessAreaInput = document.getElementById('businessArea');
    const submitButton = document.getElementById("formSubmit");
    const customSelect = document.querySelector('.connection__custom-select');
    const selectedOption = customSelect.querySelector('.connection__selected-option');
    const options = customSelect.querySelectorAll('.connection__option');

    function checkFormInputs() {
        const inputsFilled = nameInput.value.trim().length >= 2 &&
            !phoneInput.value.includes("_") &&
            selectedOption.innerText !== "Не вибрано" &&
            companyNameInput.value.trim().length >= 2 &&
            businessAreaInput.value.trim().length >= 2;

        submitButton.disabled = !inputsFilled;
    }

    [nameInput, phoneInput, companyNameInput, businessAreaInput].forEach(input => {
        input.addEventListener("input", checkFormInputs);
        input.addEventListener("change", checkFormInputs);
    });

    selectedOption.addEventListener("change", checkFormInputs);
    customSelect.addEventListener("click", checkFormInputs);

    checkFormInputs();

    return {
        checkFormInputs,
    };
})();

const selectLogicModule = (() => {
    const customSelect = document.querySelector('.connection__custom-select');
    const selectedOption = customSelect.querySelector('.connection__selected-option');
    const options = customSelect.querySelectorAll('.connection__option');
    const packageField = document.getElementById("package");

    function handleElementClick(element) {
        const prevSelected = customSelect.querySelector('.connection__option.selected');
        prevSelected?.classList.remove('selected');
        element.classList.add('selected');
        selectedOption.classList.remove('connection__prev');
        selectedOption.textContent = element.textContent;
        customSelect.dataset.value = element.dataset.value;
        customSelect.classList.remove('active');
    }

    function toggleCustomSelect() {
        customSelect.classList.toggle('active');
    }

    function handleOptionClick(option) {
        handleElementClick(option);
        packageField.value = "не обрано";
    }

    function handleButtonClick(button) {
        const packageValue = button.dataset.value;
        const selectedOption = customSelect.querySelector(`.connection__option[data-value="${packageValue}"]`);
        selectedOption && handleElementClick(selectedOption);
    }

    selectedOption.addEventListener('click', toggleCustomSelect);

    options.forEach((option) => {
        option.addEventListener('click', () => handleOptionClick(option));
    });

    const buttons = document.querySelectorAll(".package-btn");
    buttons.forEach((button) => {
        button.addEventListener('click', () => handleButtonClick(button));
        formValidationModule.checkFormInputs();
    });

    document.addEventListener('click', (event) => {
        if (!customSelect.contains(event.target)) {
            customSelect.classList.remove('active');
        }
    });
})();

const phoneInput = document.getElementById('phone');
const maskOptions = {
    mask: '+{38}(000)000-00-00',
    lazy: false
};

const mask = IMask(phoneInput, maskOptions);
