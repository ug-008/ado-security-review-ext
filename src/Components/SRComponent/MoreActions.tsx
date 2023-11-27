import { MenuItemType } from "azure-devops-ui/Menu";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";

export const commandBarItems = (_this: any):IHeaderCommandBarItem[] => [
    {
        id: "sr-export-xlsx",
        text: "Export",
        disabled: true,
        iconProps: { 
            iconName: "Download" 
        }
    },
    { id: "separator", itemType: MenuItemType.Divider },
    {
        id: "sr-export-xlsx",
        text: "Reload Page",
        disabled: true,
        iconProps: { 
            iconName: "Refresh" 
        }
    },
    /*{
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
    }*/
];
    

