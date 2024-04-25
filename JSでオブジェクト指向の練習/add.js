//画面スクロールしたことにより一度アニメーションが終了した場合でも
//オブジェクト指向(設計)で何度でもアニメーションを繰り返すようにする
'use strict';

class ScrollAnimation {
    constructor(selector) {
        this.targetElements = document.querySelectorAll(selector);
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollPaused = false;
        this.init();
    }

    init() {
        this.handleScroll();
        document.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const windowHeight = window.innerHeight;
        if (!this.scrollPaused) {
            this.targetElements.forEach(element => {
                const elementDistance = element.getBoundingClientRect().top + element.clientHeight * 0.6;
                if (windowHeight > elementDistance) {
                    element.classList.add('show');
                } else {
                    element.classList.remove('show');
                }
            });
        }
    }

    pauseAnimation() {
        this.scrollPaused = true; //: スクロールが一時停止したことを示すフラグは true に設定します
    }

    resumeAnimation() {
        this.scrollPaused = false;
        this.handleScroll(); // スクロール処理を再度実行してアニメーションを再開します
    }
}

const animation = new ScrollAnimation('.animationTarget');

// スクロールが停止されたときにアニメーションを一時停止し、再開する
window.addEventListener('scroll', () => {
    // スクロールが停止したと仮定して、アニメーションを一時停止
    animation.pauseAnimation();

    // スクロールが再開されたと仮定して、アニメーションを再開
    setTimeout(() => {
        animation.resumeAnimation();
    }, 1000); // 1秒後に再開する
});
