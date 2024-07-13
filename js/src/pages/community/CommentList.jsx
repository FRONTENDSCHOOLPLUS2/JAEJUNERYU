import Button from "@components/Button"
import { Link } from "react-router-dom"
import CommentNew from "./CommentNew"
import useLoginStore from "@hooks/store"
import { useEffect, useRef, useState } from "react"
import Submit from "@components/Submit"

function CommentList ({ bbsId }) {


  const { acsTkn, siteNumId } = useLoginStore(state => state)
  const [ data, setData ] = useState();
  const [ textTf, setTextTf ] = useState(false)
  const [ editComt, setEditComt ] = useState()

  const myRef = useRef()
  console.log('확인:::',myRef)
  
  

  useEffect(() => {
    handleCommentData(bbsId)
  },[bbsId])

  function check(ttt) {
    console.log(ttt.target)
    console.log(ttt.target.dataSet.numNo)
  }


  async function handleCommentData (params) {
    const url = 'https://api.fesp.shop/posts/'
    try {
      const res = await fetch(url + params + `/replies`)
      const jsonData = await res.json();
      setData(jsonData)
    } catch (err) {
      console.error(err)
    }
  }

  console.log('수정된사항 변경되나?',editComt)
  const testtt = document.querySelectorAll("#editComment")
  console.log('나오나요',testtt)




  const handleTextOpen = () => {
    setTextTf(!textTf)
  }
  console.log('지금상태는?',textTf)

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
      handleTextOpen();

    } catch(err) {
      console.error(err)
    }
  }


  return(
    <ul className="mb-8">
      {(data?.item.length) 
      ? <h4 className="mt-8 mb-4 ml-2">댓글 {data.item.length}개</h4>
      : <></>
      }
      
 
      {/* 댓글 */}
      {data?.item.map (reply => (
        <>
          <li key={reply._id} className="shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <img
                className="w-8 mr-2 rounded-full"
                src="http://api.fesp.shop/files/00-sample/user-muzi.webp"
                alt="어피치 프로필 이미지"
              />
              <Link to="" className="text-orange-400">{reply.user.name}</Link>
              <time className="ml-auto text-gray-500" dateTime="2024.07.02 14:11:22">{reply.createdAt}</time>
            </div>

            { textTf && (siteNumId == `${reply.user._id}`)
            ?
            <form>
              <textarea className="whitespace-pre-wrap text-sm"
                value={editComt}
                onChange={e => setEditComt(e.target.value)}
              >{reply.content}</textarea>
            </form>
            :<pre className="whitespace-pre-wrap text-sm">{reply.content}</pre>
              }

            {(acsTkn !== null) && (siteNumId == `${reply.user._id}`) ? (
                <>
                  {textTf 
                  ? 
                  <>
                  <Submit bgColor="gray" onClick={() => handleCmtEdit(reply._id)}>저장하기</Submit> 
                  <Button onClick={handleTextOpen}>취소</Button>
                  </>
                  : <Button bgColor="gray" onClick={handleTextOpen}>수정</Button>}
                  <Button bgColor="red">삭제</Button>
                  <Button onClick={(e) => check(e)} ref={myRef}>값확인1 아이디값 {reply._id}</Button>
                  
                </>
            ) : (
                <></>
            )}
            
          </li>
        </>
      ))}
      

      {/* 댓글 */}
      {/* 댓글 입력 */}
      {(acsTkn !== null) 
      ? 
      <CommentNew bbsId={bbsId}/>
      :<></>}
  </ul>
  )
}

export default CommentList