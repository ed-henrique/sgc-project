const selectedImage = document.getElementById('selected');
const imageInput = document.getElementById('image');

imageInput.addEventListener('change', (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        selectedImage.src = e.target.result;
    }

    reader.readAsDataURL(image);
});
