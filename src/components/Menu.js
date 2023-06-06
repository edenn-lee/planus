import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Group from './Group';

function Menu({ isOpen, onClose, onSelectGroup, Groups, Personal}) {
  const token = localStorage.getItem('token');
  const API_GROUP = 'http://13.209.48.48:8080/api/groups';
  const API_SCHEDULE = 'http://13.209.48.48:8080/api/schedules';

  const [showGroupList, setShowGroupList] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showEditGroup, setShowEditGroup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [memberIds, setMemberIds] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [showPersonalSchedule, setShowPersonalSchedule] = useState(true);


  
  // useEffect(() => {
  //   if (selectedGroup) {
  //     // 선택한 그룹의 일정을 가져오는 함수
  //     fetchSchedules(selectedGroup.id);
  //   } else {
  //     // 개인 일정을 가져오는 함수
  //     fetchPersonalSchedules();
  //   }
  // }, [selectedGroup]);

  const handleGroupClick = () => {
    setShowGroupList(!showGroupList);
  };

  const handleAddGroupClick = () => {
    setShowAddGroup(!showAddGroup);
    setShowAddButton(!showAddButton);
  };

  const handleAddButtonClick = () => {
    setShowAddButton(!showAddButton);
  };

  const handleEditGroupClick = () => {
    setShowEditGroup(!showEditGroup);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleMemberIdsChange = (event) => {
    setMemberIds(event.target.value);
  };

  const handleAddGroupSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      name: groupName,
    };

    axios.post(API_GROUP, data, {
        headers: {
          'Authorization': 'Bearer ' + token
        },
      })
      .then((response) => {
        console.log(response);
        setGroupName('');
        setShowAddGroup(false);
        setMemberIds('');
        // LoadGroups();
        setGroupMember(response.data.id);
        // console.log(response.id)
        
      })
      .catch((error) => {
        console.error(error);
      });
      console.log("생성")
  };

  const setGroupMember=(groupId)=>{
    axios.post(`http://13.209.48.48:8080/api/groups/${groupId}/members`, {
      id: localStorage.getItem('userId')
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
    .then((response) => {
      LoadGroups();
    })
    .catch((error) => {
      console.error(error);
    });
    console.log("생성")
  }


  const handleDeleteGroupSubmit = (groupId) => {
  
    axios.delete(`http://13.209.48.48:8080/api/groups/${groupId}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        },
      })
      .then((response) => {
        LoadGroups();
        setShowDeleteModal(false);
        console.log("Delete 실행")
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
    const LoadGroups = () => {
    axios
      .get("http://13.209.48.48:8080/api/groups/mygroups", {
        headers: {
          'Authorization': 'Bearer ' + token
        },
      })
      .then((response) => {
        console.log(localStorage.getItem('userId'))
        setGroups(response.data);
        Groups(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


useEffect(()=>{
  LoadGroups();
},[])

  const handleGroupCheckboxChange = (event, group) => {
    if (event.target.checked) {
      setSelectedGroup(group);
      console.log(group);
      onSelectGroup(group);
    } else {
      setSelectedGroup(null);
      onSelectGroup(null);
      console.log(group);
    }
  };

  const handlePersonalScheduleCheckboxChange = (event) => {
    console.log(event.target.checked);
    setShowPersonalSchedule(event.target.checked);
    Personal(showPersonalSchedule);
  };


  useEffect(()=>{
    console.log(showPersonalSchedule);
  },[showPersonalSchedule])


  const checkDeleteGroupSubmit = () => {
    setShowDeleteModal(true);
  };

{/* <button type="submit" onClick={handleDeleteGroupSubmit}>
                        삭제
                      </button> */}

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
          <li onClick={()=>{handleGroupClick();LoadGroups();}} style={{ padding: '0px', margin: '0px' }}>
            Group
          </li>
          {showGroupList && (
            <div style={{ paddingLeft: '0px' }} className="sub-menu-container">
              <button className="edit-button" onClick={handleEditGroupClick}>
                편집
              </button>
              <ul style={{ paddingLeft: '1rem' }}>
                <li style={{ fontSize: '18px' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={showPersonalSchedule}
                      onChange={handlePersonalScheduleCheckboxChange}
                    />
                    나의 일정
                  </label>
                </li>
                {groups.map((group) => (
                  <li style={{ fontSize: '14px' }} key={group.name}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedGroup?.name === group.name}
                        onChange={(event) => handleGroupCheckboxChange(event, group)}
                      />
                      {group.name}
                      
                    </label>
                    {showEditGroup && (
                      <>
                    <button className="delete-button" onClick={checkDeleteGroupSubmit}>
                      삭제
                    </button>
                      {showDeleteModal && (
                        <div className="modal">
                          <p>정말로 삭제하시겠습니까?</p>
                          <button onClick={()=>handleDeleteGroupSubmit(group.id)}>삭제</button>
                          <button onClick={()=>setShowDeleteModal(false)}>취소</button>
                        </div>
                      )}
                    </>
                    )}
                  </li>
                  
                ))}
                {showEditGroup && (
                  <div style={{ display: 'flex', flexDirection: "column",alignItems: 'center'}}>
                      {showAddButton && (
                        <button className="add-button" onClick={handleAddGroupClick}>
                        그룹 추가
                      </button>
                      )}
                      
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
                          
                          <button type="submit" onClick={()=>setShowAddButton(true)}>생성</button>
                          <button type="button" onClick={handleAddGroupClick}>
                            취소
                          </button>
                          
                        </form>
                      </li>
                    )}
                    
                  </div>
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

      {schedules.length > 0 && (
        <div>
          <h3>Selected Schedules</h3>
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule.id}>{schedule.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Menu;
