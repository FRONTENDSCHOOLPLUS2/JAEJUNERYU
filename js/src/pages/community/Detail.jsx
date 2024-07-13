import Button from "@components/Button";
import { useNavigate } from "react-router-dom";
import CommentList from "./CommentList";
import { useEffect, useState } from "react";
import useLoginStore from "@hooks/store";





function Detail() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { siteNumId, acsTkn } = useLoginStore((state) => state)
  // console.log('데이타 확인', data && data)


  // 기본 url 파싱
  const url = "https://api.fesp.shop/posts/"
  const thisUrl = window.location.href
  function getPostId(url) {
    const match = url.match(/\/info\/(\d+)$/);
    return match ? match[1] : null;
  }
  const bbsId = getPostId(thisUrl);  

  // 상세정보 호출 api
  async function detailApi(params) {
    
    try {
      const res = await fetch(url + params);
      const jsonData = await res.json();
      setData(jsonData)
      
    } catch(err) {
      console.error(err)
    }
  }
  useEffect(() => {
    detailApi(bbsId);
    }, [bbsId])
    
  const bbsType = data?.item.type

  const handleNaviGo = () => {
    navigate(`/info/${bbsId}/edit`, {state: data?.item })
  }
  const handleDel = () => {
    deleteApi(bbsId)
    navigate(`/${bbsType}`)
  }

  // 게시글 삭제 api
  async function deleteApi(params) {
    try {
      if (confirm('게시글을 삭제할까요?')) {
        await fetch(url + params, {
          method: 'DELETE',
          headers : {
            'Authorization': `Bearer ${acsTkn}`
          }
        })
      }
    } catch (err) {
      console.error(err)
      alert('잘못된 삭제요청입니다')
    }
  }

 


  return (
    <main className="container mx-auto mt-4 px-4">


    { data && (
      <>
        <section className="mb-8 p-4">
        <div className="font-semibold text-xl">{data?.item.title}</div>
        <div className="text-right text-gray-400">{data?.item.user.name}</div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">{data?.item.content}</pre>
          </div>
          <hr/>
        </div>
        <div className="flex justify-end my-4">
          <Button onClick={ () => navigate(`/${bbsType}`) }>목록</Button>
          { (data.item.user._id === siteNumId ) 
          ? 
          <>
            <Button bgColor="gray" onClick={ handleNaviGo }>수정</Button>
            <Button bgColor="red" onClick={ handleDel }>삭제</Button>
          </>
          : <></>
          }
          
        </div>
        </section>

        {/* 댓글 목록 */}
        <CommentList bbsId={bbsId}/>
      </>
    ) }
    </main>
  );
}

export default Detail;