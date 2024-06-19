//피드 페이지 top 버튼
document.addEventListener('DOMContentLoaded', function() {
    var backToTopButton = document.getElementById('back-to-top');

    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  
        });
    });
});

//좋아요 버튼
var likeCountElements = document.querySelectorAll('.like-count');

likeCountElements.forEach(function(likeCountElement) {
    likeCountElement.addEventListener('click', function() {
       
        var likeText = likeCountElement.textContent;
        var currentCount = parseInt(likeText.match(/\d+/)[0]);  

        
        if (likeCountElement.classList.contains('liked')) {
            currentCount--;  
            likeCountElement.classList.remove('liked');
        } else {
            currentCount++;  
            likeCountElement.classList.add('liked');
        }

        likeCountElement.textContent = `${currentCount} likes`;
    });
});

//댓글창 입력
document.addEventListener('DOMContentLoaded', function () {
    const commentButtons = document.querySelectorAll('.comment-button');
    const commentTextboxes = document.querySelectorAll('.comment-textbox');

    commentTextboxes.forEach((textbox, index) => {
        textbox.addEventListener('input', function () {
            commentButtons[index].disabled = textbox.value.trim() === '';
        });

        textbox.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && textbox.value.trim() !== '') {
                addComment(textbox, index);
            }
        });
    });

    commentButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            addComment(commentTextboxes[index], index);
        });
    });

    function addComment(textbox, index) {
        const comment = textbox.value.trim();
        if (comment) {
            const commentContainer = document.createElement('div');
            commentContainer.className = 'comment';
            commentContainer.textContent = comment;

            const post = textbox.closest('.post');
            const commentsSection = post.querySelector('.comments');
            commentsSection.appendChild(commentContainer);

            textbox.value = '';
            commentButtons[index].disabled = true;
        }
    }
});