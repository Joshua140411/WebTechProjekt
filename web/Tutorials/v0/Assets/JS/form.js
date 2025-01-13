document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("mainForm");
    const contentContainer = document.getElementById("contentContainer");
    const durationField = document.getElementById("duration");

    const updateFormContent = () => {
        while (contentContainer.firstChild) {
            contentContainer.removeChild(contentContainer.firstChild);
        }
        const selectedType = form.type.value;
        if (selectedType === "text") {
            const urlInput = document.createElement("input");
            urlInput.type = "url";
            urlInput.id = "content";
            urlInput.name = "content";
            urlInput.placeholder = "URL eingeben";
            contentContainer.appendChild(urlInput);
            durationField.required = false;
        } else if (selectedType === "video") {
            const textArea = document.createElement("textarea");
            textArea.id = "content";
            textArea.name = "content";
            textArea.placeholder = "Beschreibung des Videos";
            contentContainer.appendChild(textArea);
            durationField.required = true;
        }
    };
    updateFormContent();
    form.type.forEach((radio) => {
        radio.addEventListener("change", updateFormContent);
    });
});