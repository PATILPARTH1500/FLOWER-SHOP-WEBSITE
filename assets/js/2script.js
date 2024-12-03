// JavaScript to handle like button clicks
document.querySelectorAll('.like-btn').forEach((button) => {
    button.addEventListener('click', function() {
        const likeCountSpan = this.nextElementSibling;
        let currentLikes = parseInt(likeCountSpan.textContent);
        likeCountSpan.textContent = currentLikes + 1;
    });
});
