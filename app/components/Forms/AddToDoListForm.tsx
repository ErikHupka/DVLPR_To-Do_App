"use client"
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddToDoListFormProps {
  onAddToDoList: (title: string) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
  setFilterTaskRadio: (filterTaskRadio: string) => void;
}

const AddToDoListForm: React.FC<AddToDoListFormProps> = ({ onAddToDoList, setFilterTaskRadio, searchText, setSearchText }) => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } } = useForm();

  const onSubmit = (data: any) => {    
    onAddToDoList(data.title);
    reset();
    closeModal();
  };

  const filterTaskRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTaskRadio(e.target.value);
  }

  const handleClearSearch = () => {
    setSearchText('');
  };

  const modalRef = useRef<HTMLDialogElement>(null);

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
      reset();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      reset();
    }
  }

  return (
    <div className='navbar bg-base-200 px-4 py-2 sticky top-0 overflow-hidden text-base-content'>

        { /* Radio input for filtering items */}


        <div className="flex-1 gap-2">
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text text-sm">All</span> 
                    <input type="radio" name="radio-10" className="radio radio-accent-content ml-2" value="all" onChange={filterTaskRadio} autoFocus defaultChecked/>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text text-sm">Active</span> 
                    <input type="radio" name="radio-10" className="radio radio-accent-content ml-2" value="todo" onChange={filterTaskRadio} />
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text text-sm">Finished</span> 
                    <input type="radio" name="radio-10" className="radio radio-accent-content ml-2" value="finished" onChange={filterTaskRadio} />
                </label>
            </div>
        </div>
      
      {/* Search bar */}

      <div>
        <div className="input-group mr-3 flex-auto">
            <input id="searchText" type="text" placeholder="Search…" className="input input-bordered input-accent input-sm" onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText}/>
              <button className="btn btn-square btn-accent btn-sm" title='Search' onClick={handleClearSearch}>
                x
              </button>
          </div>

      {/* Button "Create New List" to show dialog modal with a form */}

      <button className="btn btn-secondary btn-sm ml-4" onClick={showModal}>Create new LIST</button>

      {/* Dialog to create new List */}

      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <form method="dialog" className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
            ✕
          </button>

          <h3 className="font-bold text-lg">Create new List:</h3>

          <div className="form-control">
            <label className="input-group mt-2">
              <span className="w-80">New List</span>
              <input {...register('title', { required: true, minLength:1, maxLength:15  })} type="text" placeholder="Title (max. 15)" className="input input-bordered w-screen" autoFocus/>
            </label>
            {errors.title && <span className="m-2 text-error">This field is required (max. 15)</span>}

          </div>

          <button type="button" onClick={closeModal} className="btn btn-outline btn-neutral mt-10 justify-end">Close</button>
          <button type="submit" className="btn btn-outline btn-success mt-10 ml-5 justify-end">Create new List</button>

        </form>
      </dialog>
      </div>
    </div>
  );
}

export default AddToDoListForm;
