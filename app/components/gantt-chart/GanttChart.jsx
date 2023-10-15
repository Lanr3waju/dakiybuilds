'use client'
import '../../styles/ganttChart.css'
import {
  GanttComponent,
  EditDialogFieldsDirective,
  DayMarkers,
  EditDialogFieldDirective,
  Inject,
  Edit,
  Selection,
  Toolbar,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-gantt'
import { editingData } from './data'
import resourceData from '../project-schedule/resourceData.json'
import { registerLicense } from '@syncfusion/ej2-base'
import { useState, useEffect } from 'react'

const projectName = "dummyProject"

registerLicense(process.env.NEXT_PUBLIC_GANTT_LICENSE)

function GanttChart() {

  const [data, setData] = useState(editingData)

  useEffect(() => {
    let localData = JSON.parse(window.localStorage.getItem(`${projectName}-gantt`))
    if (localData) setData(localData)
  }, [])

  const actionComplete = (args) => {
    if (
      args.requestType === 'save' ||
      args.requestType === 'delete' ||
      args.requestType === 'add'
    ) {
      window.localStorage.setItem(`${projectName}-gantt`, JSON.stringify(data))
    }
  }

  const taskFields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    notes: 'info',
    resourceInfo: 'resources',
  }
  const resourceFields = {
    id: 'id',
    name: 'name',
  }
  const editSettings = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  }
  const splitterSettings = {
    columnIndex: 2,
  }
  const projectStartDate = new Date('11/23/2023')
  const projectEndDate = new Date('12/24/2024')
  const gridLines = 'Both'
  const toolbar = [
    'Add',
    'Edit',
    'Update',
    'Delete',
    'Cancel',
    'ExpandAll',
    'CollapseAll',
    'Indent',
    'Outdent',
  ]
  const timelineSettings = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
  }
  const labelSettings = {
    leftLabel: 'TaskName',
    rightLabel: 'resources',
  }

  return (
    <>
      <a href="/project-schedule" className="btn btn-secondary m-2 w-fit md:w-1/4">Back to schedules Page!</a>
      <main className="material3 p-4">
        <div className="control-pane">
          <div className="control-section">
            <GanttComponent
              id="Editing"
              actionComplete={actionComplete}
              enablePersistence={true}
              dataSource={data}
              dateFormat={'MMM dd, y'}
              treeColumnIndex={1}
              allowSelection={true}
              showColumnMenu={false}
              highlightWeekends={true}
              allowUnscheduledTasks={true}
              projectStartDate={projectStartDate}
              projectEndDate={projectEndDate}
              taskFields={taskFields}
              timelineSettings={timelineSettings}
              labelSettings={labelSettings}
              splitterSettings={splitterSettings}
              height="600px"
              editSettings={editSettings}
              gridLines={gridLines}
              toolbar={toolbar}
              resourceFields={resourceFields}
              resources={resourceData}
            >
              <ColumnsDirective>
                <ColumnDirective field="TaskID" width="80"></ColumnDirective>
                <ColumnDirective
                  field="TaskName"
                  headerText="Job Name"
                  width="250"
                  clipMode="EllipsisWithTooltip"
                ></ColumnDirective>
                <ColumnDirective field="StartDate"></ColumnDirective>
                <ColumnDirective field="Duration"></ColumnDirective>
                <ColumnDirective field="Progress"></ColumnDirective>
                <ColumnDirective field="Predecessor"></ColumnDirective>
              </ColumnsDirective>
              <EditDialogFieldsDirective>
                <EditDialogFieldDirective
                  type="General"
                  headerText="General"
                ></EditDialogFieldDirective>
                <EditDialogFieldDirective type="Dependency"></EditDialogFieldDirective>
                <EditDialogFieldDirective type="Resources"></EditDialogFieldDirective>
                <EditDialogFieldDirective type="Notes"></EditDialogFieldDirective>
              </EditDialogFieldsDirective>
              <Inject services={[Edit, Selection, Toolbar, DayMarkers]} />
            </GanttComponent>
          </div>
        </div>
      </main>
    </>
  )
}
export default GanttChart
