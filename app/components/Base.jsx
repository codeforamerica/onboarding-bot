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
            <Query item="members" keys={['members_id', 'members_name', 'members_descript', 'last_message_id']} />
          </TabPanel>
          <TabPanel>
            <h2>Some messages for ya</h2>
            <Query item="messages" keys={['messages_id', 'messages_text', 'receivers_id', 'receivers_name', 'time_to_post', 'senders_id', 'senders_name']} />
          </TabPanel>
          <TabPanel>
            <h2>Some resources for ya</h2>
            <Query item="resources" keys={['resources_id', 'resources_title', 'resources_keywords', 'resources_link']} />
          </TabPanel>
        </Tabs>
        </div>
  }
}
