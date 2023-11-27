import { ObservableArray } from "azure-devops-ui/Core/Observable";
import { ITableItem } from "./TableComponent.d";

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
                    e.id = e.id
                    e.name = e.name
                    e.objectives = e.objectives;
                    e.reference = e.reference;
                    e.categoryName = name
                    e.categoryId = id
                    e.status = 'New'
                    e.metadata = {
                        selected: false,
                        index: items.length
                    }
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

/**
 * 
 * @param e 
 * @returns 
 */
export const ObservableArrayWrapper = (e: any) => new ObservableArray<any>(e);

/**
 * Coompare two maps
 * @param map1 
 * @param map2 
 * @returns 
 */
export function compareMaps(map1: Map<number, ITableItem>, map2: Map<number, ITableItem>) {
    if (map1.size !== map2.size) {
        return false;
    }
    for (const [key, value] of map1) {
        if (!map2.has(key) || map2.get(key) !== value) {
            return false;
        }
    }
    return true;
}