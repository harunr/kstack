# K STACK HTML Bolierplate

## Instructions to run the boilerplate
- Clone app on your machine
    - `git clone git@github.com:k-stack-au/kstack-website.git`
- Install live-server on your machine
    - `npm install -g live-server`
- Install all dependencies of the project
    - `npm install`
- Run compile:sass to run the app. This will compile css on every change in the sass files.
    - `npm run compile:sass`
- Run live-server on a separate terminal/cmd window
    - `live-server`

## Pull Request

- work on your local branch
    - `git checkout -b myBranch` 
    - `git add .`
    - `git commit -m "your message for the commit"`
    - `git push origin myBranch`
- Create a PR against main branch on github and add @sri-k-stack as reviewer for the PR
- Once the PR is merged to main branch, the page can be viewed on http://kstackau.netlify.app (Give a couple of mis to deploy if you dont see the changes)

## Testing

- we love responsively.app for testing responsiveness of the application. 
- A chrome extension of responsively is also quite handy
