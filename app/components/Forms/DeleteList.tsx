import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

interface deleteList {
    onDeleteList: (title: string) => void;
}

const DeleteList: React.FC<deleteList> = ({ onDeleteList }) => {
const { 
    handleSubmit,
    reset,
    formState: { errors }} = useForm();

const modalRef = useRef<HTMLDialogElement>(null);

const DeleteList = (data: any) => {
    onDeleteList(data.title);
    reset();
}

const showModal = () => {
    if (modalRef.current) {
        modalRef.current.showModal();
    }
};

const closeModal = () => {
    if (modalRef.current) {
        modalRef.current.close();
    }
}

return (
<div>
    {/** Button for List Deletion */}
    <button onClick={showModal} title="Remove current list" className='btn btn-xs m-2'>
    <svg className="h-3 w-3 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <polyline points="3 6 5 6 21 6" /> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /> <line x1="10" y1="11" x2="10" y2="17" /> <line x1="14" y1="11" x2="14" y2="17" /></svg>
    </button>
    
    {/** Modal */}
    <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <form method="dialog" className="modal-box" onSubmit={handleSubmit(DeleteList)}>
        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
            ✕
        </button>

        <h3 className="font-bold text-lg">Are you sure you want to delete this List and all related Tasks?</h3>

        {/** Close / Submit button */}
        <button type="button" onClick={closeModal} className="btn btn-outline btn-neutral mt-10 justify-end">Close</button>
        <button type="submit" onClick={closeModal} className="btn btn-outline btn-error mt-10 ml-5 justify-end">Delete</button>
        </form>
    </dialog>
</div>
)


}

export default DeleteList;