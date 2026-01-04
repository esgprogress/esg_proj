# ESGProject
### An open platform for ESG Data from the top companies in the world

This project aims to consolidate ESG information, which is currently scattered across a lot of sources,
in inconsistent formats, into one comprehensible and consistent view. Our goal is to make corporate
ESG information available to the masses, and allow companies to be held accountable by the public in
cases wherein they sneakily change targets over time. 

To do this, we have established a set of standard questions for each of Environment, Social and Governance, plus
an additional set of Environment-related questions, which depend on the industry the company operates in. 
These answers are displayed on a minimalist interface that has been designed with user-friendliness and browser
performance in mind. 

-------------------
## Instructions for backend deployment

1. Go through the Bruno API guide by importing the collection located at `backends/docs/bruno` into the Bruno IDE (https://www.usebruno.com/)
2. The system requires a MongoDB deployment (either local or Docker-based), as well as installation of a set of libraries that you can see using the `requirements.txt` file located at `backends/requirements.txt`. If you use `pip`, `pip install requirements.txt` should install everything needed. **NOTE**: If you do not have ROCm or CUDA support on your system, please amend the `requirements.txt` file to remove '+cu128' from `torch` and `torchvision`.
3. The `insert_types_and_questions.py` file performs the initial question setup needed in the database.

Deployments must create an environmental file at `/backends` based on `.env.example` to allow access to Gemini, MongoDB and Auth0. 
You will require an Auth0 account (https://auth0.com/signup) for authentication.  

For authentication, please modify the MongoDB URL to include username and password in compliance with JDBC standards. 


----

## Instructions for frontend deployment

1. Ensure you have Node.js and npm installed on your system.
2. Run `npm install` to install all the dependencies
3. Create a new environment file in `/frontend` based on the given `.env.local.example`
4. `npm run build` to build the system, and then deploy with your choice of method. You can run `npm run start` to just deploy
a normal server, or you can create a Dockerfile and make an image to deploy via Docker.