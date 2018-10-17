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

# Database Set up
engine = create_engine("sqlite:///db/soccerdb.sqlite")

Base = automap_base()
Base.prepare(engine, reflect = True)

session = Session(engine)

##### Set up Flask
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/soccerdb.sqlite"
db = SQLAlchemy(app)

Player = Base.classes.soccerdatabase

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/player")
def player():
    results = session.query(Player.player_fifa_api_id, Player.player_name, Player.birthday, Player.height, Player.weight,Player.overall_rating,Player.potential,Player.preferred_foot,Player.crossing,Player.finishing,Player.dribbling,Player.ball_control,Player.acceleration,Player.agility,Player.stamina,Player.positioning).all()
    all_players = list(np.ravel(results))
    return jsonify(all_players)

# @app.route("/metadata/<sample>")
# def samples_player(sample):
#     """Return the attributes for a given sample."""
#     sel = [
#         Player.player_fifa_api_id,
#         Player.stamina,
#         Player.agility,
#         Player.acceleration,
#         Player.finishing,
#         Player.crossing,
#         Player.overall_rating,
#     ]

#     results2 = db.session.query(*sel).all()

#    # Create a dictionary entry for each row of metadata information
#     samples_player ={}
#     for result in results2:
#         samples_player["player_fifa_api_id"] = result[0]
#         samples_player["stamina"] = result[1]
#         samples_player["agility"] = result[2]
#         samples_player["acceleration"] = result[3]
#         samples_player["finishing"] = result[4]
#         samples_player["crossing"] = result[5]
#         samples_player["overall_rating"] = result[6]

#     print(samples_player)
#     return jsonify(samples_player)

if __name__ == "__main__":
    app.run()
