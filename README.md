# Running with Docker (Pull Image from Hub)

Steps:

1.  Ensure Docker is installed.

2.  Run Docker Compose:

        docker-compose up

3.  Access Playerest (v0.0.1):

        Frontend: http://localhost

        Backend: http://localhost:3000

# Running with Docker (Local)

1. Go to `/client` and Build

        cd client
        npm run build

2. Go to `/server/functions` and Build

        cd /server/functions
        npm run build

3. Run Docker Compose in **root directory**:
   
        docker-compose -f docker-compose-build-images.yml up --build
   
5.  Access Playerest:

        Frontend: http://localhost

        Backend: http://localhost:3000

## Backend old Repo (For checking commits in grading)
We migrated the back-end repo to the repo where the front-end is located (that is, the current repo) halfway through the project. Old commits can be seen at https://github.com/YileiCheng/Playerest-Backend
