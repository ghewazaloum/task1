import axios from 'axios';
import React, { useEffect, useState } from 'react'

const IssueList = () => {
    const baseURL ='https://api.github.com';
    const [issues, setIssues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('open');
  
    useEffect(() => {
         if(statusFilter){
            axios({
                method: 'get',
                url: `${baseURL}/repos/facebook/react/issues?state=${statusFilter}`,
                  })
                .then(function (response) {
                  setIssues(response.data)
                });
         }
    }, [ statusFilter]);
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleStatusFilter = (e) => {
      setStatusFilter(e.target.value);
    };
    const search = () => {
      console.log(`${baseURL}/search/issues?q=${searchTerm}+in:title,body%20repo:facebook/react`);
        axios({
            method: 'get',
            url: `${baseURL}/search/issues?q=${searchTerm}+in:title,body%20repo:facebook/react`,
              })
            .then(function (response) {
              setIssues(response.data.items)
              console.log(response.data.items);
            });
      };
  
      if (!issues) {
        return <div>Loading...</div>;
      }

  return (
    <div>
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
        <button onClick={()=>{search()}}>search</button>
        <select value={statusFilter} onChange={handleStatusFilter}>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
        </select>
        <ul>
            {issues?.map((issue) => (
            <li key={issue.id}>
                <a href={`/issue/${issue.number}`}>{issue.title}</a>
            </li>
            ))}
        </ul>
      
    </div>
  )
}

export default IssueList
