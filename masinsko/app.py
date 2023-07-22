from functionsSentAna import rate_the_comment
import pickle
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.get_json()
    f = open('my_classifier.pickle', 'rb')
    classifier = pickle.load(f)
    
    comment = data['Comment']
    
    sentiment=rate_the_comment(comment,classifier)
    
    f.close()
    return str(sentiment)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
