import { Item } from "@/types/dataTypes";
import Image from "next/image";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

const DeleteComponent = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les articles depuis l'API au chargement
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des articles");
        }

        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur:", err);
      }
    };
    fetchItems();
  }, []);

  // Fonction pour supprimer un article
  const handleDelete = async (id: string, category: string) => {
    try {
      const response = await fetch(`/api/products`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, category }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'article");
      }
      // Supprimer l'article de l'état local après suppression
      setItems(items.filter((item) => item.id !== id));
      console.log("Article supprimé avec succès");
    } catch (err) {
      return new NextResponse(JSON.stringify({ error: err }), {
        status: 500,
      });
    }
  };

  if (loading) return <div>Chargement des articles...</div>;

  return (
    <div className="flex w-3/4 flex-col items-center gap-10 rounded-xl bg-white p-5 shadow-lg">
      <h1 className="text-xl font-semibold text-red-500">
        Supprimer des articles
      </h1>
      {items.length === 0 ? (
        <p>Aucun article disponible.</p>
      ) : (
        <ul className="flex w-full flex-col gap-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-20">
                <Image
                  src={item.imageUrls[0]}
                  width={100}
                  height={100}
                  alt=""
                />
                <div className="grid grid-cols-2 items-center gap-4">
                  <strong>{item.title}</strong> - {item.price}€ -{" "}
                  {item.quantity} pièces
                </div>
              </div>
              <button
                onClick={() =>
                  item.category && handleDelete(item.id, item.category)
                }
                className="rounded bg-red-500 p-2 text-white"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteComponent;
