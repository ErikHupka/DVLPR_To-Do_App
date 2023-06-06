import { Feedback } from "../interfaces/interfaces";

const BASE_URL = 'https://647c868bc0bae2880ad0d09c.mockapi.io/Feedback';

export async function sendFeedback(feedback: Feedback) {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ feedback })
  });
  if(!response.ok) {
    throw new Error('Error while sending your feedback, please try again.');
  }
  return response.json;
}