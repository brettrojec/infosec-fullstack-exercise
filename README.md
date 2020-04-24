Brett Rojec fullstack project

===============================================================================
Starting the server

The server can be run one of two ways:
  1. on Docker with the included docker-compose file (docker-compose up -d), which assume's it's living one level _above_ a directory called infosec-fullstack-exercise, so if you use git, move the docker-compose file up one directory (or move all other files down 1).  If the host port 8765 is not free, change the first number on line 11 (host:target port mapping).
  2. running directly using the server shell script.  The script has been modified slightly to run better on docker
      a. It accepts all IP addresses
      b. it assumes an argument for the parent of webroot/
    as such, running with ./server . should get it started

===============================================================================
Github

This was developed in a private repo to prevent cheating.  The repo has been made public in line with the exercise specification, but may not link to the original

===============================================================================
Design notes/comments

I used an in-browser react compiler for this, as it seemed an easier way to get started with writing.  I have a npm build copy as well, which has not been tested.

In testing, I noticed some oddities arising from the PHP web service - a case where variables didn't seem to be being assigned, and another where Chrome and Firefox were getting different responses for the same input.  I tested directly with Postman as well, which also seemed to work.  A few minutes later Chrome was working too.  I suspected these have something to do with possible non-blocking behavior in PHP and/or PHP cURL, but all of my searching suggested that it was blocking by default.  Since I wasn't able to consistently reproduce, I couldn't test it thoroughly.  If you know what's wrong please let me know, it was driving me nuts.

As you'll see, I used React + Bootstrap for the frontend.  I mixed in Bootstrap classes with the React components, which was quick and easy for a simple app like this.  Those ideally would be less coupled for better reusability.