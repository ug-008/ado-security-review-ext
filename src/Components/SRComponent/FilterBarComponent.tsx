import * as React from "react";
import { FilterBar } from "azure-devops-ui/FilterBar";
import { KeywordFilterBarItem } from "azure-devops-ui/TextFilterBarItem";
import { Pill, PillSize, PillVariant } from "azure-devops-ui/Pill";
import { FILTER_CHANGE_EVENT, Filter, IFilterOptions, IFilterState } from "azure-devops-ui/Utilities/Filter";
import { DropdownMultiSelection } from "azure-devops-ui/Utilities/DropdownSelection";
import { DropdownFilterBarItem } from "azure-devops-ui/Dropdown";
import { TableComponentProps } from "./TableComponent";
import { _tempData, CONTEXT } from "./__3_Context";
import styled from "@emotion/styled";
import { ITableItem } from "./TableComponent.d";
import { ObservableArrayWrapper } from "./__1";
import Const from "./Constant";
import { ToggleEffect } from "./ToggleEffectComponent";


const Wrapper = styled.div`padding: 5px 10px;`;

interface FilterBarComponentProps extends TableComponentProps {
    innerRef?: any
}

class FilterBarComponent extends React.Component<FilterBarComponentProps, {count: number}> {
    private filter: Filter
    static contextType = CONTEXT
    declare context: React.ContextType<typeof CONTEXT>;
    private filterOptions: IFilterOptions = {
        customValueComparers: { }
    }
    private statusMultiList = new DropdownMultiSelection();
    private categoriesMultiList = new DropdownMultiSelection();

    constructor(props: FilterBarComponentProps) {
        super(props);
        this.state = { count: 0 }
        this.filter = new Filter(this.filterOptions)
        this.setCounter = this.setCounter.bind(this)
        this.filterTableItems = this.filterTableItems.bind(this)
        this.onExpandDropDownBoxHandler = this.onExpandDropDownBoxHandler.bind(this)
    }

    public componentDidMount(): void {
        this.context?.selection.subscribe(this.setCounter)
        this.filter.subscribe((v1, a1)=> this.filterTableItems(v1, a1), FILTER_CHANGE_EVENT)
    }

    public componentWillUnmount(): void {
        this.filter.unsubscribe(()=>{})
    }

    private setCounter() {
        this.setState({count: this.context?.selection.selectedCount || 0})
    }

    private onExpandDropDownBoxHandler() {
        this.context?.selection.clear(); 
    }

    private filterValueComparer(a: any, b: any): boolean {
        if(this.context!.selectedItems.size) {
            this.context!.selection.clear(); 
        }
        return true
    }

    private filterTableItems(v1: IFilterState, action?: string): void {

        let _a = this.filter, 
            _txt = _a.getFilterItemValue<string>('Text') || '',
            _s = _a.getFilterItemValue<[{text: string}]>('Status') || [],
            _c = _a.getFilterItemValue<[{text: string}]>('Categories') || [], 
            _o = this.context!.originalList.value || [], 
            _b: ITableItem[] = [];

        for(var x = 0; x < _o.length; x++){
            let {metadata, ...t2} = _o[x] as ITableItem, // Remove metadata property
                f1 = _c.length == 0 || _c.some(({text})=> t2['id'].includes(text)),
                f2 = _s.length == 0 || _s.some(({text})=> t2['status'].includes(text)),
                f3 = _txt.trim().length == 0 || JSON.stringify(t2).toLowerCase().includes(_txt.toLowerCase());
            f1 && f2 && f3 && _b.push(_o[x] as ITableItem)
        }

        if (!_b.length) this.context!.setStateImpl({ hasZeroSelectedCount: true })
        else this.context!.setStateImpl({ hasZeroSelectedCount: false, sortedList: ObservableArrayWrapper(_b)})
    }

    public render() {
        return (
            <Wrapper style={{width: `${this.context?.screenSize.x}px`}}>
                <FilterBar filter={this.filter} className="custom-filter">
                    <KeywordFilterBarItem 
                        filterItemKey="Text" 
                        placeholder="Filter checklist" 
                        filterValueComparer={this.filterValueComparer}
                        />
                    <DropdownFilterBarItem
                        filter={this.filter}
                        showFilterBox={false}
                        filterItemKey="Categories"
                        onExpand={this.onExpandDropDownBoxHandler}
                        items={this.context?.categories.map((c, i)=> {
                            return {
                                text: c, 
                                id: 's'+i, 
                                data: {
                                    text: c, 
                                }
                            }
                        })!}
                        noItemsText="No categories found"
                        selection={this.categoriesMultiList}
                        placeholder="Categories" />
                    <DropdownFilterBarItem
                        filterItemKey="Status"
                        filter={this.filter}
                        onExpand={this.onExpandDropDownBoxHandler}
                        items={["Pass", "Failed", "Not Applicable", "New"].map((c, i)=> {
                            return {
                                text: c, 
                                id: 's'+i, 
                                data: {
                                    text: c, 
                                }
                            }
                        })}
                        width={180}
                        selection={this.statusMultiList}
                        placeholder="Status" /> 
                    <ToggleEffect show={this.state.count > 0}>
                        <Pill size={PillSize.compact}
                                color={{red: 252,
                                    green: 194,
                                    blue: 173
                                }} 
                                className="CustomFilterPill--selectCount"
                                variant={PillVariant.colored} > 
                            <span>Selected ({ this.state.count })</span>
                        </Pill>
                    </ToggleEffect>
                </FilterBar>
            </Wrapper>
        )
    }
}

FilterBarComponent.contextType = CONTEXT

export default FilterBarComponent