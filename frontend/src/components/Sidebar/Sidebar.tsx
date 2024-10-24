import React, { useState } from 'react';
import { Stack, ChoiceGroup, IChoiceGroupOption, mergeStyles } from '@fluentui/react';
import styles from './SideBar.css';
import { updateDataSourceInBackend } from '../../api';

const sidebarClass = mergeStyles({
  // Add your styles here
  // For example:
  padding: '20px',
  backgroundColor: '#f0f0f0',
});

interface DataSourceSidebarProps {
  selectedDataSource: string;
  onDataSourceChange: (dataSource: string) => void;
}

const dataSources: IChoiceGroupOption[] = [
  { key: 'img-oeb-test', text: 'OEB' },
  { key: 'img-eng-test', text: 'Engineering Docs' },
  { key: 'th-web', text: 'TH Website' },
];

export const DataSourceSidebar: React.FC<DataSourceSidebarProps> = ({
  selectedDataSource,
  onDataSourceChange,
}) => {
  const handleDataSourceChange = async (dataSource: string) => {
    onDataSourceChange(dataSource);
    try {
      await updateDataSourceInBackend(dataSource);
      console.log(`Data source updated successfully to ${dataSource}`);
    } catch (error) {
      // Handle the error as needed, e.g., show a notification to the user
      console.error('Failed to update data source:', error);
    }
  };

  return (
    <Stack className={sidebarClass}>
      <h2>Select Data Source</h2>
      <ChoiceGroup
        selectedKey={selectedDataSource}
        options={dataSources}
        onChange={(_, option) => option && handleDataSourceChange(option.key)}
      />
    </Stack>
  );
};
