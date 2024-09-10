import Footer from "./Guitarras/components/Footer";
import Header from "./Guitarras/components/Header";
import ListadoGuitarras from "./Guitarras/components/ListadoGuitarras";
import { useCarrito } from "./Guitarras/hooks/useCarrito";

function App() {
  const {
    carrito,
    handleIncrementar,
    handleDecrementar,
    handleVaciarCarrito,
    handleAgregarCarrito,
    removerItem,
    data,
  } = useCarrito();

  return (
    <>
      <Header
        carrito={carrito}
        handleIncrementar={handleIncrementar}
        handleDecrementar={handleDecrementar}
        handleVaciarCarrito={handleVaciarCarrito}
        removerItem={removerItem}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((item) => (
            <ListadoGuitarras
              key={item.id}
              item={item}
              handleAgregarCarrito={handleAgregarCarrito}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
