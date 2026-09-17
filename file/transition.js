document.addEventListener('DOMContentLoaded', () => {
    // 트랜지션을 개별적으로 적용할 요소들 선택
    const elements = document.querySelectorAll('.logo, nav .menu li, .gallery img, .stacked-images img, .sns-item, .work-item, .about-text');
    
    // 초기에는 모두 투명하게 설정하고 약간 아래에 위치
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
        
        // 들어올 때 요소별 완전 랜덤한 딜레이 부여 (0초 ~ 0.5초 사이)
        const randomDelay = Math.random() * 0.5;
        el.style.transitionDelay = `${randomDelay}s`;
    });

    // 아주 약간의 딜레이 후 opacity를 1로, 위치를 원래대로 변경하여 나타나게 함
    setTimeout(() => {
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 50);

    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 내부 페이지 이동 링크인지 확인
            if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('mailto:')) {
                e.preventDefault();
                const targetUrl = this.href;
                
                let maxDelay = 0;
                
                // 나갈 때 각 요소별로 새로운 랜덤 딜레이 부여
                elements.forEach(el => {
                    const delay = Math.random() * 0.5; // 0초 ~ 0.5초 사이 랜덤
                    if (delay > maxDelay) maxDelay = delay;
                    
                    el.style.transitionDelay = `${delay}s`;
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(-15px)'; // 위로 스르륵 사라짐
                });
                
                // 모든 요소가 다 사라지는 시간 계산 (최대 딜레이 + 트랜지션 지속 시간 0.8초 + 안전마진)
                const waitTime = (maxDelay + 0.8) * 1000 + 100;
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, waitTime); 
            }
        });
    });
});
