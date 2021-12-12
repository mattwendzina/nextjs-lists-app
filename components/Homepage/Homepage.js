import { useEffect, useContext } from 'react';
import ListsContext from '../../store/lists-context';

import LargeSelector from '../ui/LargeSelector/LargeSelector';

const Homepage = () => (
    <div className="border border-gray-200 shadow-md p-1 flex flex-col md:flex-row md:align-center md:justify-center h-full">
        <LargeSelector link="/lists" title="Select a List" />
        <LargeSelector link="/createList" title="Create a List" />
    </div>
);

export default Homepage;
