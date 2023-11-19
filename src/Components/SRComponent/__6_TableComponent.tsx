import React, { SyntheticEvent } from "react";
import {ObservableArray, IReadonlyObservableValue, IObservableArrayEventArgs, ObservableArrayAction } from "azure-devops-ui/Core/Observable";
import {ITableRow, Table} from "azure-devops-ui/Table";
import { ITableItem, columnSchema } from "./__7_TableProperties";
import { IListSelectionOptions, ListSelection } from "azure-devops-ui/List";
import { CONTEXT } from "./__3_Context";
import { fetchChecklist } from "./__1";
import { ISelectionRange } from "azure-devops-ui/Utilities/Selection";

export interface TableComponentProps {
    /** Todo: */
}

class TableShimmerExample extends React.Component<TableComponentProps,  {}> {
    static contextType = CONTEXT
    context!: React.ContextType<typeof CONTEXT>
    private readonly selectedIndexes = new Set<number>([])
    
    constructor(props: Readonly<TableComponentProps>) {
        super(props)
    }

    /**
     * Get all setted table items and update "CONTEXT.setSelectedItems"
     * @param value Currently selected table-items range
     * @param action select or unselect actionType
     */
    public onSelecthandler(_this: any, value: ISelectionRange[], action: string): void {
        let sortedList = _this.context?.sortedList as ObservableArray<ITableItem>;
        value.map(x=> Array.from({ length: x.endIndex - x.beginIndex + 1 }, (_, i) => x.beginIndex + i))
                /** Flatten */ 
                .reduce((a, b)=> a.concat(b), []).forEach(index=> {
                    action==='select'? _this.selectedIndexes.add(index):_this.selectedIndexes.delete(index)
                });
        _this.context.selectedItems = sortedList.value.filter((item, index)=> this.selectedIndexes.has(index));
    }
 
    public componentDidMount() {
        const _this = this
        _this.context?.selection.subscribe((v, a)=> this.onSelecthandler(_this, v, a as string))
        fetchChecklist(
            "https://api.jsonbin.io/v3/b/6546db450574da7622c21f3d", 
            function(items: ITableItem[]){
                _this.context?.setSortedList(items)
                _this.context?.setOriginalList(items)
                _this.context?.setCategories([...new Set(items.map<string>(e => e.categoryId))])
            }
        )
    }

    public render(): JSX.Element {
        return (
            <Table<ITableItem>
                ariaLabel="Table shimmer"
                className="table-example"
                columns={columnSchema(this.context)}
                showLines={true}
                containerClassName="h-scroll-auto"
                itemProvider={this.context?.sortedList}
                selection={this.context?.selection}
                role="table"
            />
        )
    }

}

TableShimmerExample.contextType = CONTEXT

export default TableShimmerExample
