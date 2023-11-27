import * as React from "react";
import { MessageCard, MessageCardSeverity } from "azure-devops-ui/MessageCard";
import { Observable } from "azure-devops-ui/Core/Observable";

export default class InfoExample extends React.Component {
    message!: Observable<string>;

    constructor() {
        super({});
        this.message = new Observable()
        this.onMessageHandler = this.onMessageHandler.bind(this)
        this.message.subscribe(this.onMessageHandler, "alertBox")
    }
    
    private onMessageHandler(value: string, action: string) {
        console.log(value)
    }

    public render(): JSX.Element {
        return (
            <MessageCard
                className="flex-self-stretch"
                onDismiss={this.onDismiss}
                severity={MessageCardSeverity.Info}>
                {this.message}
            </MessageCard>
        );
    }

    private onDismiss = () => {
        alert("Parents should use onDismiss to stop rendering the Message Bar");
    };
}