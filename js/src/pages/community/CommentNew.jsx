import Button from "@components/Button";
import Submit from "@components/Submit";
import useLoginStore from "@hooks/store";
import { useEffect, useState } from "react";


function CommentNew ({ bbsId }) {

  const { acsTkn } = useLoginStore(state => state)
  const [comment, setComment] = useState('');

  async function handleSubmitCmt (e) {
    e.preventDefault();
    const url = 'https://api.fesp.shop/posts/'
    try {
      const res = await fetch(url + bbsId + `/replies`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${acsTkn}`
        },
        body: JSON.stringify({ 
          'content':comment,
        }),
      })
      const jsonData = await res.json();
      setComment(jsonData)
      alert('덧글이 등록되었습니다')
      location.reload()
    } catch (err) {
      console.error(err)
      alert('xxxxxxxxx')
    }
    
  }


  return(
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={ handleSubmitCmt }>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            value={comment}
            onChange={e => setComment(e.target.value)}
            name="comment"></textarea>

          {/* 에러 메세지 출력 */}
          {/*
          <p className="ml-2 mt-1 text-sm text-red-500">
            에러 메세지
          </p>
          */}
          
        </div>
        <Submit size="sm">댓글 등록</Submit>
      </form>
    </div>
  )
}

export default CommentNew;