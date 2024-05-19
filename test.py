from kafka import KafkaConsumer
import json

def consume_articles():
    # Tạo tiêu thụ từ kafka server đang chạy ở localhost và port 9092
    consumer = KafkaConsumer(
       'python', #Dùng topic mà Spring Boot producer đang gửi
       bootstrap_servers=['localhost:9092'], #Điều chỉnh địa chỉ phù hợp với Kafka server của bạn
       value_deserializer=lambda x: json.loads(x.decode('utf-8')) #Deserializer cho nội dung JSON 
    )

    for message in consumer:
        articles = message.value
        print(articles) #In danh sách articles 

# Gọi hàm để bắt đầu tiêu thụ 
consume_articles()