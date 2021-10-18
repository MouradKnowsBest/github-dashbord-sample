import React from "react";


  const results = (props) => {
    const {repos} = props;
    const allRepos = repos.length !== 0 ? (
      repos.map((item) =><li key={item.id}> {item.name}</li>)

    ):(
      <li> no repos found </li>
    )
      return (
        <ul>
          <li>{{allRepos}}</li>
        </ul>
      )
  }

  export default results;