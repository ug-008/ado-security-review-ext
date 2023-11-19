import React from "react";
import { IReadonlyObservableValue, ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";
import { IItemProvider } from "azure-devops-ui/Utilities/Provider";
import { ITableItem } from "./__7_TableProperties";
import { IListSelection, ListSelection } from "azure-devops-ui/List";
import TableShimmerExample from "./__6_TableComponent";
import { Point } from "./__9_ContextMenu";
import SecurityReviewComponent, { SecurityReviewComponentState } from "./SRComponent";
import { Filter } from "azure-devops-ui/Utilities/Filter";

export interface ContextProps {
    _mainComponent: SecurityReviewComponent
    originalList: IItemProvider<ITableItem | IReadonlyObservableValue<ITableItem | undefined>>,
    sortedList: IItemProvider<ITableItem | IReadonlyObservableValue<ITableItem | undefined>>,
    selection: IListSelection,
    selectedItems: ITableItem[],
    categories: string[],
    filter: Filter,
    loading: boolean
    anchorPoint: Point
    setSelectedItems: (selectedItems: ITableItem[], callback?: ()=> void) => void,
    setOriginalList: (originalList: ITableItem[]|undefined, callback?: ()=> void) => void,
    setSortedList: (sortedList: ITableItem[]|undefined, callback?: ()=> void) => void,
    setCategories: (list: string[], callback?: ()=> void) => void
}

export const initSecurityReviewComponentState = (_this: SecurityReviewComponent):SecurityReviewComponentState => ({
    cmWidth: 0,
    cmHeight: 0,
    customHeaderWidth: 0,
    pageHeaderHieght: 0,
    cmVisibility: false,

    _mainComponent: _this,
    originalList: _tempData,
    sortedList: _tempData,
    categories: [],
    selectedItems: [],
    selection: new ListSelection({ 
        selectOnFocus: false, 
        multiSelect: true, 
        alwaysMerge: true
     }),
    anchorPoint: { x: 0, y: 0 },
    filter: new Filter(),
    setSelectedItems: (a, callback) => setSelectedItemsImpl(_this, a, callback),
    setCategories: (a, callback) => setCategoriesImpl(_this, a, callback),
    setOriginalList: (a, callback) => setOriginalListImpl(_this, a, callback),
    setSortedList: (a, callback) => setSortedListImpl(_this, a, callback),
    loading: true,
});

const _tableShimmer = new Array(10).fill(new ObservableValue<ITableItem | undefined>(undefined));

export const _tempData = new ObservableArray<ITableItem | IReadonlyObservableValue<ITableItem | undefined>>(_tableShimmer)

export function setCategoriesImpl(thisArg: any, categories: string[], callback?: ()=> void) {
    thisArg.setState({categories}, ()=> callback?.())
}

export function setSelectedItemsImpl(thisArg: any, selectedItems: ITableItem[] | undefined, callback?: ()=> void) {
    thisArg.setState({selectedItems}, ()=> callback?.())
}

export function setOriginalListImpl(thisArg: any, originalList: ITableItem[] | undefined, callback?: ()=> void) {
    const observable = new ObservableArray<ITableItem | IReadonlyObservableValue<ITableItem | undefined>>(originalList)
    thisArg.setState({originalList: observable}, ()=> callback?.())
}

export function setSortedListImpl(thisArg: any, sortedList: ITableItem[] | undefined, callback?: ()=> void) {
    const observable = new ObservableArray<ITableItem | IReadonlyObservableValue<ITableItem | undefined>>(sortedList)
    thisArg.setState({sortedList: observable}, ()=> callback?.())
}

export const CONTEXT = React.createContext<ContextProps | undefined>(undefined)
