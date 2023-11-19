import "./Common.scss";
import "es6-promise/auto";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "azure-devops-ui/Core/override.css";
// import "./_FluentSystemIcons-Filled.css";
// import "./_FluentSystemIcons-Regular.css";
import "./_AzureDevOpsMDL2Assets-Font.css";
import "./Components/SRComponent/__3_Context"


export function showRootComponent(component: React.ReactElement<any>) {
    ReactDOM.render(component, document.getElementById("root"));
}