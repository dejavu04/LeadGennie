import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
  // thora doubt still
  const location = useLocation();//This line is using the useLocation hook provided by React Router. This hook returns an object that represents the current URL location in the browser. It contains properties like pathname, search, hash, etc. useLocation() is commonly used in React components to access the current URL location information.
 
  const [tab, setTab] = useState('');
  //This line is using the useState hook provided by React. It declares a state variable named tab and a function named setTab to update its value. The initial value of tab is set to an empty string ''. This state will be used to keep track of the current tab selected by the user.
 



  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);// the dependency 
 
  //This ABOVE  block of code uses the useEffect hook provided by React. The useEffect hook is used for performing side effects in functional components. In this case, it's used to handle changes to the URL's query parameters, specifically the tab parameter.Inside the useEffect callback function, it first creates a new URLSearchParams object using the location.search property. This allows parsing the query string of the current URL.It then extracts the value of the tab parameter from the query string using urlParams.get('tab'). If the tab parameter exists in the URL, its value is extracted; otherwise, it will be null.If tabFromUrl is truthy (meaning it has a value), it sets the tab state variable to the value extracted from the URL using setTab(tabFromUrl). This effectively updates the state with the value obtained from the URL, ensuring that the component reflects the current tab based on the URL





  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
     
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
     
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
     
      {/* posts... */}
      {tab === 'posts' && <DashPosts />}
     
      {/* users */}
      {tab === 'users' && <DashUsers />}
     
      {/* comments  */}
      {tab === 'comments' && <DashComments />}
     
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  );
}
