import React from "react";
import styled from '@emotion/styled'

const TitlePane= styled.div`
    &, 
    & span:nth-child(1),
    & span:nth-child(2) i {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & span:nth-child(1) {
        flex: 1;
    }
    & span:nth-child(1):hover {
        text-decoration: underline;
    }
    & span:nth-child(2) {
        height: 100%;
        padding: 0 2.5px;
    }
`

interface TitleComponentState {
    title: string;
}

export default class TitleComponent extends React.Component<{}, TitleComponentState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            title: "Security Review Checklist"
        };
    }

    public render(): JSX.Element {
        return(
            <TitlePane>
                <span>
                    {this.state.title}
                </span>
                <span>
                    <i className="xfx-ic_fluent_expand_up_right_24_filled"></i>
                </span>
            </TitlePane>
        )
    }

}

