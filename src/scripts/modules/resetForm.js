const resetForm = () => {
    const maskOptions = {
        mask: '+{38}(000)000-00-00',
        lazy: false
    };

    const phoneInput = document.getElementById('phone');
    document.querySelector('.connection__submit').disabled = true;
    document.getElementById("name").value = "";
    document.getElementById("companyName").value = "";
    phoneInput.value = "";
    IMask(phoneInput, maskOptions);
    document.getElementById("businessArea").value = "";
    document.getElementById("package").value = "не обрано";
    document.querySelector('.connection__custom-select').dataset.value = '';

    const selectedOptionElement = document.querySelector(".connection__selected-option");
    selectedOptionElement.textContent = "Не вибрано";
    selectedOptionElement.classList.add('connection__prev');

    const options = document.querySelectorAll('.connection__option');
    options.forEach(option => {
        option.classList.remove("selected");
    });
};

export default resetForm;
