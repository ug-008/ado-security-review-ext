import { AccessTimeFilled, ClearFormattingRegular, ClosedCaptionRegular, FilterRegular, Multiplier12XRegular } from "@fluentui/react-icons";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { IMenuItem, MenuItemType } from "azure-devops-ui/Menu";
import { Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import React, { createElement } from "react";
import { ITableItem } from "./__7_TableProperties";
import FilterBarComponent from "./__4_HeaderFilterBar";

const changeBulkStatus = (_this: FilterBarComponent, txt: string)=> {
    let sortedList = _this.context?.sortedList.value as ITableItem[];
    if(sortedList) {
        _this.context?.selectedItems.forEach((t: ITableItem) => {
            t.status = txt
            _this.context?.selection.addUnselectable(t.index)
        })
        console.log(_this.context?.selection)
        // _this.context?.setSortedList(sortedList, ()=> {
        //     let endIndex = sortedList.length - 1
        //     _this.context?.selection.unselect(0, endIndex)
        //    // _this.context?.selection.select(selectedIndex)
        // })
    }
}

export const commandBarItems = (_this: FilterBarComponent):IHeaderCommandBarItem[] => [
    {
        id: "sr-export-xlsx",
        text: "Export",
        disabled: true,
        iconProps: { 
            iconName: "Download" 
        }
    },
    {
        id: "sr-clear-all-filter",
        text: "Clear Filter",
        iconProps: { 
            iconName: 'Clear',
            style: {fontSize: '12px'}
        },
        onActivate: (menuItem: IMenuItem, event?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined) => {
            _this.context?.filter.reset()
        }
    },
    {
        id: "sr-export-xlsx",
        text: "Change status",
        iconProps: { 
            render: (className)=> <Status {...Statuses.Queued} size={StatusSize.m}/>,
        },
        subMenuProps: {
            id: "pc-status-sub-menu",
            className: "src-custom-contextMenu",
            items: [
                {
                    id: "pc-status-sub-menu-pass",
                    className: "src-custom-marginTop",
                    iconProps: { 
                        render: (className)=> <Status {...Statuses.Success} size={StatusSize.m} />,
                    },
                    text: "Pass",
                    onActivate: (menuItem, event)=> changeBulkStatus(_this, menuItem.text as string)
                },
                {
                    id: "pc-status-sub-menu-failed",
                    iconProps: { 
                        render: (className)=> <Status {...Statuses.Failed} size={StatusSize.m}/>,
                    },
                    text: "Failed",
                }
                ,
                {
                    text: "N/A",
                    id: "pc-status-sub-menu-na",
                    iconProps: { 
                        render: (className)=> <Status {...Statuses.Skipped} size={StatusSize.m}/>,
                    }
                },
                { id: "separator", itemType: MenuItemType.Divider },
                {
                    text: "Default",
                    id: "pc-status-sub-menu-default",
                    className: "src-custom-opaque",
                    iconProps: { 
                        render: (className)=> <Status {...Statuses.Queued} size={StatusSize.m}/>,
                    }
                }
            ]
        },        },
    { id: "separator", itemType: MenuItemType.Divider },
    {
        id: "settings",
        text: "Settings",
        disabled: true,
        iconProps: { 
            iconName: "Settings" 
        }, 
    }
];
    

