import React from 'react';
import { useLocation } from 'react-router-dom';
import ListEmployeeComponent from './ListEmployeeComponent';

const ListEmployeeWrapper = (props) => {
    const location = useLocation();
    return <ListEmployeeComponent {...props} location={location} />;
};

export default ListEmployeeWrapper;
