import React from 'react'

function SearchBox({searchChange}) {
    return (
        <div>
            <input
                type="search"
                placeholder='جستجو'
                onChange={searchChange}
            />
        </div>
    )
}

export default SearchBox