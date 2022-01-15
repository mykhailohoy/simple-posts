import React, { useState } from 'react';

import Tab from './Tab';

const Tabs = ({ tabNames, callbacks }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = index => {
    setActiveTab(index);
    callbacks[index]();
  }

  return (
    <div className="tabs">
      {tabNames.map((tabName, index) => (
        <Tab onClick={() => handleClick(index)} active={index === activeTab ? true : false} key={index}>{tabName}</Tab>
      ))}
    </div>
  )

}

export default Tabs;