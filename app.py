from flask import Flask, render_template, redirect, url_for, jsonify
import json
import csv
import re

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route("/")
def index():
  return(redirect(url_for("final_bar")))

@app.route("/final_bar")
def final_bar():
  return(render_template("final_bar.html"))

@app.route("/bar_tutorial1")
def bar_tutorial1():
  return(render_template("bar_tutorial1.html"))

@app.route("/bar_example1")
def bar_tutorial2():
  return(render_template("bar_example1.html"))

@app.route("/final_bar_variations")
def final_bar_variations():
  return(render_template("final_bar_variations.html"))
