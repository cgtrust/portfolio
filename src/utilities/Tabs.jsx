import { Tab,Tabs, TabList, TabPanel } from 'react-tabs'
import { RequirementComponent } from './Utilities'

const TabsComponent = ({ requirements, reflection }) => {
    return (
        <Tabs>
            <TabList>
                <Tab>Requirements</Tab>
                <Tab>Reflection</Tab>
            </TabList>

            <TabPanel>
                <RequirementComponent htmlContent={requirements} />
            </TabPanel>
            <TabPanel>
                <p>{reflection}</p>
            </TabPanel>
        </Tabs>
    )
}

export default TabsComponent