import React, { Component } from 'react';
import Query from './Queries.jsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Base extends Component {
  render() {
        return <div>
        <Tabs>
          <TabList>
            <Tab>🙋🏻   Members</Tab>
            <Tab>📪   Messages</Tab>
            <Tab>💼   Resources</Tab>
          </TabList>

          <TabPanel>
            <h2>Some members for ya</h2>
            <Query item="members" />
          </TabPanel>
          <TabPanel>
            <h2>Some messages for ya</h2>
            <Query item="messages"/>
          </TabPanel>
          <TabPanel>
            <h2>Some resources for ya</h2>
            <Query item="resources"/>
          </TabPanel>
        </Tabs>
        </div>
  }
}
