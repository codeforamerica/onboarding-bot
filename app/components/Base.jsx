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
            <Query item="members" keys={['member_id', 'member_name', 'member_descript', 'last_message_id']} />
          </TabPanel>
          <TabPanel>
            <h2>Some messages for ya</h2>
            <Query item="messages" keys={['msg_id', 'msg_text', 'receiver_id', 'receiver_name', 'time_to_post', 'sender_id', 'sender_name']} />
          </TabPanel>
          <TabPanel>
            <h2>Some resources for ya</h2>
            <Query item="resources" keys={['resource_id', 'resource_title', 'resource_keywords', 'resource_link']} />
          </TabPanel>
        </Tabs>
        </div>
  }
}
