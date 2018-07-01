import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';

const SettingsDashboard = () => {
    return (
      <Grid>
        <Grid.Column width={12}>
          <h1>Settings</h1>
        </Grid.Column>
        <Grid.Column width={4}>
          <h1>Nav</h1>
        </Grid.Column>
      </Grid>
    );
}

export default SettingsDashboard;