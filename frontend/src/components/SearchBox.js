import React from 'react'

function SearchBox({ searchChange }) {
    return (
        <div>
            <input
                className='w-100 myshadow'
                type="search"
                placeholder='جستجو'
                onChange={searchChange}
            />
        </div>
    )
}

export default SearchBox