// import React,{useState} from 'react';
// import apiKeys from './apiKeys';

// const CurrentLocation = () => {

// const [query, setQuery] = useState('');
// const search = evt =>{
//     if(evt.key === "Enter"){
//     fetch(`${apiKeys.base}weather?q=${query}&units=metric&APPID=${apiKeys.key}`)
//     .then(res => res.json())
//     .then(result =>{
//         console.log(result);
//     })
//     }
// }
//  return (
//   <div className="search-box">
//     <input type="text"
//     placeholder='Search...'
//     value={query}
//     onChange={e => setQuery(e.target.value)}
//     onKeyDown={search} />
//   </div>
//   )
// }

// export default CurrentLocation