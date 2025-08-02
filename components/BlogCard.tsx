'use client';
import React, { useState } from 'react';
import { useAppDispatch } from '../store/StoreProvider';
import { deleteBlog } from '../store/slices/blogSlice';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const BlogCard = ({ blog, onEdit }: { blog: any; onEdit: (b: any) => void }) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const result = await dispatch(deleteBlog(blog._id));
    setDeleting(false);
    setShowModal(false);

    if ((result as any).meta.requestStatus === 'fulfilled') {
      toast.success('Blog deleted successfully');
    } else {
      toast.error('Failed to delete blog');
    }
  };

  const time = format(new Date(blog.createdAt), 'hh:mm a, dd MMM yyyy');

  return (
    <>
      <div className="bg-white shadow-md rounded overflow-hidden mb-6">
        {blog.image && (
          <img
            src={`https://blogs-backend-jx2t.onrender.com/uploads/${blog.image}`}
            alt="Blog Cover"
            className="w-full h-64 object-contain"
          />
        )}

        <div className="p-4">
          <h3 className="text-2xl font-bold text-gray-900">{blog.title}</h3>
          <p className="mt-2 text-gray-700">{blog.content}</p>
          <p className="text-sm text-gray-500 mt-1">Posted on {time}</p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => onEdit(blog)}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 text-white rounded cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to delete this blog post?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
