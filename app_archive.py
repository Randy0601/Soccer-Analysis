import sqlite3
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, g, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/database.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Player = Base.classes.Player
Player_Attributes = Base.classes.Player_Attributes


app.config.from_object(__name__)

def connect_to_database():
    return sqlite3.connect(app.config["DATABASE"])

def get_db():
    db = getattr(g, 'db', None)
    if db is None:
        db = g.db = connect_to_database()
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()

def execute_query(query, args=()):
    cur = get_db().execute(query, args)
    rows = cur.fetchall()
    cur.close()
    return rows

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/player_data")
def player_data():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Player).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (player names)
    return jsonify(list(df.columns)[1:])

@app.route("/player_attr_data")
def player_attr_data():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Player_Attributes).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (player attributes)
    return jsonify(list(df.columns)[1:])
  
@app.route("/viewdb")
def viewdb():
    rows = execute_query("SELECT * FROM Player_Attributes")
    return '<br>'.join(str(row) for row in rows)


# @app.route("/metadata/<sample>")
# def samples_player(sample):
#     """Return the attributes for a given sample."""
#     sel = [
#         Samples_Player.player_api_id,
#         Samples_Player.player_name,
#         Samples_Player.player_fifa_api_id,
#         Samples_Player.birthday,
#         Samples_Player.height,
#         Samples_Player.weight,
#     ]

#     results = db.session.query(*sel).all()

#    # Create a dictionary entry for each row of metadata information
#     samples_player ={}
#     for result in results:
#         samples_player["player_api_id"] = result[0]
#         samples_player["player_name"] = result[1]
#         samples_player["player_fifa_api_id"] = result[2]
#         samples_player["birthday"] = result[3]
#         samples_player["height"] = result[4]
#         samples_player["weight"] = result[5]

#     print(samples_player)
#     return jsonify(samples_player)
    
if __name__ == "__main__":
    app.run()
