import { useLoader } from "./LoaderProvider";
//import "./Loader.css"; // Si quieres agregar estilos

const Loader = () => {
  const { loading } = useLoader();
  if (!loading) return null; // Si no está cargando, no muestra nada

  return (
    <div className="loader-overlay">
      <div className="loader">Cargando...</div>
    </div>
  );
};

export default Loader;