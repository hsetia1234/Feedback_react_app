1. All the questions found at the given link are uploaded in the MongoDB with collection name 'question'.
2. Questions are fetched from MongoDB, and 10 questions are choosen randomly for randering using React.
3. All the choosen questions have initial preset response 'Neutral'.
4. For submitting the response, user have to add their details like Name, Age and Email-id.
5. Name and Email id of the user is saved in MongoDB with their selected responses in the MongoDB 'response' collection.
6. Responses stored in JSON format can be downloaded by pressing 'Export To CSV" button.
7. CSV response file have details as follows:	Name, Email, Response Submission Time, and selected response.	
8. CSV will have response of all the questions.Those questions not asked to user are marked as "Not Asked". It is because of the reason that different user have different 10 questions and I am maintaining all of the users response in singe csv.
