let lastRippleTime = 0;

document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    // 빗방울이 너무 많이 생기지 않도록 생성 간격 조절 (약 80ms 마다 1개)
    if (now - lastRippleTime < 80) return;
    lastRippleTime = now;

    createRipple(e.clientX, e.clientY);
});

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'mouse-ripple';
    
    // 마우스 커서 위치 기준 중앙 정렬
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    document.body.appendChild(ripple);

    // 애니메이션 지속 시간(0.6초)이 지난 후 DOM에서 제거하여 메모리 누수 방지
    setTimeout(() => {
        ripple.remove();
    }, 600);
}
