import { type FC } from "react";
import "../../../styles/components/small_components/pagination.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'

type Iprops = {
    totalPages: number,
    currentPage: number;
    siblingCount?: number;
    boundaryCount?: number;
    onChange: (page: number) => void;
    getHref?: (page: number) => string; // SEO links
}

const range = (start: number, end: number) => {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
};

const Pagination: FC<Iprops> = ({totalPages=1, currentPage=1, siblingCount = 1, boundaryCount = 1, onChange, getHref}) => {
    const createPages = (): (number | "...")[] => {
        const startPages = range(1, Math.min(boundaryCount, totalPages));
        const endPages = range(
            Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
            totalPages
        );

        const siblingsStart = Math.max(
            Math.min(
                currentPage - siblingCount,
                totalPages - boundaryCount - siblingCount * 2 - 1
            ),
            boundaryCount + 2
        );

        const siblingsEnd = Math.min(
            Math.max(
                currentPage + siblingCount,
                boundaryCount + siblingCount * 2 + 2
            ),
            endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
        );

        const pages: (number | "...")[] = [];

        pages.push(...startPages);

        if (siblingsStart > boundaryCount + 2) {
            pages.push("...");
        } else if (boundaryCount + 1 < totalPages - boundaryCount) {
            pages.push(boundaryCount + 1);
        }

        pages.push(...range(siblingsStart, siblingsEnd));

        if (siblingsEnd < totalPages - boundaryCount - 1) {
            pages.push("...");
        } else if (totalPages - boundaryCount > boundaryCount) {
            pages.push(totalPages - boundaryCount);
        }

        pages.push(...endPages);

        return pages;
    };

    const pages = createPages();

    const handleKeyNav = (e: React.KeyboardEvent<HTMLAnchorElement>, page: number) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(page);
        }
    };

    const renderLink = (page: number, label?: string) => {
        const isCurrent = page === currentPage;
        const href = getHref ? getHref(page) : "#";

        return (
            <a
                href={href}
                onClick={(e) => {
                    e.preventDefault();
                    onChange(page);
                }}
                onKeyDown={(e) => handleKeyNav(e, page)}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={label ?? `Go to page ${page}`}
                tabIndex={0}
                className={`pagination-link ${isCurrent && "current-page"}`}
             >
                {label ? 
                label === "Previous page" ? 
                <FontAwesomeIcon icon={faChevronLeft} /> :
                <FontAwesomeIcon icon={faChevronRight} />
                : page}
            </a>
        );
    };

    return (
        <nav aria-label="Pagination Navigation" className="pagination-container">
            <ul>
                <li className="page-chevron">
                    {renderLink(
                        Math.max(1, currentPage - 1),
                        "Previous page"
                    )}
                </li>

                {pages.map((p, i) => (
                    <li key={i}
                    className={`${p === "..." && "hidden-page"}`}
                    >
                        {p === "..." ? (
                            <span aria-hidden="true">...</span>
                        ) : (
                            renderLink(p)
                        )}
                    </li>
                ))}

                <li  className="page-chevron">
                    {renderLink(
                        Math.min(totalPages, currentPage + 1),
                        "Next page"
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default Pagination



