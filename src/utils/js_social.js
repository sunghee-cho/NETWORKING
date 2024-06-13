//피드 페이지 top 버튼
document.addEventListener('DOMContentLoaded', function() {
    var backToTopButton = document.getElementById('back-to-top');

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {  // 스크롤이 300px 이상일 때 버튼 표시
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // 버튼 클릭 시 페이지의 맨 위로 스크롤
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // 부드럽게 스크롤
        });
    });
});