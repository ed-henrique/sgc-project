const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');

let checkedCount = 0;

checkboxes.forEach(checkbox => {
    if (checkbox.checked) checkedCount++;
});

progress.setAttribute("aria-valuenow", checkedCount);
progressBar.style.width = `${(checkedCount / checkboxes.length) * 100}%`;

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) checkedCount++;
        else checkedCount--;

        progress.setAttribute("aria-valuenow", checkedCount);
        progressBar.style.width = `${(checkedCount / checkboxes.length) * 100}%`;
    });
});

const form = document.querySelector('.card form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const courseId = window.location.pathname.split('/')[3];
    await fetch(`/courses/course/${courseId}/update_subscription`, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
            "Content-Type": "application/json",
        },
    });
});

