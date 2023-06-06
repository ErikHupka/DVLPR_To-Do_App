import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sendFeedback } from '../components/API/feedbackAPI';

const feedbackSchema = z.object({
  email: z.string().email(),
  name: z.string().nonempty({ message: 'Name is required' }),
  feedback: z.string().nonempty({ message: 'Feedback is required' }),
});

const Feedback: React.FC = () => {

  // Track the result from the API
  const [ resultAPI, setResultAPI] = useState('');

  const { 
    reset,
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(feedbackSchema)
  });

  // Handle form submit - Wait for the API result to show confirmation message or vice versa
  const onSubmit = (data: any) => {
    sendFeedback(data)
    .then(() => {
      setResultAPI('success');
      reset();
    })
    .catch(() => {
      setResultAPI('error');
    });
  };

  // Submit new Form - hide the success message (I mean not a big deal, but for a better feeling :D )
  const resetForm = () => {
    setResultAPI('');
  }

  return (
    <main className="max-w-full min-h-screen bg-neutral">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/** Feedback Description */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Feedback Form</h1>
            <p className="py-6">Once again thank you so much for testing out my application. From my experience I have learned, that the best feedback is from Users. <br/><br/>
            Therefore, please feel free to leave your opinion, on what did you like or didn't like in the application. <br/>(Yes, the form works)<br/><br/>
            Many Thanks!</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              {/** Form handling the submit */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/** Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    {...register("email")}
                    placeholder="test@test.com"
                    className="input input-bordered"
                  />
                  {/** Show the error message */}
                  {errors.email && <span className="text-error">{String(errors.email.message)}</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Name"
                    className="input input-bordered"
                  />
                  {/** Show the error message */}
                  {errors.name && <span className="text-error">{String(errors.name.message)}</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Feedback</span>
                  </label>
                  <textarea
                    {...register("feedback")}
                    className="textarea textarea-bordered"
                    placeholder="Description"
                  />
                  {/** Show the error message */}
                  {errors.feedback && <span className="text-error">{String(errors.feedback?.message)}</span>}
                </div>
                {/** Submit button */}
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                  {/** Show success / error message after the feedback from the API */}
                  {resultAPI === 'success' && 
                  <div className='mt-3 flex flex-col place-items-center'>
                    <span className="text-success">Feedback submitted successfully!</span>
                    <button type="submit" className="btn btn-success btn-sm mt-2" onClick={resetForm}>
                    Send another feedback
                    </button>
                  </div>}
                  {resultAPI === 'error' && <span className="text-error mt-3">Failed to send!</span>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Feedback;
