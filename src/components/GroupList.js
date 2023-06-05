import React, { useState } from 'react';
import axios from 'axios';

function GroupComponent() {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleCreateGroup = (event) => {
    event.preventDefault();
    axios
      .post('http://13.209.48.48:8080/api/groups', { name: groupName })
      .then((response) => {
        setGroups([...groups, response.data]);
        setGroupName('');
        setShowCreateGroupForm(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleDeleteGroup = (groupId) => {
    axios
      .delete(`http://13.209.48.48:8080/api/groups/${groupId}`)
      .then(() => {
        setGroups(groups.filter((group) => group.id !== groupId));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleCreateGroupClick = () => {
    setShowCreateGroupForm(true);
  };

  const handleCancelCreateGroup = () => {
    setShowCreateGroupForm(false);
  };

  return (
    <div>
      {/* <h1>Groups</h1> */}
      {error && <div>{error}</div>}
      {showCreateGroupForm ? (
        <form onSubmit={handleCreateGroup}>
          <label style={{fontSize:'12pt'}}>
            Group name:
            <input type="text" value={groupName} onChange={handleGroupNameChange} />
          </label>
          <button type="submit">Create group</button>
          <button type="button" onClick={handleCancelCreateGroup}>
            Cancel
          </button>
        </form>
      ) : (
        <button onClick={handleCreateGroupClick}>Create Group</button>
      )}
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            {group.name}
            {group.name}
            <button onClick={() => handleDeleteGroup(group.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupComponent;
