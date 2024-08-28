''' Executing this function initiates the application of automated dashboard
    creation using Large Language Model to be executed over the Flask channel and deployed on
    localhost:5000.
'''
#Import Flask, render_template, request from the flask Framework package : TODO
from flask import Flask
from flask import render_template
app = Flask(__name__)

#Initiate the flask app : TODO
@app.route("/")
def render_index_page():
    ''' This function initiates the rendering of the main application
        page over the Flask channel
    '''
    return render_template('index.html',)
    #TODO

if __name__ == "__main__":
    ''' This functions executes the flask app and deploys it on localhost:5000
    '''#TODO
