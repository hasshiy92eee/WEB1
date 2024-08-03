//オブジェクト指向(設計)classを使い、スクロールの度に何度でもアニメーションを繰り返すようにする
//JavaScriptでは抽象クラスの概念が存在しないので基底クラス（親クラス）とする
'use strict';

class ScrollAnimation {
    // プライベートフィールドの定義
    #targetElements;
    #scrollPaused;
    #scrollTimeout;

    constructor(selector) {
        if (new.target === ScrollAnimation) {
            //抽象クラスがないので開発者が抽象クラスのような動作をエミュレートさせる
            throw new Error('ScrollAnimation（基底クラス）は直接インスタンス化できません');
        }
        this.#targetElements = document.querySelectorAll(selector);
        this.#scrollPaused = false;
        this.#init();
    }


    #init() {
        this.#handleScroll();
        document.addEventListener('scroll', this.#handleScroll.bind(this));
        window.addEventListener('scroll', this.#debounceScroll.bind(this));
    }
££
    // スクロールイベントハンドラー
    #handleScroll() {
        const windowHeight = window.innerHeight;
        if (!this.#scrollPaused) {
            this.#targetElements.forEach(element => {
                const elementDistance = element.getBoundingClientRect().top + element.clientHeight * 0.6;
                if (windowHeight > elementDistance) {
                    element.classList.add('show');
                } else {
                    element.classList.remove('show');
                }
            });
        }
        this.performAsyncTask();
    }

    // デバウンス処理のためのスクロールイベントハンドラー
    #debounceScroll() {
        this.pauseAnimation();
        clearTimeout(this.#scrollTimeout);
        this.#scrollTimeout = setTimeout(() => {
            this.resumeAnimation();
        }, 100); // 0.1秒後に再開する
    }

    // アニメーションを一時停止
    pauseAnimation() {
        this.#scrollPaused = true;
    }

    // アニメーションを再開
    resumeAnimation() {
        this.#scrollPaused = false;
        this.#handleScroll();
    }

    async performAsyncTask() {
        throw new Error('performAsyncTask must be implemented by subclasses');
    }
}

// 派生クラス
class AsyncScrollAnimation extends ScrollAnimation {
    constructor(selector) {
        super(selector);
    }

    async performAsyncTask() {
        // 非同期処理の例
        console.log("非同期処理を開始！");
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2秒待つ
        console.log("非同期処理が完了！");
    }
}

// クラスのインスタンスを作成し、対象の要素をアニメーション対象とする
const animation = new AsyncScrollAnimation('.animationTarget');
