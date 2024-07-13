import Button from "@components/Button";
import Submit from "@components/Submit";
import useLoginStore from "@hooks/store";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function New() {
  const { acsTkn } = useLoginStore((state) => state)
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [selType, setSelType] = useState('');

  // console.log("아이디 가져오고있나연",siteNumId)


  const navigate = useNavigate();
  const location = useLocation();
  const bbsType = location.state;

  
  useEffect(() => {
    setSelType(bbsType)
  },[])

  const handleSelType = (e) => {
    e.preventDefault();
    setSelType(e.target.value)
  }

  const handleBbsSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://api.fesp.shop/posts',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${acsTkn}`
        },
        body: JSON.stringify({ 
          'type': selType, 
          'title': title,
          'content':content,
        }),
      })
      const bbsData = await res.json();
      if (!res.ok) {
        alert('뭔가실패햇워요')
        throw new Error(bbsData.message || '뭔가 실패했습니다.');
      } else {
        alert('게시물 등록 성공')
        console.log(bbsData)
        navigate(`/${bbsType}`)

        
      }



    } catch (err) {
      console.error(err)
    }
  }



  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 등록</h2>
      </div>
      <section className="mb-8 p-4">
        {/* <form onSubmit={ (event) => { event.preventDefault(); history.back();} }> */}
        <form onSubmit={ handleBbsSubmit }>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요." 
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="my-4 flex">
            <p>게시판 선택 : </p>
            <select id="selectBbs" value={selType || ''} onChange={handleSelType}>
              <option value="">선택하셔용</option>
              <option value="community">정보공유</option>
              <option value="notice">자유게시판</option>
              <option value="qna">질문게시판</option>
            </select>
          </div>
          
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">내용</label>
            <textarea
              id="content"
              rows="15" 
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              value={content}
              onChange={e => setContent(e.target.value)}
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Submit>등록</Submit>
            <Button type="reset" bgColor="gray" onClick={ () => history.back() }>취소</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default New;