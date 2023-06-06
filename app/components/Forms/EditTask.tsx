import React, { useRef } from 'react';
import { useForm } from 'react-hook-form'

interface Task {
  id: string,
  ListId: string,
  title: string,
  description: string,
  deadline: string,
  isFinished: boolean;
};

interface EditTaskProps {
  task: Task;
  onEditTask: (task: Task) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ onEditTask, task }) => {

const {
  register,
  handleSubmit,
  reset,
  formState: { errors }
} = useForm();

const onSubmit = (data: any) => {
  onEditTask({
    id: task.id,
    ListId: task.ListId,
    title: data.title,
    description: data.description,
    deadline: data.deadline,
    isFinished: task.isFinished
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
}

const closeModal = () => {
  if (modalRef.current) {
    modalRef.current.close();
    reset();
  }
}

  return (
    <div>
      

      {/** Info button to show details */}

      <button title="Task details" className="btn btn-xs btn-ghost mr-1 my-1 px-0.5" onClick={showModal}>
        <svg className="h-5 w-5 text-neutral-content"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </button>

      {/** Dialog with details and update option */}

      <dialog className="modal" id="my_modal_3" ref={modalRef}>
        <form method="dialog" className="modal-box" onSubmit={handleSubmit(onSubmit)}>

         <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
            ✕
          </button>
          
          {/* Title: instructions */}
          <h3 className="font-bold text-lg">Details</h3>

          <div className="form-control">

            {/* Input for Title of the new Task */}
            <label className="input-group mt-2">
              <span className="w-11/12">Title</span>
              <input {...register('title', { required: true, minLength: 1, maxLength:10 })} defaultValue={ task.title } type="text" placeholder="Title (Required)" className="input input-bordered w-screen" autoFocus/>
            </label>
            {errors.title && <span className="m-2 text-error">This field is required (max. 10)</span>}


            {/* Input for the Deadline (DateTime) to be added to the task */}
            <label className="input-group mt-2">
              <span className="w-11/12">Deadline</span>
              <input {...register('deadline', {})} type="datetime-local" defaultValue={task.deadline} placeholder="Date/Time" className="input input-bordered w-screen" />
            </label>

            {/* Input for the description of the taks */}
            <label className="input-group mt-2">
              <span className="w-11/12">Description</span>
              <textarea {...register('description', { maxLength:100 })} defaultValue={task.description} className="textarea textarea-bordered w-screen" placeholder="Description" />
            </label>
     
            <label className="input-group mt-2">
              <span className="w-11/12">Status</span>
              <span placeholder="Status" className="input input-bordered w-screen" >{task.isFinished === true ? "Finished" : "Active"}</span>
            </label>

          </div>

          {/* Submit button to create new Task */}
          <button type="button" onClick={closeModal} className="btn btn-outline btn-neutral mt-10 justify-end">Close</button>
          <button type="submit" className="btn btn-outline btn-success mt-10 ml-5 justify-end">Update Task</button>

        </form>
      </dialog>
    </div>
  )
}

export default EditTask;