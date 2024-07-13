import Submit from "@components/Submit";
import useLoginStore from "@hooks/store";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const { setSiteUserId } = useLoginStore((state) => state)
  const [userId, setId] = useState('')
  const [userPs, setPs] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.fesp.shop/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          'email': userId, 
          'password': userPs }),
      });
      const loginData = await res.json();
      
      
      if (!res.ok) {
        alert('아이디와 비밀번호를 확인해주세요')
        throw new Error(loginData.message || '로그인에 실패했습니다.');
      } else {
        alert('로그인성공')
        console.log(loginData)
        setSiteUserId(loginData)
        history.back();
      }

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">로그인</h2>
        </div>

        {/* <form onSubmit={ (event) => { event.preventDefault(); history.back(); } }> */}
        <form onSubmit={ handleSubmit }>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={userId}
              name="email"
              onChange={e => setId(e.target.value)}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={userPs}
              onChange={e => setPs(e.target.value)}
              name="password"
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
            <Link to="#" className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline">비밀번호를 잊으셨나요?</Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Submit>로그인</Submit>
            <Link to="/user/signup" className="ml-8 text-gray-800 hover:underline">회원가입</Link>
          </div>
        </form>
      </div>
    </main>
  );
}


export default Login;