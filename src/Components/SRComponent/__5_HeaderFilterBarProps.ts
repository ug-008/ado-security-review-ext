import { 
    FilterOperatorType,
    FILTER_CHANGE_EVENT
} from "azure-devops-ui/Utilities/Filter";
import { ITableItem } from "./__7_TableProperties";

type FilterProperties = {
    thisArg: any, 
    key: string, 
    value: any
}

export const statusItems = ["Pass", "Failed", "Not Applicable", "New"]

export function setFilterItemState(prop: FilterProperties) {
    prop.thisArg.context?.filter.setFilterItemState(prop.key, {
        value: prop.value,
        operator: FilterOperatorType.and
    });
}

export function subcribeToFilter(thisArg: any) {
    thisArg.context?.filter.subscribe(() => {
        let status = thisArg.filter.getFilterItemValue('Status'), 
            categorys = thisArg.filter.getFilterItemValue('Categories'), 
            itemFilter = thisArg.filter.getFilterItemValue('ItemFilter'),
            fnIncludes = (v: string, c: string)=> {
                const index = v.lastIndexOf('-'), indexText = v.substring(0, index)
                return c?.includes(indexText)
            },
            sortedList = thisArg.context?.originalList?.value.filter((c: ITableItem) => {
                let __str = `${c.id||''} ${c.name||''} ${c.objectives?.join(' ')||''}`;
                let __1 = itemFilter ? __str.includes(itemFilter):true, 
                    __2 = status && status.length ? status.some((i: string) => fnIncludes(i, (c.status as string))):true,
                    __3 = categorys && categorys.length? categorys.some((i: string) => fnIncludes(i, c.id)): true
                return __1 && __2 && __3
            });
        
        thisArg.context?.setSortedList(sortedList)

    }, FILTER_CHANGE_EVENT);
}

