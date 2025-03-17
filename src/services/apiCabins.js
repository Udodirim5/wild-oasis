import supabase, { supabaseUrl } from "./supabase";

export const getCabin = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabin couldn't be loaded");
  }
  return data;
};

export const createOrEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create/Edit
  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin couldn't be created");
  }

  // ✅ Upload only if the image is new (not an existing URL)
  if (hasImagePath) {
    return data;
  } else {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // ✅ Prevent deleting undefined IDs
    if (storageError) {
      if (data?.id) await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("Image couldn't be uploaded");
    }
  }

  return data;
};

export const deleteCabinApi = async (id) => {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin couldn't be deleted");
  }

  return data;
};
