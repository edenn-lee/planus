import { useEffect, useState } from "react";
import Modal from "react-modal";
import './KakaoShare.css';

const KaKaoShare = ({groups, setSharedCode }) => {
  const { Kakao } = window;
  const [showInviteGroupModal, setShowInviteGroupModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [targetGroup, setTargetGroup] = useState({});
  const [target, setTarget] = useState('');

  const handleShowInviteGroupModal = () => {
    setShowInviteGroupModal(!showInviteGroupModal);
    setShowModal(!showModal);
    if (!showInviteGroupModal) {
      setSharedCode('');
      setTargetGroup('');
      setErrorMessage('');
    }
  };

const handleTargetGroup = (e) => {
  const selectedGroup = groups.find(group => group.id == e);
  setTargetGroup(selectedGroup);
  console.log(selectedGroup);

}

  // const realUrl = "http://223.222.183.111:3000/"
  // // 로컬 주소 (localhost 3000 같은거)
  // const resultUrl = window.location.href;


  
  // 재랜더링시에 실행되게 해준다.
  useEffect(()=>{
    // init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    if(!Kakao.isInitialized()){
    Kakao.init('39a64d718f961c83556cf74da18b6dd4');
    };
    // 잘 적용되면 true 를 뱉는다.
    
    console.log(Kakao.isInitialized());
  },[]);


  
  
  const shareKakao = () =>{
    Kakao.Share.createDefaultButton({
      container: '#kakaotalk-sharing-btn',
      objectType: 'feed',
      content: {
        title: 'Planus',
        description: `그룹 '${targetGroup.name}'의 초대코드 : ${targetGroup.sharedCode}`,
        imageUrl:
          'https://postfiles.pstatic.net/MjAyMzA2MDlfMjgx/MDAxNjg2MzE5MzU3ODY5.corFgvtwwadfGjqOkgO79YFMTC4qgfeT2QOkNC5VcDYg.4bj1IWgyKH14pK8TYYkiIqdo8M4F-BCvasb8xZPbK5Ig.PNG.xortlsrkdfla/logo.png?type=w580',
        link: {
          webUrl: 'http://223.222.183.111:3000/login',
          mobileWebUrl: 'http://223.222.183.111:3000/login',
        },
      },
      buttons: [
        {
          title: '참여하기',
          link: {
            webUrl: 'http://223.222.183.111:3000/login',
            mobileWebUrl: 'http://223.222.183.111:3000/login',
          },
        },
      ]
    });
  }

  return (
    <>
      <button className='share-button' onClick={handleShowInviteGroupModal}>
        공유
      </button>
      {showInviteGroupModal && (
        <>
          <Modal
            className="select-group-modal"
            isOpen={showModal}
            onRequestClose={handleShowInviteGroupModal}
            contentLabel="Invite Group Modal"
            >
            <div className="select-group-modal-content">
              <h2>그룹 초대 코드 전송</h2>
              <div>
                <label htmlFor="targetGroup">그룹 선택: </label>
                <select
                  id="targetGroup"
                  value={targetGroup ? targetGroup.id : ""}
                  onChange={(e) => handleTargetGroup(e.target.value)}
                >
                  <option value="">그룹</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                id="kakaotalk-sharing-btn"
                onClick={shareKakao}
                >
                  초대 코드 전송
                  </button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
  };

  export default KaKaoShare;

