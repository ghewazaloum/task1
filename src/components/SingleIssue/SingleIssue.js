import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SingleIssue = () => {
    const baseURL ='https://api.github.com';
    const { issueNumber } = useParams();
    const [issue, setIssue] = useState(null);
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
        if(issueNumber){
            axios({
                method: 'get',
                url: `${baseURL}/repos/facebook/react/issues/${issueNumber}`,
                  })
                .then(function (response) {
                  setIssue(response.data);
                  axios({
                    method: 'get',
                    url: `${response.data.comments_url}`,
                      })
                    .then(function (response) {
                      setComments(response.data)
                    });
                });
        }
    }, [issueNumber]);
    
    if (!issue) {
      return <div>Loading...</div>;
    }
  
  return (
    <div>
        <h2>{issue.title}</h2>
        <p>{issue.body}</p>
        <h3>comments</h3>
        <ul>
            {comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
            ))}
        </ul>
    </div>
  )
}

export default SingleIssue
