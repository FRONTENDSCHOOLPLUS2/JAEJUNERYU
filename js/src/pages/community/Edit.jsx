import Button from "@components/Button";
import Submit from "@components/Submit";
import useLoginStore from "@hooks/store";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Edit() {
  const { acsTkn } = useLoginStore((state) => state)
  const location = useLocation();
  const navigate = useNavigate()

  // 넘어온 정보 체크
  let tit = location.state.title;
  let cont = location.state.content;

  const [editTit, setEditTit] = useState(tit);
  const [editCont, setEditCont] = useState(cont);

  async function editApi(e) {
    e.preventDefault();
    const url = 'https://api.fesp.shop/posts/'
    let bbsNum = location.state._id;

    try {
      const res = await fetch(url + bbsNum, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${acsTkn}`
        },
        body : JSON.stringify({
          'title': editTit,
          'content': editCont,
        })
      })
      const editData = await res.json();
      if (!res.ok) {
        alert('뭔가실패햇워요')
        throw new Error(editData.message || '뭔가 실패했습니다.');
      } else {
        alert('게시물 수정 성공')
        navigate(`/info/${bbsNum}`)
      }


    } catch (err) {
      console.error('수정단계 에러발생',err)
    }
  }
  


  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 수정</h2>
      </div>
      <section className="mb-8 p-4">
        {/* <form onSubmit={ (event) => { event.preventDefault(); history.back(); } }> */}
        <form onSubmit={ editApi }>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">제목</label>
            <input
              type="text"
              placeholder="제목을 입력하세요." 
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              value={editTit}
              onChange={e => setEditTit(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">내용</label>
            <textarea 
              rows="15" 
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              value={editCont}
              onChange={e => setEditCont(e.target.value)}
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Submit>수정</Submit>
            <Button bgColor="gray" onClick={() => history.back()}>취소</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Edit;