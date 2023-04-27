import React from 'react';
import * as XLSX from 'xlsx';
import '@grapecity/spread-sheets-react';
import {
  SpreadSheets,
  Worksheet,
  Column
} from '@grapecity/spread-sheets-react';
// import readExcelFile from 'read-excel-file/node';

// Hooks Imports
import { useAppSelector } from '@SRC/hooks/store.hook';

// Store Imports
import { convertedFilesSelector } from '@SRC/store/converter/selector';

// CSS Import
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css';
import converterStyle from '@SRC/styles/converter/index.module.scss';

// MUI Export
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// Components Export

function ChekerArea() {
  const tableData = XLSX.read(useAppSelector(convertedFilesSelector)); //TODO: Get from store or read file
  console.log(tableData);
  const config = {
    sheetName: tableData.SheetNames[0],
    hostClass: 'spreadsheet',
    autoGenerateColumns: true,
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
            dataSource={tableData.Sheets[config.sheetName]}
            autoGenerateColumns={config.autoGenerateColumns}></Worksheet>
        </SpreadSheets>
      </CardContent>
    </Card>
  );
}

export default ChekerArea;
