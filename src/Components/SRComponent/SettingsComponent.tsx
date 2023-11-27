import * as React from "react";
import styled from "@emotion/styled";
import { FormItem } from "azure-devops-ui/FormItem";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import { Toggle } from "azure-devops-ui/Toggle";
import { Card } from "azure-devops-ui/Card";
import { CONTEXT } from "./__3_Context";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { ToggleEffect } from "./ToggleEffectComponent";


const Title = styled.h3`
    flex: 1;
    margin: 0;
`

const HeaderArea = styled.div`
    width: 100%;
    display: flex;
`

const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0 0;
    & .bolt-textfield {
        border: 1px solid var(--component-grid-cell-bottom-border-color,rgba(234, 234, 234, 1));
    }
    & .bolt-textfield-default-width {
        width: 100%;
    }
    & .bolt-textfield.focused.focus-treatment {
        box-shadow: none !important;
        border-color: var(--component-grid-cell-bottom-border-color,rgba(234, 234, 234, 1))
    }
`

const Wrapper = styled.div`
    width: 100%;
    min-height: calc(100vh + 50px);
    padding: 50px 10px;
    background: whitesmoke;
`
type CustomSettingsState = {
    openPowerAutoContent: boolean
}

class CustomSettings extends React.Component<{}, CustomSettingsState> {

    static contextType = CONTEXT
    declare context: React.ContextType<typeof CONTEXT>;

    private togglePowerFlow: ObservableValue<boolean>;
    private powerFlowLink: ObservableValue<string | undefined>;

    constructor(props: any) {
        super(props)
        this.powerFlowLink = new ObservableValue<string| undefined>('')
        this.togglePowerFlow = new ObservableValue<boolean>(false)
        this.state = {
            openPowerAutoContent: false,
        }
    }

    public componentDidMount(): void {
        this.powerFlowLink.subscribe(this.addPowerAutomateLink)
        this.togglePowerFlow.subscribe((v, a)=> this.setState({openPowerAutoContent: v}))
    }

    private addPowerAutomateLink(value?: string, action?: string) {
        // Listen to power flow text linnk
    }

    public render(): JSX.Element {
        return (
            <Wrapper>
                <Card className="flex-grow CustomCard--settings">
                    <HeaderArea>
                        <Title>
                            Power Automate
                        </Title>
                        <Toggle checked={this.togglePowerFlow} onChange={(e, v) => this.togglePowerFlow.value = v}/>
                    </HeaderArea>
                    <ToggleEffect show={this.state.openPowerAutoContent}>
                        <HeaderContent>
                            <TextField
                                value={this.powerFlowLink}
                                width={TextFieldWidth.standard}
                                onChange={(e, newValue) => (this.powerFlowLink.value = newValue)}
                                prefixIconProps={{ 
                                    render: (cls) => <span className={cls}>&lt;/&gt;</span>
                                }} />
                        </HeaderContent>
                    </ToggleEffect>
                </Card>
            </Wrapper>
        );
    }

}

CustomSettings.contextType = CONTEXT

export default CustomSettings