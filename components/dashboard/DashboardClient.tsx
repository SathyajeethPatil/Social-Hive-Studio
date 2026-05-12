"use client";

import Image from "next/image";
import { FormEvent, useMemo, useRef, useState } from "react";
import { ImagePlus, LogOut, Pencil, Plus, Search, Trash2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { Category, StudioImage } from "@/types/database";
import { slugify } from "@/utils/slugify";

type DashboardClientProps = {
  initialCategories: Category[];
  initialImages: StudioImage[];
};

export function DashboardClient({ initialCategories, initialImages }: DashboardClientProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [images, setImages] = useState(initialImages);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [placementFilter, setPlacementFilter] = useState("all");
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<StudioImage | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      const matchesQuery =
        image.title.toLowerCase().includes(query.toLowerCase()) ||
        (image.description ?? "").toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categoryFilter === "all" || image.category_id === categoryFilter;
      const matchesPlacement =
        placementFilter === "all" ||
        (placementFilter === "home" && image.show_on_home) ||
        (placementFilter === "fame" && image.show_on_hall_of_fame);
      return matchesQuery && matchesCategory && matchesPlacement;
    });
  }, [categoryFilter, images, placementFilter, query]);

  async function refreshData() {
    const [categoryRes, imageRes] = await Promise.all([fetch("/api/admin/categories"), fetch("/api/admin/images")]);
    if (categoryRes.ok) setCategories(await categoryRes.json());
    if (imageRes.ok) setImages(await imageRes.json());
  }

  async function uploadImage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if (!form.get("category_id")) {
      toast.error("Choose a category before uploading.");
      return;
    }

    setUploading(true);
    const response = await fetch("/api/admin/images", { method: "POST", body: form });
    setUploading(false);

    if (!response.ok) {
      toast.error(await readError(response));
      return;
    }

    toast.success("Image uploaded.");
    event.currentTarget.reset();
    setPreview(null);
    await refreshData();
  }

  async function createCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    if (!String(form.get("slug") ?? "")) {
      form.set("slug", slugify(name));
    }

    const response = await fetch("/api/admin/categories", {
      method: "POST",
      body: form
    });

    if (!response.ok) {
      toast.error(await readError(response));
      return;
    }

    toast.success("Category created.");
    event.currentTarget.reset();
    await refreshData();
  }

  async function updateImage(image: StudioImage, values: Partial<StudioImage>) {
    const response = await fetch(`/api/admin/images/${image.id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      toast.error(await readError(response));
      return;
    }

    toast.success("Image updated.");
    setEditing(null);
    await refreshData();
  }

  async function deleteImage(image: StudioImage) {
    if (!window.confirm(`Delete "${image.title}"?`)) return;
    const response = await fetch(`/api/admin/images/${image.id}`, { method: "DELETE" });

    if (!response.ok) {
      toast.error(await readError(response));
      return;
    }

    toast.success("Image deleted.");
    await refreshData();
  }

  async function updateCategory(category: Category, values: Partial<Category>) {
    const response = await fetch(`/api/admin/categories/${category.id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      toast.error(await readError(response));
      return;
    }

    toast.success("Category updated.");
    await refreshData();
  }

  async function deleteCategory(category: Category) {
    if (!window.confirm(`Delete category "${category.name}"? Images using it must be moved first.`)) return;
    const response = await fetch(`/api/admin/categories/${category.id}`, { method: "DELETE" });

    if (!response.ok) {
      toast.error(await readError(response));
      return;
    }

    toast.success("Category deleted.");
    await refreshData();
  }

  async function signOut() {
    await createClient().auth.signOut();
    window.location.href = "/studio-admin-access";
  }

  return (
    <section className="mt-6 grid gap-6">
      <div className="glass rounded-[2rem] p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold">Upload image</h2>
          <Button type="button" variant="ghost" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
        <form onSubmit={uploadImage} className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <label
            className="grid min-h-80 cursor-pointer place-items-center rounded-[1.5rem] border-2 border-dashed border-white/80 bg-white/50 p-6 text-center"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const file = event.dataTransfer.files[0];
              if (fileRef.current && file) {
                const list = new DataTransfer();
                list.items.add(file);
                fileRef.current.files = list.files;
                setPreview(URL.createObjectURL(file));
              }
            }}
          >
            {preview ? (
              <img src={preview} alt="Upload preview" className="max-h-72 rounded-[1.25rem] object-contain" />
            ) : (
              <span>
                <UploadCloud className="mx-auto h-10 w-10 text-hivePink" />
                <span className="mt-4 block font-heading text-xl font-bold">Drag, drop, or choose image</span>
                <span className="mt-2 block text-sm text-muted">PNG, JPG, WEBP up to your Supabase limit.</span>
              </span>
            )}
            <input
              ref={fileRef}
              name="file"
              type="file"
              accept="image/*"
              required
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setPreview(file ? URL.createObjectURL(file) : null);
              }}
            />
          </label>

          <div className="grid gap-4">
            <AdminInput name="title" label="Title" required />
            <AdminTextarea name="description" label="Description" />
            <AdminSelect name="category_id" label="Category" required categories={categories} />
            <Toggle name="show_on_hall_of_fame" label="Show on Hall of Fame" />
            <Toggle name="show_on_home" label="Show on Home Page" />
            <Button type="submit" disabled={uploading || categories.length === 0}>
              <ImagePlus className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload to Studio"}
            </Button>
          </div>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="glass rounded-[2rem] p-6">
          <h2 className="font-heading text-2xl font-bold">Categories</h2>
          <form onSubmit={createCategory} className="mt-5 grid gap-3">
            <AdminInput name="name" label="Name" required />
            <AdminInput name="slug" label="Slug" placeholder="auto-generated if blank" />
            <AdminInput name="thumbnail_url" label="Thumbnail URL" />
            <label className="grid gap-2">
              <span className="text-sm font-bold">Thumbnail upload</span>
              <input
                name="thumbnail_file"
                type="file"
                accept="image/*"
                className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold outline-none"
              />
            </label>
            <Button type="submit">
              <Plus className="h-4 w-4" /> Create category
            </Button>
          </form>

          <div className="mt-6 grid gap-3">
            {categories.map((category) => (
              <CategoryRow key={category.id} category={category} onUpdate={updateCategory} onDelete={deleteCategory} />
            ))}
          </div>
        </div>

        <div className="glass rounded-[2rem] p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <h2 className="font-heading text-2xl font-bold">Image management</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <label className="flex items-center gap-2 rounded-2xl bg-white/60 px-3 py-2">
                <Search className="h-4 w-4 text-hivePink" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search"
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </label>
              <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-2xl bg-white/60 px-3 py-2 text-sm font-bold outline-none">
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select value={placementFilter} onChange={(event) => setPlacementFilter(event.target.value)} className="rounded-2xl bg-white/60 px-3 py-2 text-sm font-bold outline-none">
                <option value="all">All placements</option>
                <option value="home">Home</option>
                <option value="fame">Hall of Fame</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {filteredImages.map((image) => (
              <ImageRow
                key={image.id}
                image={image}
                categories={categories}
                editing={editing?.id === image.id}
                onEdit={() => setEditing(image)}
                onCancel={() => setEditing(null)}
                onUpdate={updateImage}
                onDelete={deleteImage}
              />
            ))}
            {filteredImages.length === 0 ? <p className="rounded-2xl bg-white/50 p-5 text-sm text-muted">No images match those filters.</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

async function readError(response: Response) {
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message || "Something went wrong.";
  } catch {
    return response.text();
  }
}

