import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../Services/LoginContext.jsx";
import { fetchData, loginUsuario } from "../../Services/apiService.jsx";
import { Loading } from "../../components/Loading.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "../../components/Input.jsx";
import { useForm, FormProvider } from "react-hook-form";
import { InputPassword } from "../../components/InputPassword.jsx";

// import styles from '../assets/css/TelaLogin2.module.css';

function TrocaSenhaCia() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { setIsLoggedIn, setLoggedUser } = useContext(LoginContext);
  const [processando, setProcessando] = useState(false);
  const [erros, setErros] = useState(null);
  const handleFormSubmit = (data) => {
    if (!data.password || !data.password_repeat) {
      setErros({ message: "Senha e Repetir Senha são campos obrigatórios" });
      return null;
    }
  };

  function onSubmit(event) {
    event.preventDefault();
    const data = {
      login: event.target.login.value,
      password: event.target.password.value,
      password_repeat: event.target.password_repeat.value,
    };
    setProcessando(true);
    setErros(null);

    //     loginUsuario(data).then(
    //       (_) => {
    //         if (_ === true) {
    //           fetchData("/auth/me").then(
    //             (user) => {
    //               setLoggedUser(user);
    //               sessionStorage.setItem("loggedUser", JSON.stringify(user));
    //               setProcessando(false);
    //               setErros(null);
    //               navigate("/perfil");
    //             },
    //             (error) => {
    //               console.log("Erro ao buscar quem logou");
    //               setErros({
    //                 message:
    //                   "Não foi possível identificar os dados de cadastro do usuário. Contate um administrador",
    //               });
    //               console.log(error);
    //               setProcessando(false);
    //             }
    //           );
    //         } else {
    //           setIsLoggedIn(false);
    //           setLoggedUser(null);
    //           setProcessando(false);
    //           setErros({ message: "Login falhou. Cheque suas credenciais." });
    //           sessionStorage.removeItem("loggedUser");
    //         }
    //       },
    //       (_) => {
    //         console.log(_);
    //         setProcessando(false);
    //         setErros({ message: "Login falhou. Cheque suas credenciais." });
    //       }
    //     );
    //   }
  }

  function toggleVisible() {
    setVisible(!visible);
  }
  const methods = useForm();
  function msgErro() {
    if (!erros) {
      return null;
    }
    return (
      <div className="flex items-center justify-center h-12 bg-red-400 text-white text-sm rounded-md w-full">
        {erros.message}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="login"
        className="flex justify-between overflow-hidden h-screen"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={onSubmit}
            className="flex justify-center items-center w-[50%]"
          >
            <div className=" min-w-[27vw]">
              {msgErro()}
              <h1 className="text-[#2B3674] text-4xl ">Trocar Senha</h1>
              <p className="text-gray-400 my-7">
                Digite sua nova senha e confirme novamente
              </p>
              <div className="flex flex-col gap-3">
                <input type="hidden" name="token"></input>
                <Input
                  label="Login*"
                  type="text"
                  id="login"
                  placeholder="Seu Login"
                  name="login"
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                  }}
                />
                <InputPassword
                  id="password"
                  label="Nova Senha*"
                  placeholder="Mínimo de 8 caracteres"
                  name="password"
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                    minLength: {
                      value: 8,
                      message: "Mínimo de 8 caracteres",
                    },
                  }}
                />

                <InputPassword
                  label="Repita a senha*"
                  id="password_repeat"
                  placeholder="Repita a Senha"
                  name="password_repeat"
                  validation={{
                    required: { value: true, message: "Campo Obrigatório" },
                    minLength: {
                      value: 8,
                      message: "Mínimo de 8 caracteres",
                    },
                    validate: {
                      repeat: (v) =>
                        v == methods.getValues("password") ||
                        "Senhas devem ser iguais",
                    },
                  }}
                />
              </div>
              <button
                onClick={methods.handleSubmit(handleFormSubmit)}
                className="flex w-[100%] bg-[#3758D0] h-14 gap-2 rounded-2xl my-7 items-center text-gray-50 font-semibold justify-center"
              >
                Alterar Senha
              </button>
            </div>
          </form>
        </FormProvider>
        {processando ? <Loading /> : null}
        <div className="w-[50%] h-[100%] flex justify-center items-center rounded-bl-[150px] rounded-tl-lg bg-[url(/images/cia-troca-senha.jpg)] bg-cover bg-no-repeat">
          <img src="/images/logo-Pousar.png"></img>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TrocaSenhaCia;
