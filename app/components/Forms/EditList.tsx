import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

//To be continued

//interface List {
  //id: string, 
  //title: string
//}

interface EditListProps {
  listId: string,
  title: string,
  onEditList: (listId: string, title: string) => void;
}

const EditList: React.FC<EditListProps> = ({ listId, title, onEditList }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: any) => {
    onEditList(listId, data.title);
    reset();
    closeModal();
  }

  const modalRef = useRef<HTMLDialogElement>(null);

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
      reset();
    }
  }

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      reset();
    }
  }

  return (
    <div>
      <button title="Edit name of the List" className="btn btn-xs btn-ghost ml-3 px-0.5" onClick={showModal}>
        <svg className="h-4 w-4 text-base-content" width="24"  height="24"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
      </button>

      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <form method="dialog" className="modal-box" onSubmit={handleSubmit(onSubmit)}>
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
            ✕
          </button>

          <h3 className="font-bold text-lg">Edit List</h3>

          <div className="form-control">
            <label className="input-group mt-2">
              <span className="w-80">List</span>
              <input {...register('title', { required: true, minLength:1, maxLength:15  })} defaultValue={title} type="text" placeholder="Title (max. 15)" className="input input-bordered w-screen" autoFocus/>
            </label>
            {errors.title && <span className="m-2 text-error">This field is required (max. 15)</span>}

          </div>

          <button type="button" onClick={closeModal} className="btn btn-outline btn-neutral mt-10 justify-end">Close</button>
          <button type="submit" className="btn btn-outline btn-success mt-10 ml-5 justify-end">Edit List</button>

        </form>
      </dialog>
    </div>
  )
}

export default EditList;