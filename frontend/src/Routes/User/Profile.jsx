import { useContext, useEffect } from "react";
import { LoginContext } from "../../Services/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import { api_image_base_url } from "../../Services/apiService";

export function Profile() {
  const { isLoggedIn, loggedUser, setIsLoggedIn, setLoggedUser } =
    useContext(LoginContext);
  const navigate = useNavigate();

  let image = () => {
    const url = loggedUser.profile_pic.includes("http")
      ? loggedUser.profile_pic
      : api_image_base_url + loggedUser.profile_pic;
    let urlHover = '';
    if (loggedUser['@type'] == "User") {
      urlHover = "/images/camera.svg";
    }

    return (
      <>
        <div
          style={{
            "--image-url": `url(${url})`,
            "--image-url-hover": `url(${urlHover}), url(${url})`,
          }}
          className={`rounded-full h-[250px] aspect-square object-cover bg-[image:var(--image-url)] bg-cover bg-no-repeat hover:bg-[image:var(--image-url-hover)]`}
        ></div>
      </>
    );
  };

  useEffect(() => {
    const user = sessionStorage.getItem("loggedUser");
    if (user) {
      setIsLoggedIn(true);
      setLoggedUser(JSON.parse(user));
    } else {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  if (!isLoggedIn) {
    return null;
  } else {
    return (
      <>
        <div className="bg-gray-400 w-4/5 m-auto rounded-3xl bg-[url(/images/profile-plane.jpg)] bg-cover bg-bottom shadow-lg font-[Rubik]">
          <div className="h-[25vh] flex justify-end items-center p-20">
            {loggedUser["@type"] == "User" && (
              <Link
                to="/perfil/edit"
                className="text-[#3758D0] text-2xl font-normal bg-white rounded-md px-4"
              >
                Editar
              </Link>
            )}
          </div>
          <div className="bg-white w-full flex p-10 rounded-b-3xl">
            <div className="rounded-full relative -top-[125px]">
              {loggedUser.profile_pic ? image() : null}
            </div>
            <div className="w-2/3 flex justify-between items-start text-[24px] p-10">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col">
                  <span className="font-normal">Nome:</span>
                  <span className="font-light">{loggedUser.nome}</span>
                </div>
                <div className="flex flex-col">
                  {loggedUser["@type"] == "User" && (
                    <>
                      <span className="font-normal">Senha:</span>
                      <span className="font-light">********</span>
                      <Link
                        to="/perfil/troca-senha"
                        className="text-[#D03737] text-[14px] font-normal bg-white rounded-md border-solid border-2 border-current w-fit px-2"
                      >
                        Trocar Senha
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col">
                  <span className="font-normal">Email:</span>
                  <span className="font-light">{loggedUser.email}</span>
                </div>
                {loggedUser["@type"] == "User" && (
                  <div className="flex flex-col">
                    <span className="font-normal">Telefone:</span>
                    <span className="font-light">{loggedUser.telefone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}