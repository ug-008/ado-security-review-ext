import { 
    CONTEXT, 
    ContextProps, 
    _tempData, 
    initSecurityReviewComponentState
} from "./__3_Context";
import * as React from "react";
import { Page } from "azure-devops-ui/Page";
import * as SDK from "azure-devops-extension-sdk";
import { CustomHeader, HeaderBackButton, HeaderIcon, HeaderTitle, HeaderTitleArea, HeaderTitleRow, TitleSize } from "azure-devops-ui/Header";
import { showRootComponent } from "../../Common";
import "./style.css";
import { registerEvents } from "./SDK--events";
import FilterBarComponent from "./FilterBarComponent";
import TableComponent from "./TableComponent";
import { IconSize } from "azure-devops-ui/Icon";
import { Button } from "azure-devops-ui/Button";
import { HeaderCommandBar } from "azure-devops-ui/HeaderCommandBar";
import { commandBarItems } from "./MoreActions";
import { ToggleEffect } from "./ToggleEffectComponent";
import styled from "@emotion/styled";
import CustomSettings from "./SettingsComponent";


const Wrapper = styled.div`padding: 5px 10px;`;

export interface SecurityReviewComponentState extends ContextProps {
    _off: boolean
}

export class SecurityReviewComponent extends React.Component<{},  SecurityReviewComponentState> {
    customFilter = React.createRef<any>()
    customRoot = React.createRef<HTMLDivElement>()
    
    constructor(props: {}) {
        super(props);
        this.state = initSecurityReviewComponentState(this)
        this.onScreenResize = this.onScreenResize.bind(this)
    }
    
    public componentDidMount() {
        this.onScreenResize()
        SDK.init().then(()=> registerEvents(SDK))
        window.addEventListener('resize', this.onScreenResize, true)
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', ()=> {/** Callback */}, true);
    }

    private onScreenResize() {
        var _c = this.customRoot.current,
            _f = _c?.querySelector<HTMLElement>(".CustomFilterWrapper--fixed")
        this.setState({
            filterX: _f?.clientWidth || 0,
            filterY: _f?.clientHeight || 0,
            screenSize: { x: _c?.clientWidth || 0, y: _c?.clientHeight || 0 }, 
        }, ()=> {  })
    }

    private settingsHandler(e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): void {
        var _this = this;
        _this.state.selection.clear()
        _this.setState({_off: !_this.state._off})
    }

    private issueTicketHandler(e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): void {

    }

    public render(): JSX.Element {
        return (
            <CONTEXT.Provider value={this.state}>
                <div className="custom-root" ref={this.customRoot} >
                    <ToggleEffect show={!this.state._off} label="Security Checklist Page">
                        <Page className="sr-page">
                            <CustomHeader className="CustomFilterWrapper--fixed">
                                <HeaderTitleArea className="src-header-title-area">
                                    <HeaderTitleRow className="src-header-title-wrapper">
                                        <HeaderTitle ariaLevel={3} className="src-header-title" titleSize={TitleSize.Large}>
                                            Security Review [STS 961270]
                                        </HeaderTitle>
                                        <HeaderIcon iconProps={{iconName: "MiniExpand", size: IconSize.medium}}/>
                                    </HeaderTitleRow>
                                    <Button className="src-custom-action-btn" disabled text="Issue Ticket" iconProps={{iconName: 'FavoriteList'}} onClick={this.issueTicketHandler.bind(this)}/>
                                    <Button className="src-custom-action-btn" text="Settings" iconProps={{iconName: 'Settings'}} onClick={this.settingsHandler.bind(this)}/>
                                    <HeaderCommandBar items={commandBarItems(this)} buttonCount={0} />
                                </HeaderTitleArea>
                                <FilterBarComponent />
                            </CustomHeader>
                            <div className="page-content" style={{}} >
                                <ToggleEffect show={!this.state.hasZeroSelectedCount}>
                                    <TableComponent />
                                </ToggleEffect>
                                <ToggleEffect show={this.state.hasZeroSelectedCount}>
                                    <div className="CustomHasZeroSelectedCount--noContentFound"
                                         style={{ 
                                            width: this.state.screenSize.x+"px", 
                                            height: (this.state.screenSize.y - this.state.filterY - 20)+"px",
                                            marginTop: this.state.filterY+"px" }} >
                                        No content found
                                    </div>
                                </ToggleEffect>
                            </div>
                        </Page>
                    </ToggleEffect>
                    <ToggleEffect show={this.state._off} label="Settings Page">
                        <Page className="sr-page" >
                            <CustomHeader className="CustomFilterWrapper--fixed" >
                                <Wrapper style={{width: `${this.state.screenSize.x}px`}}>
                                    <HeaderTitleArea className="src-header-title-area" >
                                        <HeaderTitleRow>
                                            <HeaderBackButton buttonProps={{onClick: this.settingsHandler.bind(this)}} />
                                            <HeaderTitle ariaLevel={3} className="src-header-title" titleSize={TitleSize.Large}>
                                                Settings [STS 961270]
                                            </HeaderTitle>
                                        </HeaderTitleRow>
                                    </HeaderTitleArea>
                                </Wrapper>
                            </CustomHeader>
                            <div className="page-content" >
                                <CustomSettings />
                            </div>
                        </Page>
                    </ToggleEffect>
                </div>
            </CONTEXT.Provider>
        )
    }

}

export default SecurityReviewComponent;

showRootComponent(<SecurityReviewComponent />)

