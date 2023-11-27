import React from "react";
import { IReadonlyObservableValue, ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";
import { IItemProvider } from "azure-devops-ui/Utilities/Provider";
import { ITableItem } from "./TableComponent.d";
import { IListSelection, ListSelection } from "azure-devops-ui/List";
import SecurityReviewComponent, { SecurityReviewComponentState } from "./SRComponent";

export interface ContextProps {
    categories: string[];
    selection: IListSelection,
    filterX: number,
    filterY: number,
    hasZeroSelectedCount: boolean,
    selectedItems: Map<number, ITableItem>
    originalList: IItemProvider<ITableItem | IReadonlyObservableValue<ITableItem | undefined>>,
    sortedList: IItemProvider<ITableItem | IReadonlyObservableValue<ITableItem | undefined>>,
    screenSize: {x: number, y: number}
    setStateImpl: (state: any, callback?:()=> void)=> void
}

export const initSecurityReviewComponentState = (_this: SecurityReviewComponent):SecurityReviewComponentState => ({
    _off: false,
    categories: [],
    originalList: _tempData,
    sortedList: _tempData,
    selectedItems: new Map<number, ITableItem>(),
    selection: new ListSelection({ selectOnFocus: false, multiSelect: true, alwaysMerge: true }),
    hasZeroSelectedCount: false,
    screenSize: {x: 0, y: 0},
    filterX: 0,
    filterY: 0,
    setStateImpl: (state: any, callback?: any)=> _this.setState({...state}, callback?.()),

});

export const CONTEXT = React.createContext<ContextProps | undefined>(undefined)

const _tableShimmer = new Array(10).fill(new ObservableValue<ITableItem | undefined>(undefined));

export const _tempData = new ObservableArray<ITableItem | IReadonlyObservableValue<ITableItem | undefined>>(_tableShimmer)