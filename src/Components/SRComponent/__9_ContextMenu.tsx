import * as React from "react";
import { IMenuItem, Menu, MenuItemType } from "azure-devops-ui/Menu";
import { CSSProperties } from "react";
import styled from "@emotion/styled";
import { CONTEXT } from "./__3_Context";
import { contextMenuAnchorPoint } from "./__1";
import { Status, StatusSize, Statuses } from "azure-devops-ui/Status";
import { OpenRegular, PanelTopExpandFilled } from "@fluentui/react-icons";

export type Point = {
    x: number | string;
    y: number | string
}

interface PageContextMenuState {
    anchorPoint?: Point,
    visibility?: boolean
    contextMenuStyle?: CSSProperties
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, .0);
    z-index: 1000;
`

interface PageContextMenuProps extends PageContextMenuState {
    /** Define independent properties here */
    innerRef?: React.Ref<HTMLDivElement> | null
}

class PageContextualMenu extends React.Component<PageContextMenuProps, PageContextMenuState> {
    static contextType = CONTEXT
    declare context: React.ContextType<typeof CONTEXT>;

    private closeHandler(e: React.MouseEvent) {
        e.preventDefault()
        let _mainC = this.context?._mainComponent
        _mainC?.setState({cmVisibility: false})
    }

    private contextMenuHandler(event: React.MouseEvent) {
        event.preventDefault(); 
        let _mainC = this.context?._mainComponent
        _mainC?.setState({anchorPoint: contextMenuAnchorPoint(event, _mainC)})
    }

    public render(): JSX.Element {
        let _mainC = this.context?._mainComponent
        return (
            <Wrapper onClick={this.closeHandler.bind(this)} 
                    onContextMenu={this.contextMenuHandler.bind(this)}>
                <div style={{
                        top: _mainC?.state.anchorPoint.y,
                        left: _mainC?.state.anchorPoint.x
                     }} 
                     ref={this.props.innerRef}
                     className="src-custom-contextMenu" >
                    <Menu id={"src-custom-contextMenu-item"} items={ menuItems(this) } />
                </div>
            </Wrapper>
        );
    }
}

PageContextualMenu.contextType = CONTEXT

export default PageContextualMenu

const menuItems = (_this?: any): IMenuItem[] => [
    {   
        id: "pc-test-status-item", 
        text: "Window mode",
        iconProps: { 
            iconName: "MiniExpand",
        },
        onActivate(menuItem, event) {
            console.log('Poolr')
        },
    },
    {   
        text: "Status",
        id: "pc-test-status-item",
        onActivate(menuItem, event) {
            console.log('POOL')
            event?.preventDefault()
        }, 
        iconProps: { 
            render: (className)=> <Status {...Statuses.Information} size={StatusSize.m}/>,
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
        },
    },
    { id: "separator", itemType: MenuItemType.Divider },
    { 
        id: "pc-unhide-item",
        text: "Clear all filter",
        iconProps: { 
            iconName: "Clear",
            style: {fontSize: "10px"}
        },
        onActivate(menuItem, event) {
            _this.context?.filter.reset()
        },
    },
    {
        id: "export",
        text: "Export",
        disabled: true,
        subMenuProps: {
            id: "pc-export-sub-menu",
            items: [
                {
                    id: "pc-export-sub-menu-csv",
                    iconProps: { 
                    },
                    text: "as .csv",
                },
                {
                    id: "pc-export-sub-menu-xlsx",
                    iconProps: { 
                    },
                    text: "as .xlsx",
                },
                {
                    id: "pc-export-sub-menu-html",
                    iconProps: { 
                    },
                    text: "as .html",
                }
            ]
        },
        iconProps: {iconName: "Download"},
    },
    { id: "separator", itemType: MenuItemType.Divider },
    {
        id: "settings",
        text: "Settings",
        disabled: true,
        iconProps: {
            iconName: "Settings"
        },
    }
]
