import { 
    CONTEXT, 
    ContextProps, 
    _tempData, 
    setOriginalListImpl, 
    setCategoriesImpl, 
    setSortedListImpl, 
    setSelectedItemsImpl,
    initSecurityReviewComponentState
} from "./__3_Context";
import * as React from "react";
import { Page } from "azure-devops-ui/Page";
import * as SDK from "azure-devops-extension-sdk";
import { CustomHeader, HeaderIcon, HeaderTitle, HeaderTitleArea, HeaderTitleRow, TitleSize } from "azure-devops-ui/Header";
import { showRootComponent } from "../../Common";
import "./style.css";
import { registerEvents } from "./__11_SDKEventHandler";
import FilterBarComponent from "./__4_HeaderFilterBar";
import TableShimmerExample from "./__6_TableComponent";
import PageContextualMenu, { Point } from "./__9_ContextMenu";
import { contextMenuAnchorPoint, listenScrollEvent } from "./__1";
import { ITableItem } from "./__7_TableProperties";
import { ListSelection } from "azure-devops-ui/List";
import { Icon, IconSize } from "azure-devops-ui/Icon";
import { FilterRegular } from "@fluentui/react-icons";

export interface SecurityReviewComponentState extends ContextProps {
    cmWidth: number
    cmHeight: number
    pageHeaderHieght: number
    cmVisibility: boolean
    customHeaderWidth: number,
    _thead?: any
}

export class SecurityReviewComponent extends React.Component<{},  SecurityReviewComponentState> {
    private contextMenu = React.createRef<HTMLDivElement>()
    private customHeader = React.createRef<HTMLDivElement>()
    private customFilter = React.createRef<HTMLDivElement>()
    private customRoot = React.createRef<HTMLDivElement>()
    
    constructor(props: {}) {
        super(props);
        this.state = initSecurityReviewComponentState(this)
    }
    
    public componentDidMount() {
        SDK.init().then(()=> registerEvents(SDK))
        const inlineProps = {
            cmWidth: this.contextMenu.current?.offsetWidth || 0,
            cmHeight: this.contextMenu.current?.offsetHeight || 0,
            pageHeaderHieght: this.customHeader.current?.offsetHeight || 0,
            customHeaderWidth: this.customRoot.current?.clientWidth || 0
        }
        this.setState(inlineProps, ()=> {
            this.customHeader.current && (this.customHeader.current.style.width = this.state.customHeaderWidth+"px")
        })
    }

    public componentWillUnmount(): void {

    }

    private contextMenuHandler(event: React.MouseEvent) {
        event.preventDefault(); 
        this.setState({
            cmVisibility: true,
            anchorPoint: contextMenuAnchorPoint(event, this)
        }, ()=> {/** Callback */})
    }

    public render(): JSX.Element {
        return (
            <CONTEXT.Provider value={this.state}>
                <>
                    <div className="custom-root" 
                        ref={this.customRoot}
                        // onContextMenu={this.contextMenuHandler.bind(this)}
                        onScroll={(e)=> this.setState({_thead: listenScrollEvent(e)})}>
                        <Page className="sr-page" >
                            <CustomHeader innerRef={this.customHeader} 
                                            className="custom-bolt-header-without-commandbar">
                                <HeaderTitleArea className="src-header-title-area">
                                    <HeaderTitleRow>
                                        <HeaderTitle ariaLevel={3} className="src-header-title" titleSize={TitleSize.Large}>
                                            Security Review [STS 961270]
                                        </HeaderTitle>
                                        <HeaderIcon iconProps={{iconName: "MiniExpand", size: IconSize.medium}}/>
                                    </HeaderTitleRow>
                                </HeaderTitleArea>
                                <FilterBarComponent innerRef={this.customFilter} />
                            </CustomHeader>
                            <div className="page-content" 
                                style={{paddingTop: `${this.state.pageHeaderHieght}px`}} >
                                <TableShimmerExample />
                            </div>
                        </Page>
                    </div>
                    {this.state.cmVisibility && <PageContextualMenu innerRef={this.contextMenu} />}
                </>
            </CONTEXT.Provider>
        )
    }

}

export default SecurityReviewComponent;

showRootComponent(<SecurityReviewComponent />)

