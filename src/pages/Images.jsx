import { toast } from "react-toastify";
import { BUCKET_ID, storage } from "../config/appwrite";
import { useEffect, useState } from "react";

export default function Images() {
  const [images, setImages] = useState([]);

  const getAllFiles = async () => {
    try {
      const response = await storage.listFiles(BUCKET_ID);
      // console.log(response);
      setImages(response.files);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        {images?.map((image) => (
          <div className="p-2" key={image.$id}>
            <img
              src={`https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${
                image.$id
              }/view?project=${import.meta.env.VITE_PROJECT_ID}&mode=admin`}
              alt={image.name}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
