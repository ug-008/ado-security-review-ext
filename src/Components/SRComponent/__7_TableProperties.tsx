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
import { css } from "azure-devops-ui/Util";
import { IMenuItem, MenuItemType } from "azure-devops-ui/Menu";
import { ISimpleListCell } from "azure-devops-ui/List";
import { IReadonlyObservableValue, ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";
import { Icon } from "azure-devops-ui/Icon";
import TableItemStatus from "./__8_TableItemStatus";
import { RefObject } from "react";
import { ExpandableButton } from "azure-devops-ui/Button";

export interface ITableItem extends ISimpleTableCell {
    id: string;
    name: ISimpleListCell;
    objectives: string[];
    reference: string;
    categoryName: string;
    categoryId: string;
    index: number;
}

export const columnSchema = (context: any)=> [
    new ColumnSelect() as unknown as ITableColumn<ITableItem>,
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
    new ColumnMore<ITableItem>((listItem: ITableItem, rowIndex: number, buttonRef: RefObject<ExpandableButton>) => {
        return {
            id: "sub-menu",
            items: [
                { id: "test-status-1", text: "Pass" },
                { id: "test-status-2", text: "Failed" },
            ],
            onActivate: (menuItem: IMenuItem, event?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined)=> {
                let txt = menuItem.text
                if(txt && listItem.status) {
                    listItem.status = (menuItem.text as string)
                    context?.setSortedList(context.sortedList.value, ()=> {
                        let endIndex = context?.sortedList.value.length - 1
                        context?.selection.unselect(0, endIndex)
                        context?.selection.select(rowIndex)
                    })
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
