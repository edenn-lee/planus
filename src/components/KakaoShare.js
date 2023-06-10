import { useEffect, useState } from "react";
import './KakaoShare.css';
// kakao 기능 동작을 위해 넣어준다.
import Menu from './Menu.js';

const KaKaoShare = ({isButtonDisabled, onShare}) =>  {
const { Kakao } = window;



	// 배포한 자신의 사이트
    const realUrl = "http://223.222.183.111:3000/"
    // 로컬 주소 (localhost 3000 같은거)
    const resultUrl = window.location.href;
    
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
      if (onShare && typeof onShare === "function") {
        onShare();
      }

Kakao.Share.createDefaultButton({
  
    container: '#kakaotalk-sharing-btn',
    objectType: 'feed',
    content: {
      title: 'Planus',
      description: `초대코드 : ${Menu.sharedCode}`,
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
      
  return(
      <>
          <button 
              id="kakaotalk-sharing-btn"
              className='share-button'
              onClick={shareKakao}
              disabled={isButtonDisabled}>
              
          공유 </button>
      </>
  )
}

export default KaKaoShare;