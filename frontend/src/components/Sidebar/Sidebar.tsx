import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, ChoiceGroup, IChoiceGroupOption, mergeStyles, DefaultButton } from '@fluentui/react';
import styles from './Sidebar.module.css';
import { updateDataSourceInBackend } from '../../api';
import { AppStateContext } from '../../state/AppProvider';

interface DataSourceSidebarProps {
  selectedDataSource: string;
  onDataSourceChange: (dataSource: string) => void;
}

const dataSources: IChoiceGroupOption[] = [
  { key: 'home', text: '🏠 Home' },
  { key: 'img-oeb-test', text: '💬 OEB' },
  { key: 'img-eng-test', text: '💬 Engineering Docs' },
  { key: 'th-web', text: '💬 TH Website' },
];

export const DataSourceSidebar: React.FC<DataSourceSidebarProps> = ({
  selectedDataSource,
  onDataSourceChange,
}) => {
  const navigate = useNavigate();
  const appStateContext = useContext(AppStateContext)
  const { dispatch } = useContext(AppStateContext) ?? { dispatch: () => {} };

  const handleDataSourceChange = async (key: string) => {
    try {
      dispatch({ 
        type: 'SET_DATA_SOURCE', 
        payload: key 
      });
      if (key === 'home') {
        navigate('/');
      } else {
        navigate('/chat');
        await updateDataSourceInBackend(key);
        console.log(`Data source updated successfully to ${key}`);
        appStateContext?.dispatch({ type: 'UPDATE_CURRENT_CHAT', payload: null });
        
      }
      // Log the current state after all updates
      console.log('Final data source state:', {
        selectedDataSource: key,
        backendUpdated: key !== 'home'
      });
      
      onDataSourceChange(key);
    } catch (error) {
      console.error('Failed to update data source:', error);
    }
  };

  return (
    <Stack className={styles.sidebar}>
      {/* <h2>Select Data Source</h2> */}
      <div className={styles.buttonContainer}>
        {dataSources.map((source) => (
          <DefaultButton
            key={source.key}
            text={source.text}
            className={selectedDataSource === source.key ? styles.buttonSelected : styles.button}
            onClick={() => handleDataSourceChange(source.key)}
          />
        ))}
      </div>
    </Stack>
  );
};
