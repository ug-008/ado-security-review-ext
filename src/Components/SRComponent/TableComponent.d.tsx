import * as React from "react";
import {
    ColumnMore,
    ColumnSelect,
    ISimpleTableCell,
    ITableColumn,
    renderSimpleCell,
    SimpleTableCell,
    TableColumnLayout,
} from "azure-devops-ui/Table";
import { IMenuItem } from "azure-devops-ui/Menu";
import { ISimpleListCell } from "azure-devops-ui/List";
import { Icon } from "azure-devops-ui/Icon";
import TableItemStatus from "./TableStatusRender";
import { RefObject } from "react";
import { ExpandableButton } from "azure-devops-ui/Button";
import { Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import TableComponent from "./TableComponent";
import { ObservableArrayWrapper } from "./__1";

export interface ITableItem extends ISimpleTableCell {
    id: string;
    name: ISimpleListCell;
    objectives: string[];
    reference: string;
    categoryName: string;
    categoryId: string;
    status: string;
    metadata: {
        ref?: React.RefObject<any>
        index?: number
        selected?: boolean
    }
}

export const columnSchema = (_this: TableComponent)=> [
    new ColumnSelect({
        callback: _this.afterComponentUpdate
    }) as unknown as ITableColumn<ITableItem>,
    {
        columnLayout: TableColumnLayout.singleLinePrefix,
        id: "id",
        name: "Id",
        readonly: true,
        renderCell: renderSimpleCell,
        width: 130,
        maxWidth: 150,
    },
    { 
        id: "name", 
        name: "Name", 
        readonly: true, 
        renderCell: renderSimpleCell, 
        width: -30 
    },
    {
        columnLayout: TableColumnLayout.none,
        id: "objectives",
        name: "Objective",
        readonly: true,
        renderCell: renderItemObjective,
        width: -70,
    },
    {
        columnLayout: TableColumnLayout.none,
        id: "status",
        name: "Status",
        readonly: true,
        renderCell: renderStatus, // Todo: Throws an UncheckedObserver error because no key props
        width: 120,
        maxWidth: 200,
    },
    new ColumnMore((_item: ITableItem, _rowIndex: number, _buttonRef: RefObject<ExpandableButton>) => {
        return {
            id: "sub-menu",
            items: [
                {id: "test-status-1", text: "Pass", iconProps: { render: (cls)=> <Status {...Statuses.Success} size={StatusSize.m}/> }},
                {id: "test-status-2", text: "Failed", iconProps: { render: (cls)=> <Status {...Statuses.Failed} size={StatusSize.m}/> }},
                {id: "test-status-3", text: "N/A", iconProps: { render: (cls)=> <Status {...Statuses.Skipped} size={StatusSize.m}/> }},
                {id: "test-status-4", text: "Default", iconProps: { render: (cls)=> <Status {...Statuses.Queued} size={StatusSize.m}/> }},
            ],
            onActivate: (menuItem: IMenuItem, event?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined)=> {
                const _selectedRows: Map<number, ITableItem> = _this.context!.selectedItems
                if(_selectedRows.size) {
                    Array.from(_selectedRows.values()).forEach(t=> t.status = menuItem.text!)
                    var sortedList = ObservableArrayWrapper(_this.context?.sortedList.value as ITableItem[])
                    _this.context?.setStateImpl({sortedList}, ()=> _this.forceUpdate(()=> {_this.forceUpdate()}))
                }
                else {
                    // Todo: Caution-> Select one or more items
                }
            }
        }
    }),
];

function renderStatus(rowIndex: number, columnIndex: number, tableColumn: ITableColumn<ITableItem>, tableItem: ITableItem): JSX.Element {
    return (<TableItemStatus key={`src-status-${rowIndex}`} rowIndex={rowIndex} item={tableItem}/>);
};

function renderItemObjective(rowIndex: number, columnIndex: number, tableColumn: ITableColumn<ITableItem>, tableItem: ITableItem): JSX.Element {
    return(
        <SimpleTableCell
            columnIndex={columnIndex}
            tableColumn={tableColumn}
            key={"col-" + columnIndex}
            contentClassName="fontWeightSemiBold font-weight-semibold fontSizeM font-size-m" >
            <div className="flex-column wrap-text">
                {
                    tableItem.objectives.filter(e=> e.trim()).map((e, i) => {
                        return (
                            <span className="fontSize font-size secondary-text flex-row flex-center" 
                                    style={{padding: '5px 0'}}>
                                {Icon({
                                    iconName: "Tag",
                                    key: `${tableItem.id}-inx-${i}`,
                                    className: "bolt-table-inline-link-left-padding icon-margin",
                                })}
                                <span style={{display: 'block', 
                                                wordWrap: 'break-word',
                                                textDecoration: 'underline', 
                                                whiteSpace: 'normal'}}>{e}</span>
                            </span>
                        )
                    })
                }
            </div>
        </SimpleTableCell>
    )
}
