import * as React from "react";

export function ToggleEffect(props: {show: boolean, children: any , label?: string}): JSX.Element {
    return (
        <div 
            style={{
                display: props.show?'':'none'}}>
            {props.children!}
        </div>
    )
}