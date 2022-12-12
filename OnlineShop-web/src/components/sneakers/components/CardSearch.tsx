import React from 'react';
const searchImg = '/asset/sneakers/search.svg';
const remove_button = '/asset/sneakers/remove-button.svg';

function CardSearch({ search, setSearch }: any) {
    return (
        <div className="store__search">
            <img className="store__search-image" src={searchImg} alt="Find" />
            <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="store__input"
                type="text"
                placeholder="Search..."
            ></input>
            <button className="close-button close-button_type_input">
                <img
                    className="close-button__image"
                    onClick={() => setSearch('')}
                    src={remove_button}
                    alt="Close"
                />
            </button>
        </div>
    );
}

export default CardSearch;
