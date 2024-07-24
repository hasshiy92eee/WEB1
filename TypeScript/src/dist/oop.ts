// TypeScriptの特徴についてのコメント
// TypeScriptはJavaScriptと互換性を保ちつつ、JavaScriptを拡張した言語です。
// インターフェースやvoid型、unknown型、抽象クラス、アクセス修飾子などを追加して、JavaScriptの欠点を補っています。
// ジェネリクスについて
//null型演算子、オプショナルチェーン

const add = <T>(arg: T): T => {
    return arg;
}

export const oop = () => {
    const name: string = "Miyo";
    const address: { state: string } = {
        state: "programmer"
    }; // オブジェクトの型指定
    const today: Date = new Date();
    const none: null = null;
    const notDefined: undefined = undefined;
    const random: unknown = "random"; // `any`よりも`unknown`の方が型安全
    const answer: "yes" | "no" = "yes";

    // 文字列の配列を逆にする関数
    function reverseStringArray(arr: string[]): string[] {
        return arr.reverse();
    }

    const weblist: string[] = ["HTML", "CSS", "JavaScript", "TypeScript"];
    const reversedList = reverseStringArray(weblist);
    console.log(reversedList);

    // `add` 関数を使って文字列を追加
    console.log(add<string>("it's a beautiful day today"));

    // null型演算子、オプショナルチェーンをasync/awaitで学ぶ
    fetchData();
}



// `Student`インターフェースの定義
interface Student {
    studentId: number;
    name: string;
    age: string;
    email: string;
    access: boolean;
}

// `Student`インターフェースに合致するオブジェクト
const student: Student = {
    studentId: 1,
    name: "Ao",
    age: "28",
    email: "ao@yahoo.com",
    access: true,
}

// `User` クラスの定義
export default class User {
    // プロパティの宣言
    userId: number;
    name: string;
    age: number;
    email: string;
    isActive: boolean;

    // コンストラクタ
    constructor(userId: number, name: string, age: number, email: string, isActive: boolean) {
        this.userId = userId;
        this.name = name;
        this.age = age;
        this.email = email;
        this.isActive = isActive;
    }

    // 公開メソッド
    public getProfile(): string {
        return `Name: ${this.name}, Age: ${this.age}`;
    }

    // 静的メソッド
    public static sayHelloWorld(): void {
        console.log("Forest of Twilight");
    }
}

// クラスのインスタンスを作成し、メソッドを呼び出す
const user = new User(1, "izumi", 27, "izumi@yahoo.com", true);
console.log(user.getProfile());

// 非同期関数のでnull型演算子とオプショナルチェーン
//オブジェクトがnullまたはundefinedの場合に、プロパティのアクセスやメソッドの呼び出しを
//安全に行うためのもの構文。nullやundefinedによるエラーを未然に防ぐ（!,?）
const fetchData = async (): Promise<void> => {
    try {
        // fetchリクエストを送信
        const serializabl_respons = await fetch("https://jsonplaceholder.typicode.com/users");

        // 2秒待つ
        await new Promise(resolve => setTimeout(resolve, 2000));

        // レスポンスをJSON形式で取得
        const data = await serializabl_respons.json();

        // レスポンスのステータスコードを取得し、コンソールに出力
        console.log(serializabl_respons?.status);

        // 取得したデータをコンソールに出力
        console.log(data);
    } catch (error) {
        // エラーハンドリング
        console.error("An error occurred:", error);
    }
}