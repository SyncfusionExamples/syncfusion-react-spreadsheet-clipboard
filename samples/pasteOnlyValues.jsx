import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
    SpreadsheetComponent,
    SheetsDirective,
    SheetDirective,
    RangesDirective,
} from '@syncfusion/ej2-react-spreadsheet';
import {
    RangeDirective,
    ColumnsDirective,
    ColumnDirective,
} from '@syncfusion/ej2-react-spreadsheet';
import { defaultData } from './dataSource';

function App() {
    const spreadsheetRef = React.useRef(null);
    const items = [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }];
    //To check the content copied from external clipboard
    let isPasteFromExternalClipboard;
    const onActionBegin = (args) => {
        // To check the requested type is paste and content copied is from external clipboard. 
        if (
            args.args.eventArgs &&
            args.args.eventArgs.requestType === 'paste' &&
            (args.args.eventArgs.copiedInfo === null || args.args.eventArgs.copiedInfo === undefined)
        ) {
            //Enabling Boolean 
            isPasteFromExternalClipboard = true;
        }
    };
    //Event Triggers just before a cell’s value or property is updated 
    const onBeforeCellUpdate = (args) => {
        if (isPasteFromExternalClipboard) {
            if (args.cell) {
                //To remove styles and formatting and paste only values to cells 
                const value = args.cell.value;
                args.cell = { value: value };
            }
        }
    };
    //Event Triggers after an action is completed 
    const onActionComplete = (args) => {
        if (args.action === 'clipboard' && args.eventArgs.requestType === 'paste') {
            //Reset Boolean 
            isPasteFromExternalClipboard = false;
        }
    };
    const itemSelect = (args) => {
        let spreadsheet = spreadsheetRef.current;
        if (spreadsheet) {
            if (args.item.text === 'Cut') spreadsheet.cut();
            if (args.item.text === 'Copy') spreadsheet.copy();
            if (args.item.text === 'Paste') spreadsheet.paste();
        }
    };
    React.useEffect(() => {
        let spreadsheet = spreadsheetRef.current;
        if (spreadsheet) {
            spreadsheet.cellFormat(
                { fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' },
                'A1:H1'
            );
        }
    }, []);

    return (
        <div>
            <SpreadsheetComponent
                ref={spreadsheetRef}
                enableClipboard={true}
                actionBegin={onActionBegin}
                beforeCellUpdate={onBeforeCellUpdate}
                actionComplete={onActionComplete}
            >
                <SheetsDirective>
                    <SheetDirective>
                        <RangesDirective>
                            <RangeDirective dataSource={defaultData}></RangeDirective>
                        </RangesDirective>
                        <ColumnsDirective>
                            <ColumnDirective width={130}></ColumnDirective>
                            <ColumnDirective width={92}></ColumnDirective>
                            <ColumnDirective width={96}></ColumnDirective>
                        </ColumnsDirective>
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent>
        </div>
    );
}
export default App;

const root = createRoot(document.getElementById('root'));
root.render(<App />);
