import sqlite3
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, g, request
from flask_sqlalchemy import SQLAlchemy

# Database Set up
engine = create_engine("sqlite:///db/database_shrunk.sqlite?check_same_thread=False")

Base = automap_base()
Base.prepare(engine, reflect = True)

#save tables as variables
Player = Base.classes.Player
Player_Attributes = Base.classes.Player_Attributes

session = Session(engine)

##### Set up Flask
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/database_shrunk.sqlite"
db = SQLAlchemy(app)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/player")
def player():
    results = session.query(Player.player_fifa_api_id, Player.player_name, Player.birthday, Player.height, Player.weight).all()
    all_players = list(np.ravel(results))
    return jsonify(all_players)

@app.route("/player_attr")
def player_attr():
    results1 = session.query(Player_Attributes.player_fifa_api_id, Player_Attributes.overall_rating, Player_Attributes.potential, Player_Attributes.preferred_foot, Player_Attributes.crossing, Player_Attributes.finishing, Player_Attributes.acceleration, Player_Attributes.agility, Player_Attributes.stamina).all()
    all_players_attr = list(np.ravel(results1))
    return jsonify(all_players_attr)

# @app.route("/names")
# def names():
#     sel = [Player_Attributes.player_fifa_api_id]

#     names = [name[0] for name in db.session.query(*sel).all()]

#     return jsonify(names)

@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Player_Attributes).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    sel = [Player_Attributes.player_fifa_api_id]

    names = [name[0] for name in db.session.query(*sel).all()]

    return jsonify(names)


@app.route("/metadata/<sample>")
def samples_player(sample):
    """Return the attributes for a given sample."""
    sel = [
        Player_Attributes.player_fifa_api_id,
        Player_Attributes.stamina,
        Player_Attributes.agility,
        Player_Attributes.acceleration,
        Player_Attributes.finishing,
        Player_Attributes.crossing,
        Player_Attributes.overall_rating,
        Player_Attributes.ball_control,
    ]

    results3 = db.session.query(*sel).filter(Player_Attributes.player_fifa_api_id == sample).all()

   # Create a dictionary entry for each row of metadata information
    samples_player ={}
    for result in results3:
        samples_player["player_fifa_api_id"] = result[0]
        samples_player["stamina"] = result[1]
        samples_player["agility"] = result[2]
        samples_player["acceleration"] = result[3]
        samples_player["finishing"] = result[4]
        samples_player["crossing"] = result[5]
        samples_player["overall_rating"] = result[6]
        samples_player["ball_control"] = result[7]

    print(samples_player)
    return jsonify(samples_player)

if __name__ == "__main__":
    app.run()
