document.addEventListener('DOMContentLoaded', function () {
        const chatButton = document.getElementById('chatButton');
        const chatPopup = document.getElementById('chatPopup');

        chatButton.addEventListener('click', () => {
            chatPopup.style.display = 'block';
        });

        closeButton.addEventListener('click', () => {
            chatPopup.style.display = 'none';
        });
});
