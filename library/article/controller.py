from flask import Blueprint, jsonify, request
import json
from kafka import KafkaProducer
from kafka import KafkaConsumer
from library.model import Article
from flask_cors import CORS

producer = KafkaProducer(bootstrap_servers='localhost:9092',
                         value_serializer=lambda v: json.dumps(v).encode('utf-8'))
consumerGetAll = KafkaConsumer(
       'get-all-article',
       bootstrap_servers=['localhost:9092'], 
       value_deserializer=lambda x: json.loads(x.decode('utf-8')),
       consumer_timeout_ms=1000
    )

consumerGetById = KafkaConsumer(
       'get-by-id',
       bootstrap_servers=['localhost:9092'], 
       value_deserializer=lambda x: json.loads(x.decode('utf-8')),
       consumer_timeout_ms=1000
    )

articles = Blueprint("article", __name__)

@articles.route("/article-management", methods=['GET'] )
def get_all_articles():
    request_message = {'action': 'get_posts'}
    producer.send("get-all", value=request_message)
    articles = {}
    for message in consumerGetAll:
        articles = message.value
        print(articles)
    return jsonify(articles)

@articles.route("/article-management/add", methods=['POST'])
def add_article():
    data = request.json
    if (data and ('title' in data) and ('summary' in data) and ('content' in data) and ('image' in data)):
        title = data['title']
        summary = data['summary']
        content = data['content']
        image = data['image']
        try:
            new_article = Article(title, summary, content, image)
            producer.send('create-article', new_article.to_dict())
            producer.flush()
            return jsonify({"message": "Success"}), 200
        except IndentationError:
            return "Cannot add article"
    else:
        return "Request Error"
    
@articles.route("/article-management/<int:id>", methods=['GET'])
def get_article_by_id(id):
    producer.send("get_article_by_id", id)
    article = {}
    for message in consumerGetById:
        article = message.value
        print(article)
    if article:
        return jsonify(article)
    else:
        return "Can not find article"
    
@articles.route("/article-management/<int:id>", methods=['PUT'])
def update_article(id):
    data = request.json
    if (data and ('title' in data) and ('summary' in data) and ('content' in data) and ('image' in data)):
        title = data['title']
        summary = data['summary']
        content = data['content']
        image = data['image']
        try:
            producer.send("get_article_by_id", id)
            article = {}
            for message in consumerGetById:
                article = message.value
                print(article)
            article['title'] = title
            article['summary'] = summary
            article['content'] = content
            article['image'] = image
            producer.send('update-article', article)
            producer.flush()
            return jsonify({"message": "Success"}), 200
        except IndentationError:
            return "Cannot update article"
    else:
        return "Request Error"

@articles.route("/article-management/<int:id>", methods=['DELETE'])
def delete_article(id):
    producer.send("delete_article", id)
    return "Delete success" 