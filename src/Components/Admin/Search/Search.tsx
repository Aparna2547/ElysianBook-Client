import React from 'react'

const Search = () => {
  return (
    <div className="col-xs-12 col-sm-4">
                <form className="search-box d-flex">
                  <input
                    type="text"
                    name="search"
                    className="form-control d-inline"
                    placeholder="Enter the name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
              </div>
  )
}

export default Search