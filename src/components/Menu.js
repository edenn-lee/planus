import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Group from './Group';


function Menu({ isOpen, onClose }) {
  
  const token = localStorage.getItem('token');
  const API_GROUP='http://15.165.204.96:8080/api/groups'

  const [showGroupList, setShowGroupList] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [memberIds,setMemberIds] = useState([])




  const handleGroupClick = () => {
    setShowGroupList(!showGroupList);
  };

  const handleAddGroupClick = () => {
    setShowAddGroup(!showAddGroup);
    console.log(groups);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
    console.log(groupName);
  };

  const handleMemberIdsChange = (event) => {
    setMemberIds(event.target.value);
  };
  
  const handleAddGroupSubmit = (event) => {
    event.preventDefault();
    console.log(groupName);
    console.log(memberIds);
  
    const ids = memberIds.split(",").map(id => Number(id));
    // const members = ids.map(id => ({ id: id }));
    
    const data = {
      name: groupName,
      memberIds: ids
    };
    console.log(data);
    console.log(ids);
   
    axios.post(API_GROUP, data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      const newGroup = {
        name: response.data.name,
        members: response.data.members
      };
      setGroups([...groups, newGroup]);
      setGroupName('');
      setShowAddGroup(false);
      setMemberIds('');
    })
    .catch(error => {
      console.error(error);
    });
  };
  


  return (
    <div className={`menu-container ${isOpen ? 'open' : ''}`}>
      <div className="menu-title">
        <h2>Menu</h2>
      </div>
      <ul className="menu-content">
        <li>
          <NavLink exact to="/" activeClassName="active" onClick={onClose}>
            Home
          </NavLink>
        </li>
        <li>
          <li
          onClick={handleGroupClick}
          style={{padding:'0px', margin:'0px'}}
          >
            Group
            </li>
          {showGroupList && (
            <div style={{paddingLeft:'0px'}} className="sub-menu-container">
              <button className="add-button" onClick={handleAddGroupClick}>
                +
              </button>
              <ul style={{paddingLeft:'1rem'}}>
                {groups.map((group) => (
                  <li style={{ fontSize: '18px' }} key={group.name}>
                     <input type="checkbox" />
                    {group.name}
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
                        onChange={handleMemberIdsChange}
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
        </li>
        <li>
          <NavLink exact to="/schedule" activeClassName="active" onClick={onClose}>
            Schedule
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
