## About this app

This application is a small task management demo that is build on Laravel. It has the following features:

-   A user password authentication
-   Users can create a Task List (can be named project) and under each task list, sub tasks can be created
-   Both Task List and sub task can be updated or deleted
-   Users with the exception of the administrator and given access to update or delete their own tasks.
-   Users can share their Task List.
-   Users can view and toggles task list they shared with others.

## Local Setup

Setting this app locally is as simple as setting up any other Laravel application. You need to have Docker desktop and NodeJS install on your machine.
These two requirements below are the steps to setup:

-   Copy the content of .env.example into a .env file, using `cp .env.example .env`.
-   Install composer packages by running `compose install` command.
-   Install node dependencies by running `npm install` comand.
-   Run `npm run dev` to watch for script changes.
-   In a separate terminal, start your Docker daemon and run `docker compose up -d` to build and pull in relevant images and start containers
-   Generate you app key by running this code: `docker exec task-manager-app php artisan key:generate`
-   Migrate the database using `docker exec task-manager-app php artisan migrate` command. Check in the docker-compose.yml to confirm the container name
-   Access the local address at: http://localhost:8000

## Using the app.

-   On the homepage you are presented a login and register buttons. You can login using `test@examle.com` and `password`, after seeding the database.
-   You can also create a demo account with a dummy email to test.
-   After login in you are taking to an empty dashboard page. Check on the menu at the top for any further interactions
-   On the Users table you can see a list of users on the application. Next to the names are links to the Task Lists( Visible to only Admins)
-   If you are not an Admin user you can go to your task lists by clicking on the blue button next to it.
-   When you are on the task list page, you are presented the option to create a task list. If you have already done that, you should see a list of existing task lists.
-   Next to the task lists you have created you can find, buttons to update, delete or share them with other users on the app.
-   Lets say you want to share a task list. Click on the share button of that item.
-   On the resulting page, you can see if you have already shared this task before. There is also a form towards the bottom for you to actually select users with whom you want to share the item.
-   The field is type-hinted but only for users you already have not shared this task. To share with a user search the user and select the user from the suggested list.
-   Below the text field you can indicate if you want the user to have an edit permission check it. Not checking it will give user a view permisson only
-   Hitting the share button will share the task and a success notice is displayed
-   The share would also appear in the shared list above the form.
-   You can toggle the permission henceforth from there.
-   Creating Task Lists and their sub task is straight forward.

Note.

When configuring Postgres databse, manually specify the connection email address and password
