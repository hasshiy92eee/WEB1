import React from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/style2.css';



const CheckForm: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <div>
            <h1>入力された内容を確認しました。</h1>
            <form onSubmit={handleSubmit}>
                <input type="submit" value="戻る" />
            </form>
        </div>
    );
};

export default CheckForm;
