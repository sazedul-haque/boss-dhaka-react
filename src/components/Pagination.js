import React from 'react';

const Pagination = (props) => {

    const Pages = () => {
        const totalPages = props.total_page;
        const currentPage = props.current_page;
        const pages = [];
        if (totalPages < 6) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <li
                        key={i}
                        onClick={props.pageChange.bind(this, i, currentPage)}
                        className={currentPage === i ? 'page-item active' : 'page-item'}>
                        <a className="page-link">{i}</a>
                    </li>
                );
            }
        } else if (currentPage < 3) {
            for (let i = 1; i <= 5; i++) {
                pages.push(
                    <li
                        key={i}
                        onClick={props.pageChange.bind(this, i, currentPage)}
                        className={currentPage === i ? 'page-item active' : 'page-item'}>
                        <a className="page-link">{i}</a>
                    </li>
                );
            }
        } else if ((totalPages - currentPage) < 2) {
            for (let i = currentPage - (4 - (totalPages - currentPage)); i <= currentPage + (totalPages - currentPage); i++) {
                pages.push(
                    <li
                        key={i}
                        onClick={props.pageChange.bind(this, i, currentPage)}
                        className={currentPage === i ? 'page-item active' : 'page-item'}>
                        <a className="page-link">{i}</a>
                    </li>
                );
            }
        } else if (currentPage > 2 && totalPages > 5) {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pages.push(
                    <li
                        key={i}
                        onClick={props.pageChange.bind(this, i, currentPage)}
                        className={currentPage === i ? 'page-item active' : 'page-item'}>
                        <a className="page-link">{i}</a>
                    </li>
                );
            }
        }
        return pages;
    }
    
    return (
        <ul className="pagination justify-content-end">
            <li onClick={props.pageChange.bind(this, props.previous)} className={props.previous ? 'page-item' : 'page-item disabled'}>
                <a className="page-link">Previous</a>
            </li>
            {
                <Pages />
            }
            <li onClick={props.pageChange.bind(this, props.next)} className={props.next ? 'page-item' : 'page-item disabled'}>
                <a className="page-link">Next</a>
            </li>
        </ul>
    )
}
export default Pagination;