function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold">{label}</span>
      <input className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-hivePink/20" {...rest} />
    </label>
  );
}

function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold">{label}</span>
      <textarea rows={4} className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-hivePink/20" {...rest} />
    </label>
  );
}

function AdminSelect({ categories, label, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; categories: Category[] }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold">{label}</span>
      <select className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-hivePink/20" {...rest}>
        <option value="">Choose category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function Toggle({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3 text-sm font-bold">
      {label}
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-5 w-5 accent-hivePink" />
    </label>
  );
}

function ImageRow({
  image,
  categories,
  editing,
  onEdit,
  onCancel,
  onUpdate,
  onDelete
}: {
  image: StudioImage;
  categories: Category[];
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onUpdate: (image: StudioImage, values: Partial<StudioImage>) => void;
  onDelete: (image: StudioImage) => void;
}) {
  if (editing) {
    return (
      <form
        className="grid gap-3 rounded-[1.5rem] bg-white/60 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          onUpdate(image, {
            title: String(form.get("title")),
            description: String(form.get("description")),
            category_id: String(form.get("category_id")),
            show_on_home: form.has("show_on_home"),
            show_on_hall_of_fame: form.has("show_on_hall_of_fame")
          });
        }}
      >
        <AdminInput name="title" label="Title" defaultValue={image.title} required />
        <AdminTextarea name="description" label="Description" defaultValue={image.description ?? ""} />
        <AdminSelect name="category_id" label="Category" categories={categories} defaultValue={image.category_id} required />
        <Toggle name="show_on_hall_of_fame" label="Show on Hall of Fame" defaultChecked={image.show_on_hall_of_fame} />
        <Toggle name="show_on_home" label="Show on Home Page" defaultChecked={image.show_on_home} />
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="grid gap-4 rounded-[1.5rem] bg-white/60 p-4 md:grid-cols-[90px_1fr_auto] md:items-center">
      <Image src={image.image_url} alt={image.title} width={120} height={120} className="h-24 w-24 rounded-2xl object-cover" />
      <div>
        <p className="font-heading text-lg font-bold">{image.title}</p>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{image.description}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
          {image.show_on_home ? <span className="rounded-full bg-hivePink/10 px-3 py-1 text-hivePink">Home</span> : null}
          {image.show_on_hall_of_fame ? <span className="rounded-full bg-hivePink/10 px-3 py-1 text-hivePink">Hall of Fame</span> : null}
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="secondary" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" onClick={() => onDelete(image)}>
          <Trash2 className="h-4 w-4 text-hivePink" />
        </Button>
      </div>
    </div>
  );
}

function CategoryRow({
  category,
  onUpdate,
  onDelete
}: {
  category: Category;
  onUpdate: (category: Category, values: Partial<Category>) => void;
  onDelete: (category: Category) => void;
}) {
  return (
    <form
      className="rounded-[1.5rem] bg-white/60 p-4"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        onUpdate(category, {
          name: String(form.get("name")),
          slug: String(form.get("slug")),
          thumbnail_url: String(form.get("thumbnail_url")) || null
        });
      }}
    >
      <div className="grid gap-3">
        <input name="name" defaultValue={category.name} className="rounded-2xl bg-white/70 px-3 py-2 text-sm font-bold outline-none" />
        <input name="slug" defaultValue={category.slug} className="rounded-2xl bg-white/70 px-3 py-2 text-sm font-semibold outline-none" />
        <input name="thumbnail_url" defaultValue={category.thumbnail_url ?? ""} placeholder="Thumbnail URL" className="rounded-2xl bg-white/70 px-3 py-2 text-sm font-semibold outline-none" />
      </div>
      <div className="mt-3 flex gap-2">
        <Button type="submit" variant="secondary">
          Save
        </Button>
        <Button type="button" variant="ghost" onClick={() => onDelete(category)}>
          <Trash2 className="h-4 w-4 text-hivePink" />
        </Button>
      </div>
    </form>
  );
}
