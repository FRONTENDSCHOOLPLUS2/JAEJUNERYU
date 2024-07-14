import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListItem ({ menuNm }) {

  const [data, setData] = useState({item : []});
  const navigate = useNavigate();
  

  useEffect(() => {
    fesApi(menuNm);
    }, [menuNm]);


  async function fesApi(params) {
    const url = 'https://api.fesp.shop/posts?type=';
    try {
      const res = await fetch(url + params);
      const jsonData = await res.json();
      setData(jsonData)
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }

  const handleNavigate = (item) => {
    navigate(`/info/${item._id}`, { state: { itemData: item } });
  };
  
  return(
    <>
      { data.item.map(item => (
        <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
          <td className="p-2 text-center">{ item._id }</td>
          <td className="p-2 truncate indent-4 cursor-pointer" onClick={ () => handleNavigate(item) }>{ item.title }</td>
          <td className="p-2 text-center truncate">{ item.user.name }</td>
          <td className="p-2 text-center hidden sm:table-cell">{ item.views }</td>
          <td className="p-2 text-center hidden sm:table-cell">{ item.repliesCount }</td>
          <td className="p-2 truncate text-center hidden sm:table-cell">{ item.createdAt }</td>
        </tr>
      ))}

    </>
  )
}

export default ListItem;