from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

file = open("tasks.txt", "rb")
taskList = dict()

@app.route("/")
def init():
    return render_template("index.html")

@app.route("/api/addTask", methods = "POST")
def addTask():
    task = request.form.get()
    taskList[task.taskId] = task

