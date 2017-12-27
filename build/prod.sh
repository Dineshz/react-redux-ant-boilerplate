#!/bin/sh
#prod.sh
#author: dinesh.r@pipecandy.com / prince@pipecandy.com / harish@pipecandy.com

export NODE_ENV=prod
#Get the branch name from user
read -p "Which branch to pull? " branch_name

echo "-------------------------------------------------------------------------"
#Pull dev code
  echo "Pulling the branch $branch_name from toffee-ui repo"
  git checkout $branch_name
  echo "Checked out branch"
  git pull origin $branch_name
  echo "Successfully pulled out the code"
echo "-------------------------------------------------------------------------"

#Install the node modules
echo "Installing node modules"
npm install
echo "Node modules has been successfully installed"
echo "-------------------------------------------------------------------------"


#Bundle the front end code
echo "Bundling the front end code"
npm run build
echo "Successfully bundled the front end code and deployed"
echo "-------------------------------------------------------------------------"
