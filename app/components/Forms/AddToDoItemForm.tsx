"use client"
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

interface AddToDoItemModalProps {
    onAddTask: (task: {
      listId: string,
      title: string,
      description: string,
      deadline: string,
      isFinished: boolean;
    }) => void;
  }

const AddToDoItemForm: React.FC<AddToDoItemModalProps> = ({ onAddTask }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
        } = useForm();

    const onSubmit = (data: any) => {
        onAddTask({
            listId: data.listId,
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            isFinished: false
        });
        reset();
        closeModal();
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
    <div >

      {/* Plus button for showing dialog and adding new Task */}

      <button
        className="btn btn-accent btn-xs text-accent-content text-xs"
        title="Add new item to the list"
        onClick={showModal}>+
      </button>

      {/* Dialog with a form for adding new Task */}

      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <form method="dialog" className="modal-box" onSubmit={handleSubmit(onSubmit)}>

          {/* Escape button to close dialog */}
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
            ✕
          </button>
          
          {/* Title: instructions */}
          <h3 className="font-bold text-lg">Create new Item:</h3>

          <div className="form-control">

            {/* Input for Title of the new Task */}
            <label className="input-group mt-2">
              <span className="w-80">Title</span>
              <input {...register('title', { required: true, minLength: 1, maxLength:10 })} type="text" placeholder="Title (Required)" className="input input-bordered w-screen" autoFocus/>
            </label>
            {errors.title && <span className="m-2 text-error">This field is required (max. 10)</span>}


            {/* Input for the Deadline (DateTime) to be added to the task */}
            <label className="input-group mt-2">
              <span className="w-80">Deadline</span>
              <input {...register('deadline', {})} type="datetime-local" placeholder="Date/Time" className="input input-bordered w-screen" />
            </label>

            {/* Input for the description of the taks */}
            <textarea {...register('description', { maxLength:100 })}className="textarea textarea-bordered mt-2" placeholder="Description" />

          </div>

          {/* Submit button to create new Task */}
          <button type="button" onClick={closeModal} className="btn btn-outline btn-neutral mt-10 justify-end">Close</button>
          <button type="submit" className="btn btn-outline btn-success mt-10 ml-5 justify-end">Create new Task</button>
        </form>
      </dialog>
    </div>
  );
};

export default AddToDoItemForm;
