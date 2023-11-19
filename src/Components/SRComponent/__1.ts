import { ITableItem } from "./__7_TableProperties";

export type ChecklistProps = {
    url: string;
}

export const fetchChecklist = (url: string, callback: (items: ITableItem[])=> void) => {
    /**
     * HTTPS Header configuration
     */
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    /**
     * @default Fetches default checklist
     */
    fetch(url, config).then(response => response.json()).then(
        (data) => {
        const items: ITableItem[] = [];
        /**
         * Get all test categories
         */
        const categories = data.record.categories;
        /**
         * Looping through all test categories
         */
        for (var category in categories) {
            /**
             * Get "name" & "id" from categories
             */
            const id = categories[category]?.id, name = category
            /**
             * Loop through category tests cases
             */
            categories[category]?.tests.forEach(
                (e: any, i: number) => {
                    e.status = 'New'
                    e.categoryName = name
                    e.categoryId = id
                    e.index = items.length
                    items.push(e) // Add item to ITableItem[]
                }
            )
        }

        callback(items)

    }).catch(ex => {
        const error = ex.response?.status === 404 ? "Resource Not found":"An unexpected error has occurred"
    });
}

export const contextMenuAnchorPoint = (e: React.MouseEvent, thisArg: any) => {
    /**
     * Page content width and height .
     * @default
     */
    let cWidth = e.currentTarget.clientWidth
    let cHeight = e.currentTarget.clientHeight
    /**
     * actualX and actualY are the actual x,y anchor position for context-manu
     * @default
     */
    let actualX = e.clientX + thisArg.state.cmWidth
    let actualY = e.clientY + thisArg.state.cmHeight
    /**
     * Subtract the page header from e.clientY(y-axis) to get the actual page
     * @default
     */
    /**
     * Set the context-menu anchor point
     * @default
     */
    let anchorPoint= {
        x: (actualX < cWidth)? e.clientX : e.clientX - thisArg.state.cmWidth,
        y: (actualY < cHeight)? e.clientY : e.clientY  - thisArg.state.cmHeight
    }
    /**
     * @default
     */
    return anchorPoint
}

export function listenScrollEvent(event: any) {
    let _scrollTop = event.target.scrollTop,
        _translate = "translateY("+(_scrollTop-0)+"px)",
        _boxShadow = "rgba(0, 0, 0, 0.2) 4px 10px 10px -5px",
        _thead = event.target.querySelector("thead");
    _thead.style.opacity = 0
    _thead.style.transform = _translate;
    _thead.style.boxShadow = _scrollTop ? _boxShadow:'none';
    _thead.style.opacity = 1
    return _thead
}