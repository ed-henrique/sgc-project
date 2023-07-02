const modalForm = document.querySelector('.modal-content form');
const modalFormInput = document.querySelector('.modal-content form input');
const editButtons = document.querySelectorAll('button.btn-warning');

editButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        const buttonElement = e.target.closest("button");
        modalForm.action = `/categories/update/${buttonElement.getAttribute("data-category-id")}?_method=PUT`;
        modalFormInput.value = buttonElement.getAttribute("data-category-name");
    });
});