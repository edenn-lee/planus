import { useEffect } from "react";
import './KakaoShare.css';
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;


export default () =>{
	// 배포한 자신의 사이트
    const realUrl = "http://223.222.183.111:3000/login"
    // 로컬 주소 (localhost 3000 같은거)
    const resultUrl = window.location.href;
    
    // 재랜더링시에 실행되게 해준다.
    useEffect(()=>{
    	// init 해주기 전에 clean up 을 해준다.
        Kakao.cleanup();
        // 자신의 js 키를 넣어준다.
        Kakao.init('39a64d718f961c83556cf74da18b6dd4');
        // 잘 적용되면 true 를 뱉는다.
        console.log(Kakao.isInitialized());
    },[]);

    const shareKakao = () =>{


Kakao.Share.createDefaultButton({
    container: '#kakaotalk-sharing-btn',
    objectType: 'calendar',
    idType: 'event',
    id: 'event1',
    content: {
      title: 'Planus',
      description: 'Planus에서 일정 공유에 초대합니다.',
      imageUrl:
        'https://drive.google.com/file/d/1g8KcxD50eYLGDEPKRbhUVb8xYXeLYrfv/view?usp=drive_link',
      link: {
        webUrl: 'http://223.222.183.111:3000/login',
        mobileWebUrl: 'http://223.222.183.111:3000/login',
      },
    },
    buttons: [
      {
        title: 'Planus에서 당신을 초대합니다.',
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
            className='grey-btn'
            onClick={() => {
                shareKakao()
            }}> 

        카카오톡 공유하기 </button>
    </>
)
}