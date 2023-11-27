import React from "react";
import {Table} from "azure-devops-ui/Table";
import { ITableItem, columnSchema } from "./TableComponent.d";
import { CONTEXT } from "./__3_Context";
import { ObservableArrayWrapper, fetchChecklist } from "./__1";
import { ISelectionRange } from "azure-devops-ui/Utilities/Selection";
import styled from "@emotion/styled";

export interface TableComponentProps {
    /** Todo: */
}

export interface TableComponentState {
    
}

const _cbdisable = (rowRef: any)=> {
    let _r = rowRef.current, _c = _r?.querySelector('.bolt-checkbox');
    _r?.classList.remove('selected'); _c?.classList.remove('enabled', 'checked'); _c?.classList.add('disabled')
}

const _cbenable = (rowRef: any)=> {
    let _r = rowRef.current, _c = _r?.querySelector('.bolt-checkbox')
    _r?.classList.add('selected'); _c?.classList.add('enabled', 'checked'); _c?.classList.remove('disabled')
};

class TableComponent extends React.Component<TableComponentProps,  {}> {

    static contextType = CONTEXT
    context!: React.ContextType<typeof CONTEXT> 

    headerRef: React.RefObject<any>
    
    constructor(props: Readonly<TableComponentProps>) {
        super(props)
        this.onSelectHandler = this.onSelectHandler.bind(this)
        this.afterComponentUpdate = this.afterComponentUpdate.bind(this)
        this.setRowRefs = this.setRowRefs.bind(this)
        this.headerRef = React.createRef()
    }

    public componentDidMount() {
        const _this = this
        this.context?.selection.subscribe(this.onSelectHandler)
        if (false)
            fetchChecklist(
                "https://api.jsonbin.io/v3/b/6546db450574da7622c21f3d", 
                function(items: ITableItem[]){
                    _this.context?.setStateImpl({
                        sortedList: ObservableArrayWrapper(items),
                        originalList: ObservableArrayWrapper(items),
                        categories: [...new Set(items.map<string>(e => e.categoryId))]
                    })
                }
            )
    }

    public afterComponentUpdate(colProps: any, tableProps: any) {
        // Caution: This method is not a life-cycle hook.
        // Do not use setState/forceState in this method
    }

    private async setRowRefs(rowItem: ITableItem, rowRef: React.RefObject<any>) {
        // Caution: Don't setState in this method
        var items = this.context?.sortedList.value as ITableItem[] || []
        try {
            items[rowItem.metadata.index!].metadata.ref = rowRef;
            this.context!.selectedItems.has(rowItem.metadata.index!) ? _cbenable(rowRef):_cbdisable(rowRef)
        } catch (error) {
            // Ignore this error
        }
    }

    private onSelectHandler(value: ISelectionRange[], action?: string | undefined) {
        // Caution: Don't setState in this method
        var endIndex, beginIndex, items = this.context?.sortedList.value as ITableItem[]
        for(var x=0; x < value.length; x++) {
            endIndex = value[x]['endIndex']
            beginIndex = value[x]['beginIndex']
            for(; beginIndex <= endIndex; beginIndex++) {
                if(items){
                    action==='select' ? this.context?.selectedItems.set(beginIndex, items[beginIndex])
                                      : this.context?.selectedItems.delete(beginIndex);
                }
            }
        }
    }

    public render(): JSX.Element {
        return (
            <Table<ITableItem>
                ariaLabel="Table shimmer"
                className="table-example"
                columns={columnSchema(this)}
                showLines={true}
                headerRef= {this.headerRef}
                fixedHeader={(props)=> <FixedTableHeader _this={this} {...props}/>}
                rowRefs={this.setRowRefs}
                containerClassName="h-scroll-auto"
                itemProvider={this.context?.sortedList}
                selection={this.context?.selection}
                role="table"
            />
        )
    }
}

TableComponent.contextType = CONTEXT

export default TableComponent

/**
 * Fixed header is a hack into the table header
 * that was wrapped into a div tag.
 * @param props 
 * @returns 
 */
function FixedTableHeader(props: any): JSX.Element {
    var {_this, header, wrapperRef} = props, 
        _a = wrapperRef.current, // Table container ref: 'div'
        _ref = React.useRef<HTMLDivElement>(null),
        _b = _a?.querySelector('table tbody tr:first-child'),
        _c = _a?.querySelectorAll('tbody tr:nth-child(3) td'),
        [headerColWidth, setHeaderColWidth] = React.useState<number[]>([]),
        [firstTRHeight, setFirstTRHeight] = React.useState<string|number>(0);

    React.useEffect(
        ()=> {
            var _a = _ref.current?.offsetHeight;
            if(_a) setFirstTRHeight((_a + _this.context?.filterY)+"px") 
        },
    [_c] )

    React.useEffect(
        ()=> {
            _c && setHeaderColWidth([..._c].map((_, index)=> _.offsetWidth))
            _b && (_b.style.height = firstTRHeight) // Set the height of the first row, to align first visible table row
        }, 
    [firstTRHeight, _this.context?.screenSize.x]);

    return React.createElement(
        styled.div`
            & thead tr th {
                ${headerColWidth.map((_, index) => `&:nth-child(${index+1}) { width: ${_}px}`).join('\n')}
            }
        `, 
        {
            style: {
                width: `${_this.context?.screenSize.x}px`,
                top: _this.context?.filterY+"px"
            },
            className: "CustomHeaderWrapper--fixed", 
            ref: _ref
        }, 
        header
    )

}
