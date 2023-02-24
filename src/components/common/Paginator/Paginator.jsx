import { useState } from 'react';
import cs from './Paginator.module.css'

export const Paginator = ({ totalItemsCount, pageSize, curentPage, onPageChanged, portionSize = 7 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumer, setPortionNumer] = useState(1)

    let leftPortionPageNumber = (portionNumer - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumer * portionSize
    return (
        <div>
            {portionNumer > 1 &&
                <button onClick={() => setPortionNumer(portionNumer - 1)}>Back</button>}

            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span key={p} onClick={() => { onPageChanged(p) }}
                        className={curentPage === p ? cs.selectedPage : ''}>{p}</span>
                })}

            {portionCount > portionNumer &&
                <button onClick={() => setPortionNumer(portionNumer + 1)}>Next</button>}
        </div>
    )
}