import Bebidas from './components/Bebidas'
import Encabezado from './components/Encabezado'
import Especialidades from './components/Especialidades'
import MenuInteractivo from './components/MenuInteractivo'
import Nosotros from './components/Nosotros'
import PieDePagina from './components/PieDePagina'
import Portada from './components/Portada'
import Promociones from './components/Promociones'
import Ubicacion from './components/Ubicacion'

export default function App() {
  return (
    <>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-amarillo focus:px-5 focus:py-3 focus:font-alt focus:uppercase focus:tracking-widest focus:text-carbon"
      >
        Saltar al menú
      </a>

      <Encabezado />

      <main>
        <Portada />
        <MenuInteractivo />
        <Especialidades />
        <Bebidas />
        <Nosotros />
        <Promociones />
        <Ubicacion />
      </main>

      <PieDePagina />
    </>
  )
}
