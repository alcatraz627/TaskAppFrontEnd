import React, { useState } from 'react'

function Pagniator(props) {

    // Page starts at 0 and goes till count - 1
    const { page, setPage, count, pageLen, setPageLen } = props

    // Math.ceil - 1 since indexing starts from 0, so Math.floor
    const maxPage = Math.floor((count - 1) / pageLen)

    return (
        <div className="paginator">

            <div className="count">Showing page {page + 1} / {maxPage + 1}</div>

            <div className="grow" />

            <button className="sm blue contained" disabled={page < 1} onClick={() => setPage(0)}><i className="fa fa-step-backward" /></button>
            <button className="sm blue contained" disabled={page < 1} onClick={() => setPage(page - 1)}><i className="fa fa-chevron-left" /></button>

            {page > 3 && page > maxPage - 1 && <button className="sm rounded" onClick={() => setPage(page - 2)}>{page - 1}</button>}
            {page > 2 && page > maxPage - 2 && <button className="sm rounded" onClick={() => setPage(page - 1)}>{page}</button>}

            {page > 1 && <button className="sm rounded" onClick={() => setPage(page - 2)}>{page - 1}</button>}
            {page > 0 && <button className="sm rounded" onClick={() => setPage(page - 1)}>{page}</button>}

            {count > 0 ?
                <button className="sm green outlined rounded">{page + 1}</button> :
                <button className="sm outlined" disabled={true}>No results found</button>
            }

            {page < maxPage && <button className="sm rounded" onClick={() => setPage(page + 1)}>{page + 2}</button>}
            {page < maxPage - 1 && <button className="sm rounded" onClick={() => setPage(page + 2)}>{page + 3}</button>}

            {page < 1 && page < maxPage - 2 && <button className="sm rounded" onClick={() => setPage(page + 3)}>{page + 4}</button>}
            {page < 2 && page < maxPage - 3 && <button className="sm rounded" onClick={() => setPage(page + 4)}>{page + 5}</button>}


            <button className="sm blue contained" disabled={page == maxPage} onClick={() => setPage(page + 1)}><i className="fa fa-chevron-right" /></button>
            <button className="sm blue contained" disabled={page == maxPage} onClick={() => setPage(maxPage)} ><i className="fa fa-step-forward" /></button>

            <div className="grow" />

            <select name="pageLen" value={pageLen} onChange={({target: {value}}) => setPageLen(value)}>
                {[2, 5, 10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
        </div>
    )
}

export default Pagniator
