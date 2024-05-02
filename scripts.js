const fileInput = document.getElementById('file-input');
const imageSlots = document.querySelectorAll('.image-slot');

function uploadImage() {
  const file = fileInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  fetch('https://api.github.com/repos/MqMrMqR/image-storage/contents/image' + Date.now() + '.jpg', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer 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',
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    const imageUrl = data.content.download_url;
    const emptySlot = Array.from(imageSlots).find(slot => !slot.style.backgroundImage);
    if (emptySlot) {
      emptySlot.style.backgroundImage = `url(${imageUrl})`;
    } else {
      alert('No empty slots available');
    }
  })
  .catch(error => console.error('Error uploading image:', error));
}
