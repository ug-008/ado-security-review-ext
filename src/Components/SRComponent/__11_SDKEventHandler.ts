import { 
    IWorkItemLoadedArgs, 
    IWorkItemChangedArgs, 
    IWorkItemFieldChangedArgs,
    IWorkItemFormService,
    WorkItemTrackingServiceIds
} from "azure-devops-extension-api/WorkItemTracking"

// export async function onClick(SDK: any) {
//     const workItemFormService = await SDK.getService<IWorkItemFormService>(
//         WorkItemTrackingServiceIds.WorkItemFormService
//     );
//     workItemFormService.setFieldValue(
//         "System.Title",
//         "Title set from your group extension!"
//     );
// }

export function registerEvents(SDK: any) {
    SDK.register(SDK.getContributionId(), () => {
        return {
            // Called when the active work item is modified
            onFieldChanged: (args: IWorkItemFieldChangedArgs) => {
            },

            // Called when a new work item is being loaded in the UI
            onLoaded: (args: IWorkItemLoadedArgs) => {
                // Get Settings Document
                // Get WorkItem Data
            },

            // Called when the active work item is being unloaded in the UI
            onUnloaded: (args: IWorkItemChangedArgs) => {
            },

            // Called after the work item has been saved
            onSaved: (args: IWorkItemChangedArgs) => {
            },

            // Called when the work item is reset to its unmodified state (undo)
            onReset: (args: IWorkItemChangedArgs) => {
            },

            // Called when the work item has been refreshed from the server
            onRefreshed: (args: IWorkItemChangedArgs) => {
            }
        }
    })
}