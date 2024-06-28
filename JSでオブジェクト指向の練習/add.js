
//オブジェクト指向(設計)classを使い、スクロールの度に何度でもアニメーションを繰り返すようにする
//今後機能を追加することを視野に入れてカプセル化にしておく（追加するなら非同期処理など？）
//JavaScriptでは抽象クラスの概念が存在しない？多態性をどうする？
//継承の概念はある。
'use strict';

class ScrollAnimation {
    // プライベートフィールドの定義
    #targetElements;
    #scrollPaused;
    #scrollTimeout;

    constructor(selector) {
        this.#targetElements = document.querySelectorAll(selector);
        this.#scrollPaused = false;
        this.#init();
    }

    // 初期化する
    #init() {
        this.#handleScroll();
        // スクロールイベントリスナーを追加
        document.addEventListener('scroll', this.#handleScroll.bind(this));
        window.addEventListener('scroll', this.#debounceScroll.bind(this));
    }

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
}

// クラスのインスタンスを作成し、対象の要素をアニメーション対象とする
const animation = new ScrollAnimation('.animationTarget');
