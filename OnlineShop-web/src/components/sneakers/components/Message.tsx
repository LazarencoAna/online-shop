import React from 'react';
// import left_arrow from '../images/left-arrow.svg';
import Button from './UI/Button';
import { useNavigate } from 'react-router-dom';

function Message({
    img,
    title,
    subtitle,
    alt,
    onButtonClick,
    removeButton = false,
}: any) {
    const navigate = useNavigate();

    return (
        <div className="message">
            <img className="message__image" src={img} alt={alt} />
            <h3 className="message__title">{title}</h3>
            <p className="message__subtitle">{subtitle}</p>
            {!removeButton && (
                <Button
                    onClick={() => (onButtonClick && onButtonClick()) ||  navigate(-1)}
                    className="button"
                >
                    <img
                        className="button__left-arrow"
                        src={'asset/sneakers/left-arrow.svg'}
                        alt="Arrow"
                    />
                    Go Back
                </Button>
            )}
        </div>
    );
}

export default Message;
