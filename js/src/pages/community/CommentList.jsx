import CommentNew from "./CommentNew"
import useLoginStore from "@hooks/store"
import { useEffect, useState } from "react"
import CommentItem from "./CommentItem"

function CommentList ({ bbsId }) {


  const { acsTkn } = useLoginStore(state => state)
  const [ data, setData ] = useState();

  useEffect(() => {
    handleCommentData(bbsId)
  },[bbsId])


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



  return(
    <ul className="mb-8">
      {(data?.item.length) 
      ? <h4 className="mt-8 mb-4 ml-2">댓글 {data.item.length}개</h4>
      : <></>
      }
      
      {/* 댓글 및 댓글수정 */}
      {data?.item.map (item => (
        <>
          <CommentItem replyData={item} bbsId={bbsId}/>
        </>
      ))}

      {/* 댓글 입력 */}
      {(acsTkn !== null) 
      ? 
        <CommentNew bbsId={bbsId}/>
      :<></>}
  </ul>
  )
}

export default CommentList