from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'my_topic',
    bootstrap_servers=['localhost:9092'],
    group_id='group_id',
    auto_offset_reset='latest',
    consumer_timeout_ms=1000,
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

for message in consumer:
    articles = message.value
    # Now you have the articles
    print(articles)