Q: How long time did you end up spending on this coding test?

A: Probably somewhere around 6-10 hours, depending on exactly what I'd count as time "spent on this test". For example: I've been meaning to get more familiar with regular expressions, and finally put some time into it because of this assignment.

---

Q: Explain why you chose the code structure(s) you used in your solution. 

A: 

The general structure of the project (Express app with a react frontend in a subfolder) is used because it's a fairly simple way to set up a react/express project and something I've done before. 

For the frontend:
- React was used because it's a great, modern UI library that I'm (somewhat) familiar with.
- Mui was used because it's something I've at least used before, and saves a lot of time when trying to design something that looks at least half-decent
- Context was used in order to move logic out of components in order to make them reusable. It's used instead of redux because I'm not particularly familiar with the latter.
- I've tried to organize components and pages into a sensible structure.
- App.js has been set up in a way that should hold up fairly well even for (at least slightly) larger projects, with layouts and routes.
   
For the backend:
- Express was used because I'm (somewhat) familiar with it and it's commonly used along with react. Writing the entire stack in JavaScript just seems sensible.
- Express-fileupload was used because it was the first result I found for handling file uploads with express. Seeing as only the content is processed and the file doesn't actually have to be saved or anything. I probably could have gotten away with simply sending the text from the file to the backend, but the readme suggests that the entire file should be sent from the browser to the backend.
- I've tried to organize routes and controllers into a sensible structure that should hold up fairly well even for larger projects.

---

Q: What would you add to your solution if you had more time? This question is especially important if you did not spend much time on the coding test - use this as an opportunity to explain what your solution is missing.

A: 
- Unit tests
- A prettier frontend
- In-code frontend documentation

---

Q: What did you think of this recruitment test?

A: It was certainly an interesting test. When you initially read the description, the test seems straightforward enough, but when you get into the meat of it and need to define exactly what constitutes a 'word' in text that differs significantly from that found in literature and the like, it becomes quite a bit more difficult. Especially seeing as you need to also find a way to extract any matching occurrences of that definition.