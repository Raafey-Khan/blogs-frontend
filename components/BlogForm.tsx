// components/BlogForm.tsx
'use client';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/StoreProvider';
import { createBlog, updateBlog } from '../store/slices/blogSlice';
import { toast } from 'react-toastify';

export default function BlogForm({ editing, onCloseAction }: { editing?: any; onCloseAction: () => void; }) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setContent(editing.content);
      setPreview(editing.image ? `https://blogs-backend-jx2t.onrender.com/uploads/${editing.image}` : '');
    }
  }, [editing]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return toast.error("Fill all fields");

    setLoading(true);
    try {
      if (editing) {
        const data: any = { title, content };
        if (image) {
          const form = new FormData();
          form.append('title', title);
          form.append('content', content);
          form.append('image', image);
          await dispatch(updateBlog({ id: editing._id, data: form }));
        } else {
          await dispatch(updateBlog({ id: editing._id, data }));
        }
        toast.success("Updated");
      } else {
        const form = new FormData();
        form.append('title', title);
        form.append('content', content);
        if (image) form.append('image', image);
        await dispatch(createBlog(form));
        toast.success("Blog Created Successfully");
      }
      onCloseAction();
    } catch {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
      <input name="title" value={title} onChange={e=>setTitle(e.target.value)}
        placeholder="Title" className="w-full p-2 border rounded" />
      <div>
        <label htmlFor="imageUpload" className="px-3 py-2 bg-blue-600 text-white rounded cursor-pointer">
          { preview ? 'Change Image' : 'Upload Image' }
        </label>
        <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </div>
      {preview && <img src={preview} alt="Preview" className="w-full h-48 object-contain rounded" />}
      <textarea name="content" value={content} onChange={e=>setContent(e.target.value)}
        placeholder="Content" className="w-full p-2 border rounded h-32" />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCloseAction} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
        <button type="submit" disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
          {loading ? 'Submitting...' : editing ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}
