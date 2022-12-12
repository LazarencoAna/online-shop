import React from 'react';

function Button({ onClick, isLoading, children, modClass }: any) {
    return (
        <button
            disabled={isLoading}
            onClick={onClick}
            className={`button ${isLoading && 'button_disabled'} ${modClass}`}
        >
            {children}
        </button>
    );
}

export default Button;
