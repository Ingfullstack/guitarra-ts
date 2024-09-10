import { useEffect, useState } from "react";
import { Guitarra } from "../types";
import { db } from "../data/db";

export const useCarrito = () => {
  const init = () => {
    const localCarrito = localStorage.getItem('carrito');
    return localCarrito ? JSON.parse(localCarrito): []
  }
  const [data, setData] = useState<Guitarra[]>([]);
  const [carrito, setCarrito] = useState<Guitarra[]>(init);

  useEffect(() => {
    setData(db);
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito',JSON.stringify(carrito));
  },[carrito])

  const handleAgregarCarrito = (item: Guitarra) => {
    const existe = carrito.find((prevItem) => prevItem.id === item.id);

    if (existe) {
      const actualizar = carrito.map((prevItem) => {
        if (prevItem.id === item.id && prevItem.cantidad < 5) {
          return {
            ...prevItem,
            cantidad: prevItem.cantidad + 1,
          };
        }
        return prevItem;
      });
      setCarrito(actualizar);
    } else {
      setCarrito([...carrito, item]);
    }
  };

  const handleIncrementar = (id: Guitarra["id"]) => {
    const actualizar = carrito.map((prevItem) => {
      if (prevItem.id === id && prevItem.cantidad < 5) {
        return {
          ...prevItem,
          cantidad: prevItem.cantidad + 1,
        };
      }
      return prevItem;
    });
    setCarrito(actualizar);
  };

  const handleDecrementar = (id: Guitarra["id"]) => {
    const actualizar = carrito.map((prevItem) => {
      if (prevItem.id === id && prevItem.cantidad > 1) {
        return {
          ...prevItem,
          cantidad: prevItem.cantidad - 1,
        };
      }
      return prevItem;
    });
    setCarrito(actualizar);
  };

  const handleVaciarCarrito = () => {
    setCarrito([]);
  };

  const removerItem = (id: Guitarra["id"]) => {
    const remover = carrito.filter((item) => item.id !== id);
    setCarrito(remover);
  };

  return {
    db,
    data,
    carrito,
    handleAgregarCarrito,
    handleVaciarCarrito,
    handleIncrementar,
    handleDecrementar,
    removerItem,
  };
};
