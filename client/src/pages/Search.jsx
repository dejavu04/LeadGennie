/* No, the page will not reload when navigate(/search?${searchQuery}) line number---(108) is called.

In React Router, when you use useNavigate() or history.push(), it does not cause a full page reload. Instead, it changes the URL and updates the route without reloading the entire page. This is one of the key features of client-side routing in React applications.

So, when navigate(/search?${searchQuery}) is invoked, it ***** updates the URL **** to include the new search query parameters, and if there are components listening to changes in the URL (such as through the useEffect hook with location.search as a dependency array , when it changes the useEffect gets called and new content loads up according to the search parameters), those components might respond to the change in URL parameters, potentially fetching new data or updating their state based on the new query parameters, BUT THE PAGE ITSELF WONT RELOAD. */


import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
 
  // state for the side bar (1)
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  console.log(sidebarData);
  // state for the post (2)
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const location = useLocation(); // useLocation is used to access information about the current URL

  const navigate = useNavigate();//useNavigate is used to programmatically navigate to different routes within your React application.
  //-----------------------
  // only will work when the 'location.search' changes i.e when the search query changes which is basically [The query string is the part of a URL that comes after the question mark (?) and contains key-value pairs separated by ampersands (&). It is commonly used to pass data from one page to another, especially when making GET requests.]
 //------------------------
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);// if there is change in the url gets it the entire url  , there can be only 3 query changes one is 'searchTerm' 'sort' 'category'
    const searchTermFromUrl = urlParams.get('searchTerm'); // initially it is null when the page loads 
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    // if any of the 3 are not null and there are change in query then we update the sidebardata state ------
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
     
      // updating the state 'sidebarData'
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    // To async call to get back the data from the data base according to the query ......
    // Fucntion call to fetch the new post baised on the query 
    const fetchPosts = async () => {    
      setLoading(true);
      const searchQuery = urlParams.toString();// ALL THE SEARCH QUERY GIVEN BY location.search 
      const res = await fetch(`/api/post/getposts?${searchQuery}`);// data according to the search query 
     // Request doesnt works ---
      if (!res.ok) {
        setLoading(false);
        return;
      }
      // Request does work ---
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);// storing the new data in the new state
        setLoading(false); //  storing the new data in setloading 
      
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts(); // calling the function

  }, [location.search]);// dependency array , use effect only works when loaction.search changes ,i.e the search query 


  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };
  // handleSubmit Function: This function is triggered when the form is submitted. It prevents the default form submission behavior, constructs a search query string based on the values in sidebarData, and then navigates to a new URL with the constructed query parameters. ----- IMP
  const handleSubmit = (e) => {
    e.preventDefault(); // e.preventDefault() prevents the default form submission behavior, which would cause the browser to reload the page.
    
    const urlParams = new URLSearchParams(location.search); 
    //URLSearchParams: This API allows manipulation of query parameters in the URL. new URLSearchParams(location.search) creates a new URLSearchParams object based on the current URL's search parameters.
   
    urlParams.set('searchTerm', sidebarData.searchTerm); // Set the 'searchTerm' query parameter to the value of sidebarData.searchTerm
    
    urlParams.set('sort', sidebarData.sort);// Set the 'sort' query parameter to the value of sidebarData.sort
    
    urlParams.set('category', sidebarData.category);// Set the 'category' query parameter to the value of sidebarData.category

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);//so when navigate(`/search?${searchQuery}`); happens it changes the url to the new url with new query parrameters 
  };
  
  // when there are more files
  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
              <option value='javascript'>JavaScript</option>
            </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Posts results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
         
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
