import React, { useState } from 'react';

const Tab = ({onClick, active, children}) => (
  <span onClick={onClick} className={active ? 'active' : ''}>{children}</span>
)

export default Tab;