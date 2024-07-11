import { Tab,Tabs, TabList, TabPanel } from 'react-tabs'
import { RequirementComponent } from './Utilities'

const TabsComponent = ({ requirements, reflection }) => {
    return (
        <Tabs>
            <TabList>
                <Tab tabIndex="0">Requirements</Tab>
                <Tab tabIndex="0">Reflection</Tab>
            </TabList>

            <TabPanel>
                <RequirementComponent htmlContent={requirements} />
            </TabPanel>
            <TabPanel>
                {reflection}
            </TabPanel>
        </Tabs>
    )
}

export default TabsComponent