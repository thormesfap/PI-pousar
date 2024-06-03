import { Link } from "react-router-dom";
import { editData, api_image_base_url } from "../Services/apiService";
import { PiAirplaneTakeoff } from "react-icons/pi";
import { PiAirplaneLanding } from "react-icons/pi";

function Passagem({ id, origem, destino, cia, preco, dataIda, dataVolta, link, ida, volta, logo, paradas }) {
  return (
    <div className=" bg-white shadow-xl flex justify-between gap-5 w-3/4 rounded-lg mb-3 p-5 m-auto" key={id + origem + destino + cia + ida + volta}>
      <div>
        <span>Cia Aérea: {cia} <img src={api_image_base_url + logo} className=" w-14" /></span>
      </div>
      <div>
        <div className="flex justify-between font-medium text-[#343A3D]">
          <span className="flex gap-2 items-center">
            <PiAirplaneTakeoff /> 
            Origem: {origem}
          </span>
          <span className="flex gap-2 items-center">
            <PiAirplaneLanding />
            Destino: {destino}
          </span>

        </div>
        <div className="flex  w[80%] gap-20 mt-5 font-semibold">
          <span>Ida: {getDate(dataIda)}  </span>
          <span>Volta: {getDate(dataVolta)}  </span>
        </div>

      </div>
      <div className="bg-gray-500 w-[2px]"></div>
      <div className=" flex flex-col  p-2 ">
        <p className="font-semibold text-lg">Por apenas:</p>
        <span className="text-green-600 font-semibold text-nowrap text-xl">R$ {preco}</span>
        <Link to={link} target="_blank">
          <button
                    onClick={() => { return reservar(link) }}
            className="rounded-full bg-sky-600 text-white px-5 mt-2 py-1"
          >
            Reservar
          </button>
        </Link>
      </div>
    </div>
  );
  function getDuracao(duracao){
    const hours = duracao.match(/PT(\d+)H/);
    const minutes = duracao.match(/PT\d+H(\d+)M/);
    const formattedTime = `${hours ? hours[1].padStart(2, '0') : "00"}:${minutes ? minutes[1].padStart(2, '0') : "00"}`;
    return formattedTime;

  }
  function getDate(date) {
    const data = new Date(Date.parse(date));
    if (!(data instanceof Date)) {
      return "";
    }
    return data.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  function reservar(url) {
    editData("busca/reservar", {}, id).then(
      (_) => {
            console.log(_);
            window.open(url, "_blank");
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

export default Passagem;
