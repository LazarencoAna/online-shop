import React from 'react';

function Select({ options, defaultValue, value, onChange }: any) {
    return (
        <select
            className="select"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >
            <option disabled value="">
                {defaultValue}
            </option>
            {options.map((option: any) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}

export default Select;
