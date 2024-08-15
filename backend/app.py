from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import UserStory, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/scrumplex.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/userstories')
def get_user_stories():
    stories = UserStory.query.all()
    return jsonify([story.to_dict() for story in stories])

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # proof if db exists
    app.run(debug=True)