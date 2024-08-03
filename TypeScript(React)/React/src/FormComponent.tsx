import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/style.css';

interface FormData {
    name: string;
    password: string;
    showPassword: boolean;
    gender: string;
    languages: { [key: string]: boolean | number };
}

const FormComponent: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        password: '',
        showPassword: false,
        gender: '',
        languages: { Java: false, Python: false, JavaScript: false },
    });

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            if (Object.keys(formData.languages).includes(name)) {
                setFormData(prevData => ({
                    ...prevData,
                    languages: {
                        ...prevData.languages,
                        [name]: checked
                    }
                }));
            } else if (name === 'showPassword') {
                setFormData(prevData => ({
                    ...prevData,
                    showPassword: checked
                }));
            }
        } else if (name.startsWith('years_')) {
            const lang = name.split('_')[1];
            setFormData(prevData => ({
                ...prevData,
                languages: {
                    ...prevData.languages,
                    [lang]: parseInt(value) || 0
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/check');
    };

    return (
        <div>
            <h1>登録情報入力フォーム</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>名前：</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>パスワード：</label>
                    <input
                        type={formData.showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="showPassword"
                            checked={formData.showPassword}
                            onChange={handleChange}
                        />
                        パスワードを表示
                    </label>
                </div>
                <fieldset className="form-group">
                    <legend>性別：</legend>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="男性"
                            checked={formData.gender === '男性'}
                            onChange={handleChange}
                        />
                        男性
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="女性"
                            checked={formData.gender === '女性'}
                            onChange={handleChange}
                        />
                        女性
                    </label>
                </fieldset>
                <div className="dev-exp-container">
                    <label>開発経験：</label>
                    {Object.keys(formData.languages).map((lang) => (
                        <div key={lang} className="form-group">
                            <input
                                type="checkbox"
                                name={lang}
                                checked={formData.languages[lang] as boolean} // 修正: boolean 型キャスト
                                onChange={handleChange}
                            />
                            <label>{lang}</label>
                            <input
                                type="number"
                                name={`years_${lang}`}
                                value={typeof formData.languages[lang] === 'number' ? formData.languages[lang] : ''} // 修正: number 型チェック
                                onChange={handleChange}
                                placeholder="年数"
                            />
                        </div>
                    ))}
                </div>
                <input type="submit" value="送信" />
            </form>
        </div>
    );
};

export default FormComponent;
