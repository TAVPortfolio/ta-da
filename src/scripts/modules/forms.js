import resetForm from './resetForm';

const forms = (url) => {
    async function sendData() {
        try {
            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const selectedOption = document.querySelector(".connection__selected-option").textContent.trim();
            const packageType = document.getElementById("package").value;
            const companyName = document.getElementById("companyName").value;
            const businessArea = document.getElementById("businessArea").value;

            const formData = {
                name,
                phone,
                selectedOption,
                packageType,
                companyName,
                businessArea
            };

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Помилка при відправці даних.");
            }

            const data = await response.json();
            console.log("Дані успішно відправлені:", data);
        } catch (error) {
            console.error("Сталась помилка:", error);
        }
    }

    document.querySelector(".connection__form").addEventListener("submit", function(event) {
        event.preventDefault(); 
        sendData();
        resetForm();
    });
}

export default forms;

