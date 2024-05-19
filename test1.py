from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers='localhost:9092')

import json

producer = KafkaProducer(bootstrap_servers='localhost:9092',
                         value_serializer=lambda v: json.dumps(v).encode('utf-8'))

article = {
    "title": "Alo",
    "content": "Duc dz.",
}

producer.send('article-topic', article)
producer.flush()