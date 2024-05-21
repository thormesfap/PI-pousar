import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../Services/LoginContext';
import { fetchData, loginUsuario } from '../Services/apiService';
import LoginImg from "/images/Background 5.4.svg"
// import styles from '../assets/css/TelaLogin2.module.css';


function TelaLogin2() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { setIsLoggedIn, setLoggedUser } = useContext(LoginContext)
  function onSubmit(event) {
    event.preventDefault();
    const data = { email: event.target.email.value, password: event.target.password.value }
    loginUsuario(data).then((_) => {
      if (_ === true) {
        fetchData("/auth/me").then((user) => {
          setLoggedUser(user)
          sessionStorage.setItem("loggedUser", JSON.stringify(user))
          navigate("/perfil")
        }, (error) => {
          console.log("Erro ao buscar quem logou")
          console.log(error)
        })
      } else {
        setIsLoggedIn(false)
        setLoggedUser(null)
        sessionStorage.removeItem('loggedUser');
      }
    }, (_) => { console.log(_) })
  }

  function toggleVisible() {
    setVisible(!visible);
  }

  return (
    <div className="flex justify-between overflow-hidden h-screen">
      <form  onSubmit={onSubmit} className='flex justify-center items-center w-[50%]'>
        <div className=" min-w-[27vw]">

          <h1 className="text-[#2B3674] text-4xl ">Entrar</h1>
          <p className="text-gray-400 my-7">Insira seu email e senha para continuar!</p>
          <button className="flex w-[100%] bg-[#F4F7FE] h-14 gap-2 rounded-2xl items-center text-[#2B3674] font-semibold justify-center" type="button">
            <img src="/images/Google__G__Logo 1.png" alt="imagem_google"></img>Entrar com Google
          </button>
          <div className='flex items-center my-7 justify-center'>
            <div className='bg-gray-300 h-[1px] w-[40%]'></div>
            <p className='mx-5 text-gray-300'>ou</p>
            <div className='bg-gray-300 h-[1px] w-[40%]'></div>
          </div>
          <div className="flex flex-col gap-3">
            <label for="email" className='text-[#2B3674] font-medium'>E-mail*</label>
            <input type="email" name="email" id="email" className='border flex items-center justify-between h-14 px-5 rounded-2xl' placeholder="seuemail@gmail.com"></input>
            <label for="senha"  className='text-[#2B3674] font-medium'>Senha*</label>
            <div className="border flex items-center justify-between h-14 px-5 rounded-2xl">
              <input type={visible ? "text" : "password"} name="password" id="senha" placeholder="Min. 8 characters">

              </input>
                <img src="/images/visibility.svg" className='opacity-60' onClick={toggleVisible} id="btn_senha"></img>
            </div>
          </div>
          <div className="flex my-4 justify-between">
            <div className="">
              <input type="checkbox"></input> <label for="mante">Mantenha logado</label>
            </div>
            <div className="text-[#3758D0] font-semibold ">
              <a href="/Email_esq.html">Esqueceu sua senha?</a>
            </div>
          </div>
          <button className="flex w-[100%] bg-[#3758D0] h-14 gap-2 rounded-2xl my-7 items-center text-gray-50 font-semibold justify-center">Entrar</button>
          <p>Não possui conta?<a href="/new_conta.html" className="text-[#3758D0] font-semibold "> Crie uma conta agora.</a></p>
        </div>
      </form>

      <div className="w-[50%] h-[100%] flex justify-center items-center  bg-[url(/images/LoginIMG.jpg)]">
        
      </div>
    
    </div >
  );
}

export default TelaLogin2;