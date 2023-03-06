import React from 'react';
import '@grapecity/spread-sheets-react';
import {
  SpreadSheets,
  Worksheet,
  Column
} from '@grapecity/spread-sheets-react';

// CSS Import
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css';
import converterStyle from '@/styles/converter/index.module.scss';

// MUI Export
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// Components Export

export default function ChekerArea() {
  const tableData = [{ id: 1 }]; //TODO: Get from store or read file
  const config = {
    sheetName: 'Sheet 1',
    hostClass: 'spreadsheet',
    autoGenerateColumns: false,
    width: 200,
    visible: true,
    resizable: true,
    priceFormatter: '$ #.00',
    chartKey: 1
  };

  return (
    <Card className={converterStyle.chekerArea}>
      <CardContent className={converterStyle.chekerArea__content}>
        <SpreadSheets hostClass={config.hostClass}>
          <Worksheet
            name={config.sheetName}
            dataSource={tableData}
            autoGenerateColumns={config.autoGenerateColumns}>
            <Column width={50} dataField="id" headerText="ID"></Column>
            <Column width={200} dataField="client" headerText="Client"></Column>
            <Column
              width={320}
              dataField="description"
              headerText="Description"></Column>
            <Column
              width={100}
              dataField="value"
              headerText="Value"
              formatter={config.priceFormatter}></Column>
            <Column
              width={100}
              dataField="itemCount"
              headerText="Quantity"></Column>
            <Column
              width={100}
              dataField="soldBy"
              headerText="Sold By"></Column>
            <Column
              width={100}
              dataField="country"
              headerText="Country"></Column>
          </Worksheet>
        </SpreadSheets>
      </CardContent>
    </Card>
  );
}
