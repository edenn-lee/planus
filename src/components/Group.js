import React, { useState } from 'react';
import axios from 'axios';

function Group() {
  const token = localStorage.getItem('token');
  const API_GROUP = 'http://13.209.48.48:8080/api/groups';

  const [showGroupList, setShowGroupList] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [memberIds, setMemberIds] = useState([]);

  const handleGroupClick = () => {
    setShowGroupList(!showGroupList);
  };

  const handleAddGroupClick = () => {
    setShowAddGroup(!showAddGroup);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleMemberIds = (event) => {
    const values = event.target.value.split(',').map((v) => v.trim());
    setMemberIds(values);
  };

  const handleAddGroupSubmit = (event) => {
    event.preventDefault();

    axios.post(API_GROUP,{ groupName, memberIds },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        const newGroup = {
          name: response.data.groupName,
          memberIds: response.data.memberIds,
        };
        setGroups([...groups, newGroup]);
        setGroupName('');
        setShowAddGroup(false);
        setMemberIds([]);
        console.log(response.data)
        console.log(groups);
        console.log(memberIds);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <li onClick={handleGroupClick} style={{ padding: '0px', margin: '0px' }}>
        Group
      </li>
      {showGroupList && (
        <div style={{ paddingLeft: '0px' }} className="sub-menu-container">
          <button className="add-button" onClick={handleAddGroupClick}>
            +
          </button>
          <ul style={{ paddingLeft: '1rem' }}>
            {groups.map((group) => (
              <li style={{ fontSize: '18px' }} key={group}>
                <input type="checkbox" />
                {group}
              </li>
            ))}
            {showAddGroup && (
              <li style={{ marginTop: '-1rem' }}>
                <form onSubmit={handleAddGroupSubmit}>
                  <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={handleGroupNameChange}
                    style={{ width: '150px' }}
                  />
                  <input
                    type="text"
                    placeholder="Enter ID for share"
                    value={memberIds}
                    onChange={handleMemberIds}
                    style={{ width: '150px' }}
                  />
                  <button type="submit">Add</button>
                  <button type="button" onClick={handleAddGroupClick}>
                    Cancel
                  </button>
                </form>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Group;
