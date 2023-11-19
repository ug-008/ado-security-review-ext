import * as React from "react";
import { FilterBar } from "azure-devops-ui/FilterBar";
import { KeywordFilterBarItem } from "azure-devops-ui/TextFilterBarItem";
import { FILTER_CHANGE_EVENT, Filter, FilterOperatorType, IFilterState } from "azure-devops-ui/Utilities/Filter";
import { DropdownMultiSelection } from "azure-devops-ui/Utilities/DropdownSelection";
import { DropdownFilterBarItem } from "azure-devops-ui/Dropdown";
import { setFilterItemState, statusItems, subcribeToFilter } from "./__5_HeaderFilterBarProps";
import { TableComponentProps } from "./__6_TableComponent";
import { _tempData, CONTEXT } from "./__3_Context";
import { HeaderCommandBar } from "azure-devops-ui/HeaderCommandBar";
import { commandBarItems } from "./__2_CommandBarItems";
import styled from "@emotion/styled";
import { FilterRegular } from "@fluentui/react-icons";
import { ITableItem } from "./__7_TableProperties";
import { IReadonlyObservableValue } from "azure-devops-ui/Core/Observable";


interface FilterBarComponentState {
    categories?: string[] | undefined
}

interface FilterBarComponentProps extends TableComponentProps {
    innerRef?: any
}

const Wrapper = styled.div`
    padding: 5px 10px;
    border-bottom: 1px solid var(--component-grid-cell-bottom-border-color,rgba(234, 234, 234, 1));
    position: relative;
    z-index: 10;
    width: 100%;
    background: var(--background-color,rgba(255, 255, 255, 1));
`

class FilterBarComponent extends React.Component<FilterBarComponentProps, FilterBarComponentState> {
    static contextType = CONTEXT
    declare context: React.ContextType<typeof CONTEXT>;
    private readonly __init__: FilterBarComponentState = {
    }
    private statusMultiList = new DropdownMultiSelection();
    private categoriesMultiList = new DropdownMultiSelection();

    constructor(props: FilterBarComponentProps) {
        super(props);
    }

    public componentDidMount(): void {
        ["Status", 
        "Categories", 
        "ItemFilter"].forEach(key => this.context?.filter.setFilterItemState(key, {value: '', operator: FilterOperatorType.and}))
        this.context?.filter.subscribe(
            (v1, a1)=> {
                this.sortList.bind(this)(v1, a1).then((filtered)=> this.context!.setSortedList(filtered))
        }, FILTER_CHANGE_EVENT)
    }

    private sortList(v1: IFilterState, a1?: string): Promise<ITableItem[]> {
        return new Promise((_r1, _r2)=> {
            _r1(this.context?.sortedList.value.filter(
                (t1: ITableItem | IReadonlyObservableValue<ITableItem | undefined>)=> {
                    let t2 = t1 as ITableItem, [_k, _v] = Object.entries(v1)[0]
                    if(_v!['value'].length)
                        return (
                            _v!['value'].some((s: string)=> {
                                const indexText = s.substring(0, s.lastIndexOf('-'))
                                return (t2[_k.toLowerCase()] as string).includes(indexText)
                            })
                        )
                    return true;
                }) as ITableItem[]);
        })
    }
    
    public componentWillUnmount(): void {
        this.context?.filter.unsubscribe(()=>{})
    }

    public render() {
        return (
            <Wrapper ref={this.props.innerRef} >
                <FilterBar filter={this.context?.filter} 
                            hideClearAction 
                            className="custom-bolt-filter-with-commandbar">
                    <KeywordFilterBarItem 
                        filterItemKey="ItemFilter" 
                        iconProps={{
                            render: (cls)=> <FilterRegular className="src-custom-fluentui-icon" style={{fontSize: '20px', paddingLeft: '10px'}}/>
                        }}
                        placeholder="Filter checklist" />
                    {
                        this.context?.categories.length? (
                            <DropdownFilterBarItem
                                filter={this.context?.filter}
                                showFilterBox={false}
                                filterItemKey="Categories"
                                items={this.context.categories.map((c: string, i: number)=> {
                                    return {
                                        text: c, 
                                        id: `${c}-${i}`
                                    };
                                })}
                                width={170}
                                selection={this.categoriesMultiList}
                                placeholder="Categories"
                            />
                        ): <></>
                    }
                    <DropdownFilterBarItem
                        filterItemKey="Status"
                        filter={this.context?.filter}
                        items={statusItems.map((c, i)=> {
                            return {
                                text: c,
                                id: `${c}-${i}`,
                            };
                        })}
                        width={180}
                        selection={this.statusMultiList}
                        placeholder="Status"
                    /> 
                    <HeaderCommandBar items={commandBarItems(this)} buttonCount={0} overflowClassName="pool2" />
                </FilterBar>
            </Wrapper>
        )
    }
}

FilterBarComponent.contextType = CONTEXT

export default FilterBarComponent