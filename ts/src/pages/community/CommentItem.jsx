import Button from "@components/Button"
import Submit from "@components/Submit"
import useLoginStore from "@hooks/store"
import { useState } from "react"
import { Link } from "react-router-dom"

function CommentItem ({replyData, bbsId}) {

  const { acsTkn, siteNumId } = useLoginStore(state => state)
  const [ textTf, setTextTf ] = useState(false)
  const [ editComt, setEditComt ] = useState()
  const handleTextOpen = () => {
    setTextTf(!textTf)
  }

  
  async function handleCmtEdit (comtNum) {
    const url = 'https://api.fesp.shop/posts/'
    try {
      await fetch(url + bbsId + `/replies/` + comtNum, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${acsTkn}`
        },
        body: JSON.stringify({ 
          'content':editComt,
        }),
      })
      alert('댓글이 수정되었습니다')
      location.reload();
      // handleTextOpen();
    } catch(err) {
      console.error(err)
    }
  }

  async function handleCmtDel (comtNum) {
    const url = 'https://api.fesp.shop/posts/'
    try {
      await fetch(url + bbsId + `/replies/` + comtNum, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${acsTkn}`
        },
      })
      alert ('댓글이 삭제되었습니다')
      location.reload();
    } catch (err) {
      console.error(err)
    }
  }


  return(
    <>      
      <li key={replyData._id} className="shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <img
            className="w-8 mr-2 rounded-full"
            src="http://api.fesp.shop/files/00-sample/user-muzi.webp"
            alt="어피치 프로필 이미지"
          />
          <Link to="" className="text-orange-400">{replyData.user.name}</Link>
          <time className="ml-auto text-gray-500" dateTime="2024.07.02 14:11:22">{replyData.createdAt}</time>
        </div>

        <div className="flex justify-between">
        { textTf && (siteNumId == `${replyData.user._id}`)
        ?
        <form className="flex-1">
          <textarea className="whitespace-pre-wrap text-sm w-full"
            value={editComt}
            onChange={e => setEditComt(e.target.value)}
          >{replyData.content}</textarea>
        </form>
        :<pre className="whitespace-pre-wrap text-sm">{replyData.content}</pre>
          }

        {(acsTkn !== null) && (siteNumId == `${replyData.user._id}`) ? (
            <div className="flex justify-between">
              {textTf 
              ? 
              <div>
              <Submit bgColor="gray" onClick={() => handleCmtEdit(replyData._id)}>저장하기</Submit> 
              <Button onClick={handleTextOpen}>취소</Button>
              </div>
              : <Button bgColor="gray" onClick={handleTextOpen}>수정</Button>}
              <Button bgColor="red" onClick={() => handleCmtDel(replyData._id)}>삭제</Button>     
            </div>
        ) : (
            <></>
        )}
        </div>
        
      </li>
    </>
  )



}

export default CommentItem