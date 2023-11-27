import * as React from "react";
import { Status, Statuses, StatusSize } from "azure-devops-ui/Status";
import { ITableItem } from "./TableComponent.d";

export default class TableItemStatus extends React.Component<{item: ITableItem, rowIndex?: number}, {}> {

    public render() {
        let sProps, status = this.props.item.status;
        switch(this.props.item.status) {
            case 'N/A': sProps = {...Statuses.Skipped}
            break
            case 'Pass': sProps = {...Statuses.Success}
            break
            case 'Failed': sProps = {...Statuses.Failed}
            break
            case 'New': 
            default: 
                sProps = {...Statuses.Running}
                status = "New"
        }
        
        return (
            <td className="bolt-table-cell-side-action bolt-table-cell bolt-list-cell col-6" data-column-index="6">
                <div style={{ flexWrap: "wrap", paddingLeft: "20px" }} className="flex-row test-status-container" >
                    <Status
                        {...sProps}
                        key={`src-status-${this.props.rowIndex}`}
                        size={StatusSize.m}
                        className="src-status-wrapper"
                        text={status as string} />
                </div>
            </td>
        );
    }
}