# Spider Web Flask App
# "Hell, just hope it works."

from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True)
