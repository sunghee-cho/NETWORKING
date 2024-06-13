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